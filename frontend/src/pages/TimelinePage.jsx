import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { Cloud, AlertCircle, Loader2, CheckCircle, AlertTriangle, Lightbulb } from "lucide-react";

export default function TimelinePage() {
  const { district, weatherData, soilData } = useAppContext();
  const [result, setResult] = useState(null);
  const [stage, setStage] = useState("vegetative");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // If no soil data, user should go to /suggest first
    if (!soilData) {
      setError("Please enter soil data first by visiting the Crop Suggestion page.");
    }
  }, [soilData]);

  const handleSubmit = async () => {
    if (!weatherData) {
      setError("Weather data not available. Please select a district first.");
      return;
    }

    if (!soilData) {
      setError("Soil data required. Please visit Crop Suggestion page first.");
      return;
    }

    // Convert weather data to expected format
    const formattedWeatherData = [
      {
        day: "Day 1",
        weather: weatherData.description || "Unknown",
        temperature: weatherData.temp || 25,
        humidity: weatherData.humidity || 50,
        rain_probability: 0,
      },
      {
        day: "Day 2",
        weather: "Forecast",
        temperature: weatherData.temp + 2 || 27,
        humidity: weatherData.humidity - 5 || 45,
        rain_probability: 10,
      },
      {
        day: "Day 3",
        weather: "Forecast",
        temperature: weatherData.temp + 1 || 26,
        humidity: weatherData.humidity || 50,
        rain_probability: 5,
      },
    ];

    const payload = {
      stage,
      weather_data: formattedWeatherData,
      soil: {
        moisture: 50,
        nitrogen: soilData.N > 60 ? "high" : soilData.N > 40 ? "normal" : "low",
      },
    };

    setLoading(true);
    setError("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      const res = await fetch(`${apiUrl}/smart-timeline`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Backend error: ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(`Failed to generate timeline: ${err.message}`);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#1a4a38]">🌾 Smart Farming Timeline</h1>
        <p className="mt-2 max-w-3xl text-lg text-slate-600">
          Generate weather-based farming schedules with AI-powered irrigation planning and crop stage alerts.
        </p>
      </div>

      {/* Controls Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Crop Stage
            </label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-white font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
            >
              <option value="seed">🌱 Seed</option>
              <option value="vegetative">🌿 Vegetative (Growth)</option>
              <option value="flowering">🌸 Flowering</option>
              <option value="harvesting">✂️ Harvesting</option>
            </select>
          </div>

          <div className="text-sm text-slate-600">
            <p className="font-medium">District: <span className="text-[#4CAF50] font-bold">{district}</span></p>
            <p className="font-medium mt-1">Soil N: <span className="text-[#4CAF50] font-bold">{soilData?.N || "—"}</span></p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !soilData}
            className="px-6 py-2.5 bg-[#1a4a38] hover:bg-[#0f2e26] text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Timeline"
            )}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200 flex gap-3">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-8">
          {/* Timeline Section */}
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4 flex items-center gap-2">
              📅 <span>Farming Schedule</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {result.timeline?.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{item.day}</h3>
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        item.risk === "Low"
                          ? "bg-green-100 text-green-700"
                          : item.risk === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.risk} Risk
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-slate-600 font-medium">Weather</p>
                      <p className="text-gray-900 font-semibold">{item.weather}</p>
                    </div>
                    <div>
                      <p className="text-slate-600 font-medium">Recommended Action</p>
                      <p className="text-gray-900 font-semibold">{item.action}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts Section */}
          {result.alerts?.length > 0 && (
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                🚨 <span>Critical Alerts</span>
              </h2>
              <div className="space-y-3">
                {result.alerts.map((alert, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border-l-4 border-l-red-500 bg-red-50 p-5 flex gap-4"
                  >
                    <AlertTriangle size={24} className="text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-red-900">{alert.type}</h3>
                      <p className="text-red-700 mt-1">{alert.message}</p>
                      <p className="text-red-600 font-medium text-sm mt-2">💡 {alert.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!result && !error && !loading && (
        <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center">
          <Lightbulb size={48} className="mx-auto text-slate-400 mb-4" />
          <p className="text-lg font-semibold text-gray-900 mb-2">Generate Your Smart Timeline</p>
          <p className="text-slate-600 max-w-xl mx-auto">
            Select a crop stage above and click "Generate Timeline" to see personalized farming recommendations based on current weather and your soil data.
          </p>
        </div>
      )}
    </div>
  );
}