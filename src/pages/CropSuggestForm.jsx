/**
 * CropSuggestForm.jsx
 * 
 * This page functions as the data-input step.
 * Farmers select their district to fetch live weather (mocked here),
 * and input their soil health characteristics (NPK and pH levels).
 * On submission, it routes to the ResultsPage.
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, ThermometerSun, Droplets, CloudRain, Save, Loader2 } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const MP_DISTRICTS = ["Indore", "Sehore", "Vidisha", "Raisen", "Shivpuri", "Gwalior", "Ujjain", "Narmadapuram", "Sagar", "Satna"];

export default function CropSuggestForm() {
  const { district, setDistrict } = useAppContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [soil, setSoil] = useState({ N: 50, P: 40, K: 30, pH: 6.5 });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/results");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Crop Recommendation</h1>
        <p className="text-lg text-gray-500 font-medium">Enter your soil test details for the most accurate AI suggestions in Madhya Pradesh.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: District & Weather */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
              <MapPin size={18} className="text-[#2196F3]"/> Select District
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full text-lg font-semibold text-gray-900 border-2 border-gray-200 rounded-xl py-3 px-4 focus:border-[#2196F3] focus:ring-0 outline-none transition-colors"
            >
              {MP_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-green-100 mb-6 flex justify-between items-center">
              <span>Live Weather</span>
              <span className="bg-white/20 px-2 py-1 rounded text-xs">Today</span>
            </h3>
            <div className="grid grid-cols-1 gap-5">
              <div className="flex items-center gap-4">
                <ThermometerSun size={32} className="text-yellow-300" />
                <div><p className="text-3xl font-bold">28°C</p><p className="text-sm text-green-100 font-medium">Temperature</p></div>
              </div>
              <div className="h-px bg-white/20 w-full" />
              <div className="flex items-center gap-4">
                <Droplets size={28} className="text-blue-200" />
                <div><p className="text-2xl font-bold">60%</p><p className="text-sm text-green-100 font-medium">Humidity</p></div>
              </div>
              <div className="h-px bg-white/20 w-full" />
              <div className="flex items-center gap-4">
                <CloudRain size={28} className="text-blue-100" />
                <div><p className="text-2xl font-bold">5mm</p><p className="text-sm text-green-100 font-medium">Rainfall</p></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Soil Inputs */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
            <h2 className="text-2xl font-extrabold text-gray-900">Soil Condition</h2>
            <button className="text-sm font-semibold text-[#2196F3] flex items-center gap-1 hover:underline">
              <Save size={16}/> Auto-saved
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Sliders */}
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <label className="text-lg font-bold text-gray-800">Nitrogen (N)</label>
                  <span className="text-lg font-bold text-[#4CAF50]">{soil.N} kg/ha</span>
                </div>
                <input type="range" min="0" max="150" value={soil.N} onChange={e => setSoil({...soil, N: e.target.value})} className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4CAF50]" />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <label className="text-lg font-bold text-gray-800">Phosphorus (P)</label>
                  <span className="text-lg font-bold text-[#4CAF50]">{soil.P} kg/ha</span>
                </div>
                <input type="range" min="0" max="100" value={soil.P} onChange={e => setSoil({...soil, P: e.target.value})} className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4CAF50]" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <label className="text-lg font-bold text-gray-800">Potassium (K)</label>
                  <span className="text-lg font-bold text-[#4CAF50]">{soil.K} kg/ha</span>
                </div>
                <input type="range" min="0" max="100" value={soil.K} onChange={e => setSoil({...soil, K: e.target.value})} className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4CAF50]" />
              </div>

              <div className="space-y-3 bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div className="flex justify-between">
                  <label className="text-lg font-bold text-gray-800">pH Level</label>
                  <span className="text-lg font-bold text-[#2196F3]">{soil.pH}</span>
                </div>
                <input type="range" min="4" max="9" step="0.1" value={soil.pH} onChange={e => setSoil({...soil, pH: e.target.value})} className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2196F3]" />
                <p className="text-sm text-gray-500 font-medium">Neutral soil is 6.5 to 7.0</p>
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
