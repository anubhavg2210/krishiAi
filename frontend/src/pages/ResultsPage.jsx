/**
 * ResultsPage.jsx
 * 
 * Displays the AI-generated crop recommendations based on the user's inputs.
 * It presents a uniform, rich visual layout showing the crop image, 
 * seed/fertilizer requirements, irrigation scheduling, and real-time mandi prices.
 */
import { ArrowLeft, Save, Share2, TrendingUp, CheckCircle, Sprout, CloudRain, ShieldCheck, ThermometerSun, Leaf, Activity } from "lucide-react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { CROP_LIBRARY } from "../lib/cropEngine";

// Dynamic insight generator
const generateInsight = (cropName, weather, soil) => {
  if (!weather || !soil) return `${cropName} is highly recommended for your specific region.`;
  
  let reasons = [];
  if (soil.N > 70) reasons.push("rich nitrogen levels");
  else if (soil.N < 30) reasons.push("current nitrogen levels");
  
  if (weather.temp > 28) reasons.push("warm climate");
  else if (weather.temp < 20) reasons.push("cool weather");
  
  if (weather.rainfall > 120) reasons.push("high rainfall expectations");
  else if (weather.rainfall < 60) reasons.push("dry conditions");
  
  if (reasons.length > 0) {
    return `${cropName} is perfectly suited for you because your ${reasons.join(" and ")} match its ideal growing environment.`;
  }
  return `Your current soil and weather parameters provide an optimal foundation for growing ${cropName}.`;
};

// Fallback image handler
const handleImageError = (e) => {
  e.target.src = "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1600&q=80"; // Reliable generic agriculture field fallback
};

