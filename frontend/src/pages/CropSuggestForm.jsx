/**
 * CropSuggestForm.jsx
 *
 * Data-input step for the Kisan AI Sahayak tool.
 * - Farmers select their district (Madhya Pradesh).
 * - Live weather is fetched from OpenWeatherMap API on district change.
 * - Soil health values (NPK + pH) are set via sliders.
 * - On submission, routes to ResultsPage.
 */
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin, ThermometerSun, Droplets, CloudRain, Save,
  Loader2, Wind, Thermometer, AlertTriangle, KeyRound, RefreshCw,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { fetchWeatherForDistrict } from "../lib/weatherService";

const MP_DISTRICTS = [
  "Indore", "Sehore", "Vidisha", "Raisen", "Shivpuri",
  "Gwalior", "Ujjain", "Narmadapuram", "Sagar", "Satna",
];

// ─── Small helper sub-components ────────────────────────────────────────────

function WeatherStat({ icon, value, label }) {
  return (
    <div className="flex items-center gap-3">
      <span className="opacity-80">{icon}</span>
      <div>
        <p className="text-2xl font-bold leading-none">{value}</p>
        <p className="text-xs text-green-100 font-medium mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function WeatherSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full" />
          <div className="space-y-1.5 flex-1">
            <div className="h-5 bg-white/20 rounded w-20" />
            <div className="h-3 bg-white/10 rounded w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function CropSuggestForm() {
  const { district, setDistrict, setWeatherData, setWeatherStatus, setSoilData } = useAppContext();
  const [soil, setSoil] = useState({ N: 50, P: 40, K: 30, pH: 6.5 });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Local weather UI state
  const [weather, setWeather] = useState(null);
  const [wxStatus, setWxStatus] = useState("idle"); // idle | loading | success | error | no_key

  // ── Fetch weather whenever district changes ──────────────────────────────
  const loadWeather = useCallback(async (districtName) => {
    setWxStatus("loading");
    setWeather(null);
    try {
      const data = await fetchWeatherForDistrict(districtName);
      setWeather(data);
      setWxStatus("success");
      // Push to global context for ResultsPage
      setWeatherData(data);
      setWeatherStatus("success");
    } catch (err) {
      if (err.message === "NO_API_KEY") {
        setWxStatus("no_key");
        setWeatherStatus("no_key");
      } else {
        setWxStatus("error");
        setWeatherStatus("error");
      }
      setWeatherData(null);
    }
  }, [setWeatherData, setWeatherStatus]);

  useEffect(() => {
    loadWeather(district);
  }, [district, loadWeather]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSoilData(soil); // Save input to context
    setTimeout(() => {
      setLoading(false);
      navigate("/results");
    }, 1500);
  };

  // ── Weather card content ─────────────────────────────────────────────────
  const renderWeatherContent = () => {
    if (wxStatus === "loading") return <WeatherSkeleton />;

    if (wxStatus === "no_key") {
      return (
        <div className="flex flex-col items-center text-center gap-3 py-2">
          <KeyRound size={32} className="text-yellow-300" />
          <p className="text-sm font-semibold text-white/90 leading-snug">
            Add your API key in <code className="bg-white/15 px-1.5 py-0.5 rounded text-xs">.env</code> to see live weather
          </p>
          <p className="text-xs text-green-100">
            Get a free key at{" "}
            <a
              href="https://openweathermap.org/api"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold"
            >
              openweathermap.org
            </a>
          </p>
        </div>
      );
    }

    if (wxStatus === "error") {
      return (
        <div className="flex flex-col items-center text-center gap-3 py-2">
          <AlertTriangle size={30} className="text-yellow-300" />
          <p className="text-sm font-semibold text-white/90">Could not reach weather service</p>
          <button
            onClick={() => loadWeather(district)}
            className="flex items-center gap-1.5 text-xs bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-lg transition-colors font-semibold"
          >
            <RefreshCw size={12} /> Retry
          </button>
        </div>
      );
    }

    if (wxStatus === "success" && weather) {
      return (
        <div className="grid grid-cols-1 gap-4">
          {/* Icon + description */}
          <div className="flex items-center gap-3 mb-1">
            <span className="text-5xl leading-none drop-shadow-lg" role="img" aria-label={weather.description}>
              {weather.icon}
            </span>
            <p className="text-sm font-semibold text-white capitalize leading-tight">
              {weather.description}
            </p>
          </div>

          <div className="h-px bg-white/20 w-full" />
          <WeatherStat
            icon={<ThermometerSun size={28} className="text-yellow-300" />}
            value={`${weather.temp}°C`}
            label={`Feels like ${weather.feelsLike}°C`}
          />
          <div className="h-px bg-white/20 w-full" />
          <WeatherStat
            icon={<Droplets size={26} className="text-blue-200" />}
            value={`${weather.humidity}%`}
            label="Humidity"
          />
          <div className="h-px bg-white/20 w-full" />
          <WeatherStat
            icon={<CloudRain size={26} className="text-blue-100" />}
            value={`${weather.rainfall} mm`}
            label="Rainfall (last hour)"
          />
          <div className="h-px bg-white/20 w-full" />
          <WeatherStat
            icon={<Wind size={24} className="text-emerald-200" />}
            value={`${weather.windSpeed} km/h`}
            label="Wind Speed"
          />
        </div>
      );
    }

    // Idle fallback (shouldn't normally show)
    return null;
  };

  // ── Slider helper ────────────────────────────────────────────────────────
  const SliderField = ({ label, field, min, max, step = 1, unit, accentColor }) => (
    <div className="space-y-3">
      <div className="flex justify-between">
        <label className="text-lg font-bold text-gray-800">{label}</label>
        <span className={`text-lg font-bold`} style={{ color: accentColor }}>
          {soil[field]} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={soil[field]}
        onChange={e => setSoil({ ...soil, [field]: parseFloat(e.target.value) })}
        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        style={{ accentColor }}
      />
    </div>
  );

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Crop Recommendation</h1>
        <p className="text-lg text-gray-500 font-medium">
          Enter your soil test details for the most accurate AI suggestions in Madhya Pradesh.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── Left Column: District selector + Live Weather Card ── */}
        <div className="lg:col-span-1 space-y-6">

          {/* District Selector */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
              <MapPin size={18} className="text-[#2196F3]" /> Select District
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full text-lg font-semibold text-gray-900 border-2 border-gray-200 rounded-xl py-3 px-4 focus:border-[#2196F3] focus:ring-0 outline-none transition-colors"
            >
              {MP_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          {/* Live Weather Card */}
          <div className="bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            {/* Decorative blob */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <h3 className="text-sm font-bold uppercase tracking-wider text-green-100 mb-5 flex justify-between items-center">
              <span>Live Weather</span>
              <span className="flex items-center gap-1.5">
                {wxStatus === "loading" && <Loader2 size={12} className="animate-spin" />}
                {wxStatus === "success" && (
                  <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                )}
                <span className="bg-white/20 px-2 py-1 rounded text-xs">{district}</span>
              </span>
            </h3>

            {renderWeatherContent()}
          </div>
        </div>

        {/* ── Right Column: Soil Inputs ── */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
            <h2 className="text-2xl font-extrabold text-gray-900">Soil Condition</h2>
            <button className="text-sm font-semibold text-[#2196F3] flex items-center gap-1 hover:underline">
              <Save size={16} /> Auto-saved
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-8">
              <SliderField label="Nitrogen (N)"   field="N"   min={0}   max={150} unit="kg/ha" accentColor="#4CAF50" />
              <SliderField label="Phosphorus (P)" field="P"   min={0}   max={100} unit="kg/ha" accentColor="#4CAF50" />
              <SliderField label="Potassium (K)"  field="K"   min={0}   max={100} unit="kg/ha" accentColor="#4CAF50" />

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <SliderField label="pH Level" field="pH" min={4} max={9} step={0.1} unit="" accentColor="#2196F3" />
                <p className="text-sm text-gray-500 font-medium mt-3">Neutral soil is 6.5 to 7.0</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4CAF50] hover:bg-[#43a047] text-white py-5 rounded-xl font-bold text-xl shadow-[0_8px_20px_rgb(76,175,80,0.3)] hover:shadow-[0_12px_25px_rgb(76,175,80,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : "Suggest Crops"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
