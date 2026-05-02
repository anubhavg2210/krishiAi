import { useState, useEffect } from "react";
import { Sparkles, MapPin, DollarSign, CloudRain, ThermometerSun, Droplets, Info, Leaf } from "lucide-react";
import SeedCard from "../components/seed/SeedCard";
import { getSeedRecommendation, SEED_DATABASE } from "../lib/seedEngine";

export default function SeedAdvisorPage() {
  const [showDemoAlert, setShowDemoAlert] = useState(true);
  
  const [formData, setFormData] = useState({
    location: "Madhya Pradesh",
    budget: "medium",
    crop: "wheat",
    temp: 25,
    rainfall: 500,
    humidity: 60
  });

  const [aiRecommendation, setAiRecommendation] = useState(null);
  const [selectedCropTab, setSelectedCropTab] = useState("wheat");

  // Handle Demo Mode Popup
  useEffect(() => {
    // We just show it on mount.
    const timer = setTimeout(() => setShowDemoAlert(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === "temp" || name === "rainfall" || name === "humidity" ? Number(value) : value }));
  };

  const handleGetRecommendation = () => {
    const result = getSeedRecommendation(formData);
    setAiRecommendation(result);
  };

  const handleWhyThisSeed = (seed) => {
    // To handle specific card clicks, we can simulate an AI result specifically for that seed
    const tempResult = {
      seed: seed,
      reason: `You clicked on ${seed.name}. This is a ${seed.quality} quality seed priced at ${seed.price}. It is suitable for a ${seed.budget} budget. Features include: ${seed.features.join(", ")}.`,
      alerts: [],
      profitBenefit: `Expected Return: ${seed.yield} at optimal market rates.`
    };
    setAiRecommendation(tempResult);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Demo Mode Popup */}
      {showDemoAlert && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-white rounded-2xl shadow-2xl border-l-4 border-[#4CAF50] p-5 animate-in slide-in-from-bottom-5">
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <div className="bg-green-100 p-2 rounded-full text-[#4CAF50] shrink-0">
                <Info size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Demo Mode Active</h4>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  This platform helps farmers choose the right seed, avoid scams, and improve yield using AI-driven recommendations.
                </p>
              </div>
            </div>
            <button onClick={() => setShowDemoAlert(false)} className="text-gray-400 hover:text-gray-600">×</button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center space-y-4 pt-4">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
          Kisan Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4CAF50] to-teal-500">Seed Advisor</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
          Get personalized seed recommendations based on your soil, weather, and budget. Avoid fake seeds and maximize your yield.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form Area */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Sparkles className="text-yellow-500" />
              Your Field Details
            </h2>

            <div className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <MapPin size={16} className="text-gray-400" /> Location
                </label>
                <input 
                  type="text" 
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#4CAF50] outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <DollarSign size={16} className="text-gray-400" /> Budget
                </label>
                <select 
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#4CAF50] outline-none transition-all"
                >
                  <option value="low">Low (Cost Effective)</option>
                  <option value="medium">Medium (Balanced)</option>
                  <option value="high">High (Premium/Export)</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <Leaf size={16} className="text-gray-400" /> Planned Crop
                </label>
                <select 
                  name="crop"
                  value={formData.crop}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#4CAF50] outline-none transition-all"
                >
                  <option value="wheat">Wheat (गेहूं)</option>
                  <option value="soybean">Soybean (सोयाबीन)</option>
                  <option value="gram">Gram (चना)</option>
                </select>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Weather Conditions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 flex items-center gap-1 mb-1">
                      <ThermometerSun size={14} /> Temp (°C)
                    </label>
                    <input type="number" name="temp" value={formData.temp} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#4CAF50] outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 flex items-center gap-1 mb-1">
                      <CloudRain size={14} /> Rain (mm)
                    </label>
                    <input type="number" name="rainfall" value={formData.rainfall} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#4CAF50] outline-none" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-semibold text-gray-600 flex items-center gap-1 mb-1">
                      <Droplets size={14} /> Humidity (%)
                    </label>
                    <input type="number" name="humidity" value={formData.humidity} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#4CAF50] outline-none" />
                  </div>
                </div>
              </div>

              <button 
                onClick={handleGetRecommendation}
                className="w-full mt-4 bg-gradient-to-r from-[#4CAF50] to-teal-500 hover:from-[#43A047] hover:to-teal-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Sparkles size={20} />
                Get Smart Recommendation
              </button>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* AI Recommendation Panel */}
          {aiRecommendation && (
            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-1 shadow-xl animate-in fade-in zoom-in duration-500">
              <div className="bg-white/10 backdrop-blur-md rounded-[22px] p-6 text-white border border-white/20">
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                  
                  <div className="shrink-0">
                    <div className="h-32 w-32 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl">
                      <img src={aiRecommendation.seed.image} alt={aiRecommendation.seed.name} className="h-full w-full object-cover" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="text-yellow-400" size={18} />
                        <span className="text-xs font-bold uppercase tracking-wider text-yellow-400">AI Top Pick</span>
                      </div>
                      <h2 className="text-3xl font-black">{aiRecommendation.seed.name}</h2>
                      <p className="text-indigo-200 font-medium">{aiRecommendation.seed.quality} Seed Variety</p>
                    </div>

                    <div className="bg-black/20 rounded-xl p-4 border border-white/10">
                      <p className="text-sm leading-relaxed">{aiRecommendation.reason}</p>
                    </div>

                    {aiRecommendation.alerts.length > 0 && (
                      <div className="bg-red-500/20 text-red-200 rounded-xl p-3 text-sm font-medium border border-red-500/30">
                        {aiRecommendation.alerts.map((alert, idx) => (
                          <p key={idx}>{alert}</p>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <span className="bg-green-500/20 text-green-300 font-bold px-4 py-2 rounded-lg text-sm border border-green-500/30">
                        {aiRecommendation.profitBenefit}
                      </span>
                      <button 
                        onClick={() => window.open(`https://utpannseeds.in/`, "_blank")}
                        className="bg-white text-indigo-900 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
                      >
                        Buy This Seed
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Seed Market Categories */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Seed Market</h2>
              <div className="flex bg-gray-100 p-1 rounded-xl">
                {["wheat", "soybean", "gram"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedCropTab(tab)}
                    className={`px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                      selectedCropTab === tab 
                        ? "bg-white text-[#4CAF50] shadow-sm" 
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {SEED_DATABASE[selectedCropTab].map((seed) => (
                <SeedCard 
                  key={seed.id} 
                  seed={seed} 
                  onGetRecommendation={handleWhyThisSeed}
                />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
