/**
 * ResultsPage.jsx
 * 
 * Displays the AI-generated crop recommendations based on the user's inputs.
 * It presents a uniform, rich visual layout showing the crop image, 
 * seed/fertilizer requirements, irrigation scheduling, and real-time mandi prices.
 */
import { ArrowLeft, Save, Share2, TrendingUp, CheckCircle, Sprout, CloudRain, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function ResultsPage() {
  const { district } = useAppContext();

  return (
    <div className="max-w-6xl mx-auto w-full">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <Link to="/suggest" className="text-sm font-bold text-gray-500 hover:text-[#2196F3] flex items-center gap-2 mb-2 transition-colors">
            <ArrowLeft size={16} /> Try Different Inputs
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Recommended for <span className="text-[#4CAF50]">{district}</span>
          </h1>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
           <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
             <Save size={18} /> Save Plan
           </button>
           <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20b858] text-white rounded-xl font-bold transition-all shadow-sm">
             <Share2 size={18} /> WhatsApp
           </button>
        </div>
      </div>

      {/* Main Results Grid (Uniform / Spaced Out layout) */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        
        {/* Banner */}
        <div className="relative h-64 md:h-80 w-full overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=1600&q=80" 
            alt="Wheat Field" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent flex flex-col justify-end p-8 md:p-12">
             <div className="flex items-center gap-3 mb-2">
               <span className="bg-[#4CAF50] text-white px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1">
                 <CheckCircle size={16} /> 96% Match
               </span>
               <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-sm font-bold">
                 High Yield Potential
               </span>
             </div>
             <h2 className="text-5xl md:text-6xl font-extrabold text-white">Wheat <span className="text-gray-300 font-medium text-3xl ml-2">(गेहूं)</span></h2>
          </div>
        </div>

        {/* Info Grid - Generously spaced */}
        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            
            {/* Block 1 */}
            <div className="space-y-4">
               <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-[#4CAF50] mb-4 border border-green-100">
                 <Sprout size={24} />
               </div>
               <h3 className="text-xl font-extrabold text-gray-900">Seed & Fertilizer</h3>
               <div className="space-y-3">
                 <p className="text-gray-600 font-medium"><span className="text-gray-900 font-bold">Seed:</span> GW-322 Wheat, 100kg/ha</p>
                 <p className="text-gray-600 font-medium"><span className="text-gray-900 font-bold">NPK:</span> 120:60:40 kg/ha</p>
                 <p className="text-sm border border-orange-200 bg-orange-50 text-orange-700 p-3 rounded-lg font-semibold mt-2">
                   Add Zinc Sulphate (25kg/ha) for your specific soil.
                 </p>
               </div>
            </div>

            {/* Block 2 */}
            <div className="space-y-4">
               <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#2196F3] mb-4 border border-blue-100">
                 <CloudRain size={24} />
               </div>
               <h3 className="text-xl font-extrabold text-gray-900">Irrigation</h3>
               <div className="space-y-3">
                 <p className="text-gray-600 font-medium"><span className="text-gray-900 font-bold">Total Water:</span> ~400mm / season</p>
                 <p className="text-gray-600 font-medium"><span className="text-gray-900 font-bold">Stages:</span> 4-5 irrigations</p>
                 <p className="text-sm bg-gray-50 text-gray-700 p-3 rounded-lg font-medium border border-gray-200">
                   Requires critical watering at CRI stage (21 days).
                 </p>
               </div>
            </div>

            {/* Block 3 */}
            <div className="space-y-4">
               <div className="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center text-yellow-600 mb-4 border border-yellow-100">
                 <ShieldCheck size={24} />
               </div>
               <h3 className="text-xl font-extrabold text-gray-900">Yield Expectation</h3>
               <div className="space-y-3">
                 <h4 className="text-4xl font-extrabold text-gray-900">45-50</h4>
                 <p className="text-gray-500 font-medium">Quintals per hectare avg. in {district}</p>
                 <div className="w-full bg-gray-100 rounded-full h-3 mt-4">
                    <div className="bg-[#4CAF50] h-3 rounded-full w-[85%]"></div>
                 </div>
               </div>
            </div>

             {/* Block 4 */}
             <div className="space-y-4 bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-inner">
               <div className="flex justify-between items-center mb-2">
                 <h3 className="text-xl font-extrabold text-gray-900 border-b-2 border-gray-200 pb-2">Live {district} Mandi</h3>
                 <TrendingUp size={24} className="text-[#4CAF50]" />
               </div>
               
               <div className="mt-4">
                 <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">Modal Price</p>
                 <p className="text-3xl font-extrabold text-gray-900">₹2,850 <span className="text-lg text-gray-500 font-medium">/qtl</span></p>
               </div>

               {/* Mini Chart visualization */}
               <div className="mt-8 relative h-12 flex items-end gap-2">
                 <div className="w-1/4 bg-blue-100 h-[40%] rounded-t-md relative group"><span className="absolute -top-6 text-xs text-gray-500 font-bold hidden group-hover:block transition">₹2500</span></div>
                 <div className="w-1/4 bg-blue-200 h-[60%] rounded-t-md relative group"><span className="absolute -top-6 text-xs text-gray-500 font-bold hidden group-hover:block">₹2650</span></div>
                 <div className="w-1/4 bg-[#4CAF50] h-[90%] rounded-t-md relative group"><span className="absolute -top-6 text-xs text-[#4CAF50] font-bold hidden group-hover:block">₹2850</span></div>
                 <div className="w-1/4 bg-blue-300 h-[100%] rounded-t-md relative group"><span className="absolute -top-6 text-xs text-gray-500 font-bold hidden group-hover:block">₹2900</span></div>
                 <div className="absolute top-0 w-full border-t border-dashed border-gray-300"></div>
               </div>
               <div className="flex justify-between text-xs text-gray-400 font-bold mt-2">
                 <span>Min</span>
                 <span>Max</span>
               </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
}