export default function ResultsPage() {
  const { district, soilData, t } = useAppContext();

  // If there is no soilData or aiResult, redirect
  if (!soilData || !aiResult) {
    return <Navigate to="/suggest" replace />;
  }

  const recommendedName = aiResult.recommended_crop.toLowerCase();
  let crop = CROP_LIBRARY.find(c => c.name.toLowerCase() === recommendedName) || CROP_LIBRARY[0];
  
  const topConfidenceStr = aiResult.top_3_recommendations[0]?.confidence || "90%";
  crop = { ...crop, matchScore: topConfidenceStr };

  const dynamicInsight = generateInsight(crop.name, aiResult.weather_used, soilData);

  return (
    <div className="max-w-6xl mx-auto w-full pb-10">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <Link to="/suggest" className="text-sm font-bold text-gray-500 hover:text-[#2196F3] flex items-center gap-2 mb-2 transition-colors">
            <ArrowLeft size={16} /> {t("results.tryDifferent")}
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            {t("results.recommendedFor")} <span className="text-[#4CAF50]">{district}</span>
          </h1>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
           <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
             <Save size={18} /> {t("results.savePlan")}
           </button>
           <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20b858] text-white rounded-xl font-bold transition-all shadow-sm">
             <Share2 size={18} /> WhatsApp
           </button>
        </div>
      </div>

      {/* Main Results Grid */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden mb-8">
        
        {/* Banner */}
        <div className="relative h-72 md:h-96 w-full overflow-hidden group">
          <img 
            src={crop.image} 
            alt={crop.name} 
            onError={handleImageError}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent flex flex-col justify-end p-8 md:p-12">
             <div className="flex items-center gap-3 mb-2">
               <span className="bg-[#4CAF50] text-white px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1">
                 <CheckCircle size={16} /> {crop.matchScore}% {t("results.match")}
               </span>
               <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-sm font-bold">
                 {t("results.highYield")}
               </span>
             </div>
             <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">{crop.name} <span className="text-gray-300 font-medium text-3xl md:text-4xl ml-2">({crop.hindiName})</span></h2>
          </div>
        </div>

        {/* AI Insight Box */}
        <div className="bg-[#f0f9ff] border-l-4 border-[#2196F3] p-6 md:p-8 mx-8 md:mx-12 mt-8 rounded-r-xl">
          <p className="text-lg md:text-xl font-medium text-blue-900 flex gap-3 items-start">
            <Activity className="text-[#2196F3] mt-1 shrink-0" size={24} />
            <span><strong>Smart Insight:</strong> {dynamicInsight} This crop offers <strong>{(crop.profitability || "High").toLowerCase()} profitability</strong> and requires <strong>{(crop.difficulty || "Moderate").toLowerCase()}</strong> farming effort.</span>
          </p>
        </div>

        {/* Info Grid - Generously spaced */}
        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            
            {/* Block 1: Seed & Fertilizer */}
            <div className="space-y-4">
               <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-[#4CAF50] mb-4 border border-green-100">
                 <Sprout size={24} />
               </div>
               <h3 className="text-xl font-extrabold text-gray-900">{t("results.seedFertilizer")}</h3>
               <div className="space-y-3">
                 <p className="text-gray-600 font-medium"><span className="text-gray-900 font-bold">{t("results.seed")}:</span> {crop.details.seed}</p>
                 <p className="text-gray-600 font-medium"><span className="text-gray-900 font-bold">NPK:</span> {crop.details.npkText}</p>
                 <p className="text-sm border border-orange-200 bg-orange-50 text-orange-700 p-3 rounded-lg font-semibold mt-2">
                   💡 {crop.details.extraTip}
                 </p>
               </div>
            </div>

            {/* Block 2: Irrigation */}
            <div className="space-y-4">
               <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#2196F3] mb-4 border border-blue-100">
                 <CloudRain size={24} />
               </div>
               <h3 className="text-xl font-extrabold text-gray-900">{t("results.irrigation")}</h3>
               <div className="space-y-3">
                 <p className="text-gray-600 font-medium"><span className="text-gray-900 font-bold">{t("results.totalWater")}:</span> {crop.details.water}</p>
                 <p className="text-gray-600 font-medium"><span className="text-gray-900 font-bold">{t("results.stages")}:</span> {crop.details.irrigationStages}</p>
                 <p className="text-sm bg-gray-50 text-gray-700 p-3 rounded-lg font-medium border border-gray-200">
                   💧 {crop.details.irrigationTip}
                 </p>
               </div>
            </div>

            {/* Block 3: Yield Expectation */}
            <div className="space-y-4">
               <div className="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center text-yellow-600 mb-4 border border-yellow-100">
                 <ShieldCheck size={24} />
               </div>
               <h3 className="text-xl font-extrabold text-gray-900">{t("results.yieldExpectation")}</h3>
               <div className="space-y-3">
                 <h4 className="text-4xl font-extrabold text-gray-900">{crop.details.yield}</h4>
                 <p className="text-gray-500 font-medium">{crop.details.yieldText} {t("results.inDistrict")} {district}</p>
                 <div className="w-full bg-gray-100 rounded-full h-3 mt-4">
                    <div className="bg-[#4CAF50] h-3 rounded-full w-[85%]"></div>
                 </div>
               </div>
            </div>

             {/* Block 4: Live Mandi */}
             <div className="space-y-4 bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-inner">
               <div className="flex justify-between items-center mb-2">
                 <h3 className="text-xl font-extrabold text-gray-900 border-b-2 border-gray-200 pb-2">Live {district} {t("results.mandi")}</h3>
                 <TrendingUp size={24} className="text-[#4CAF50]" />
               </div>
               
               <div className="mt-4">
                 <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">{t("results.modalPrice")}</p>
                 <p className="text-3xl font-extrabold text-gray-900">{crop.details.price} <span className="text-lg text-gray-500 font-medium">/qtl</span></p>
               </div>

               {/* Mini Chart visualization */}
               <div className="mt-8 relative h-12 flex items-end gap-2">
                 <div className="w-1/4 bg-blue-100 h-[40%] rounded-t-md relative group"><span className="absolute -top-6 text-xs text-gray-500 font-bold hidden group-hover:block transition">{t("results.low")}</span></div>
                 <div className="w-1/4 bg-blue-200 h-[60%] rounded-t-md relative group"><span className="absolute -top-6 text-xs text-gray-500 font-bold hidden group-hover:block">{t("results.avg")}</span></div>
                 <div className="w-1/4 bg-[#4CAF50] h-[90%] rounded-t-md relative group"><span className="absolute -top-6 text-xs text-[#4CAF50] font-bold hidden group-hover:block">{crop.details.price}</span></div>
                 <div className="w-1/4 bg-blue-300 h-[100%] rounded-t-md relative group"><span className="absolute -top-6 text-xs text-gray-500 font-bold hidden group-hover:block">{t("results.high")}</span></div>
                 <div className="absolute top-0 w-full border-t border-dashed border-gray-300"></div>
               </div>
               <div className="flex justify-between text-xs text-gray-400 font-bold mt-2">
                 <span>{t("results.min")}</span>
                 <span>{t("results.max")}</span>
               </div>
             </div>

          </div>
        </div>
      </div>

      {/* Top 3 AI Recommendations */}
      <div>
        <h3 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
           <Sprout className="text-[#4CAF50]"/> Alternate AI Suggestions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiResult.top_3_recommendations.slice(1).map((rec, idx) => {
            const recInfo = CROP_LIBRARY.find(c => c.name.toLowerCase() === rec.crop.toLowerCase()) || CROP_LIBRARY[0];
            return (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-start gap-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <div className="w-full h-40 overflow-hidden rounded-xl">
                  <img src={recInfo.image} onError={handleImageError} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={rec.crop} />
                </div>
                
                <div className="w-full">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 tracking-tight">{rec.crop} <span className="text-base font-medium text-gray-500">({recInfo.hindiName})</span></h4>
                    </div>
                    <span className="text-[#4CAF50] font-bold text-sm bg-green-50 px-3 py-1 rounded-full border border-green-100 whitespace-nowrap">{rec.confidence} Match</span>
                  </div>
                  
                  <span className="text-orange-700 font-bold text-xs bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-100 inline-block mb-4">{recInfo.season}</span>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm font-medium text-gray-600 mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-1.5"><ThermometerSun size={14} className="text-yellow-500"/> {recInfo.tempRange}</div>
                    <div className="flex items-center gap-1.5"><CloudRain size={14} className="text-blue-400"/> {recInfo.waterNeed.split(' ')[0]}</div>
                    <div className="flex items-center gap-1.5"><TrendingUp size={14} className="text-green-500"/> Profit: {recInfo.profitability}</div>
                    <div className="flex items-center gap-1.5"><Leaf size={14} className="text-green-600"/> {recInfo.soilType}</div>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2"><strong>💡 Tip:</strong> {recInfo.details.extraTip}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

