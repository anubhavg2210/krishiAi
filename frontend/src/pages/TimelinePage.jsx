import { useState } from "react";
import { Calendar, CloudRain, Sun, Leaf, Droplets, AlertTriangle, ShieldCheck } from "lucide-react";

export default function TimelinePage() {
    const [result, setResult] = useState(null);
    const [stage, setStage] = useState("vegetative");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        const payload = {
            stage,
            weather_data: [
                { day: "Monday", weather: "Rain", temperature: 31, humidity: 85, rain_probability: 70 },
                { day: "Tuesday", weather: "Sunny", temperature: 36, humidity: 60, rain_probability: 10 },
                { day: "Wednesday", weather: "Cloudy", temperature: 28, humidity: 75, rain_probability: 40 },
                { day: "Thursday", weather: "Sunny", temperature: 33, humidity: 50, rain_probability: 0 },
                { day: "Friday", weather: "Rain", temperature: 29, humidity: 90, rain_probability: 80 },
                { day: "Saturday", weather: "Sunny", temperature: 30, humidity: 65, rain_probability: 20 },
                { day: "Sunday", weather: "Clear", temperature: 31, humidity: 55, rain_probability: 5 },
            ],
        };

        try {
            const res = await fetch("http://127.0.0.1:8000/smart-timeline", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            setResult(data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const getRiskColor = (risk) => {
        if (risk === "High") return "bg-red-100 text-red-700 border-red-200";
        if (risk === "Medium") return "bg-orange-100 text-orange-700 border-orange-200";
        return "bg-green-100 text-green-700 border-green-200";
    };

    const getWeatherIcon = (weather) => {
        if (weather.includes("Rain")) return <CloudRain className="text-blue-500" />;
        if (weather.includes("Sun") || weather.includes("Clear")) return <Sun className="text-yellow-500" />;
        return <Droplets className="text-gray-500" />;
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
            {/* Header */}
            <div className="text-center space-y-4 pt-4">
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                    Smart Farming <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4CAF50] to-teal-500">Timeline</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
                    Plan your irrigation, fertilizer, and pesticide schedule based on 7-day weather forecasting and your crop's current stage.
                </p>
            </div>

            {/* Input Form */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="w-full sm:w-2/3">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                        <Leaf size={16} className="text-green-500" /> Current Crop Stage
                    </label>
                    <select
                        value={stage}
                        onChange={(e) => setStage(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#4CAF50] outline-none transition-all"
                    >
                        <option value="seed">Seedling Stage</option>
                        <option value="vegetative">Vegetative Stage</option>
                        <option value="flowering">Flowering Stage</option>
                        <option value="harvesting">Harvesting Stage</option>
                    </select>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full sm:w-1/3 mt-6 sm:mt-7 bg-gradient-to-r from-[#4CAF50] to-teal-500 hover:from-[#43A047] hover:to-teal-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                    <Calendar size={18} />
                    {loading ? "Planning..." : "Generate"}
                </button>
            </div>

            {/* Results Section */}
            {result && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
                    
                    {/* Left: Alerts Panel */}
                    <div className="lg:col-span-4 space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <AlertTriangle className="text-orange-500" /> Active Alerts
                        </h2>
                        
                        {result.alerts.length === 0 ? (
                            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                                <ShieldCheck className="mx-auto text-green-500 mb-3" size={32} />
                                <h3 className="font-bold text-green-800">All Clear!</h3>
                                <p className="text-sm text-green-600 mt-1">No proactive warnings for the next 7 days.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {result.alerts.map((alert, index) => (
                                    <div key={index} className="bg-orange-50 border-l-4 border-orange-500 rounded-r-2xl p-4 shadow-sm">
                                        <h3 className="font-bold text-orange-900 flex items-center gap-2">
                                            {alert.type}
                                        </h3>
                                        <p className="text-sm text-orange-800 mt-2 font-medium">{alert.message}</p>
                                        <p className="text-xs text-orange-600 mt-1 bg-white/50 inline-block px-2 py-1 rounded">Action: {alert.action}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: 7-Day Timeline */}
                    <div className="lg:col-span-8 space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Calendar className="text-blue-500" /> 7-Day Action Plan
                        </h2>

                        <div className="space-y-4">
                            {result.timeline.map((item, index) => (
                                <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-start md:items-center hover:shadow-md transition-all">
                                    {/* Day & Icon */}
                                    <div className="flex items-center gap-4 min-w-[150px]">
                                        <div className="bg-gray-50 p-3 rounded-full shadow-inner">
                                            {getWeatherIcon(item.weather)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{item.day}</h3>
                                            <p className="text-xs text-gray-500 font-medium">{item.weather}</p>
                                        </div>
                                    </div>

                                    {/* Action */}
                                    <div className="flex-1 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                        <p className="text-sm text-gray-700 font-medium">{item.action}</p>
                                    </div>

                                    {/* Risk Badge */}
                                    <div className={`px-4 py-2 rounded-lg text-xs font-bold border ${getRiskColor(item.risk)}`}>
                                        {item.risk} Risk
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}