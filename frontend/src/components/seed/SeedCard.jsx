import { Star, ExternalLink, Leaf, Info } from "lucide-react";
import AntiScamBadge from "./AntiScamBadge";

export default function SeedCard({ seed, onGetRecommendation }) {
  const handleBuyClick = () => {
    window.open(`https://utpannseeds.in/`, "_blank");
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-xl hover:border-green-200 transition-all duration-300">
      {/* Quality Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
          <Star size={12} className="text-yellow-500 fill-yellow-500" />
          {seed.rating} Rating
        </span>
      </div>
      
      <div className="absolute top-4 right-4 z-10">
        <span className="bg-green-600/90 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full shadow-sm">
          {seed.quality}
        </span>
      </div>

      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={seed.image} 
          alt={seed.name} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <h3 className="absolute bottom-4 left-4 text-2xl font-black text-white">{seed.name}</h3>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Price</p>
            <p className="text-sm font-bold text-gray-900">{seed.price}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-3">
            <p className="text-xs text-green-600 font-medium uppercase tracking-wider mb-1">Expected Yield</p>
            <p className="text-sm font-bold text-green-900">{seed.yield}</p>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {seed.features.map((feature, idx) => (
            <span key={idx} className="inline-flex items-center gap-1 text-[11px] font-semibold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md">
              <Leaf size={10} className="text-green-500" />
              {feature}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => onGetRecommendation(seed)}
            className="flex-1 flex items-center justify-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 py-3 rounded-xl text-sm font-bold transition-colors"
          >
            <Info size={16} />
            Why this seed?
          </button>
          
          <button 
            onClick={handleBuyClick}
            className="flex-1 flex items-center justify-center gap-2 bg-[#4CAF50] hover:bg-[#43A047] text-white py-3 rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md"
          >
            Buy Now
            <ExternalLink size={16} />
          </button>
        </div>

        <AntiScamBadge />
      </div>
    </div>
  );
}
