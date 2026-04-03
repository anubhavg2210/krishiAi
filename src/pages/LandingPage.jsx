/**
 * LandingPage.jsx
 * 
 * The home page of the website. Showcases a premium hero section
 * to introduce the "Kisan AI Sahayak" platform to the user.
 * Redesigned to feature an immersive, glassmorphic agricultural banner.
 */
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Droplets, LineChart, Map } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center w-full pb-12">
      {/* Hero Section Container */}
      <div className="w-full relative rounded-3xl mt-6 overflow-hidden lg:min-h-[640px] flex items-center shadow-lg border border-white">
        
        {/* Background Layer: Agricultural Landscape */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1592982537447-6f23f5b722aa?q=80&w=2000&auto=format&fit=crop')" }}
        ></div>
        
        {/* Overlay Layer: Fading from solid light-beige on left to clear on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f0f2e6] via-[#f0f2e6]/90 to-[#f0f2e6]/20"></div>

        {/* Content Container */}
        <div className="relative z-10 w-full px-4 sm:px-8 py-10 md:px-12 lg:px-16 flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12 h-full mt-4 lg:mt-0">
          
          {/* Left Area: Main Text and Buttons */}
          <div className="w-full flex-1 max-w-2xl text-center lg:text-left bg-gradient-to-br from-white/60 to-white/20 backdrop-blur-md p-6 sm:p-8 lg:p-10 rounded-[2rem] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
            
            {/* Top Pill Tag */}
            <div className="inline-flex px-3 py-1.5 rounded-full bg-[#e2e8db] text-[10px] sm:text-xs font-bold text-gray-800 tracking-widest uppercase mb-4 sm:mb-6 shadow-inner mx-auto lg:mx-0">
              Serving Madhya Pradesh Farmers
            </div>
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-black text-[#1a4a38] tracking-tight leading-[1.1] mb-5 sm:mb-6">
              CROP SUGGESTION<br className="hidden sm:block lg:hidden" />
              <span className="opacity-90">BETTER YIELDS</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-800 font-medium leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Personalized AI-driven crop suggestions based on real-time soil health, weather, and market trends in Madhya Pradesh.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/suggest" className="inline-flex items-center justify-center gap-2 bg-[#1a4a38] hover:bg-[#133629] text-white px-6 py-4 rounded-full text-sm font-bold tracking-wide transition-all hover:shadow-xl hover:-translate-y-0.5">
                FIND SUGGESTED CROPS <ArrowRight size={18} />
              </Link>
              <button className="inline-flex items-center justify-center px-6 py-4 rounded-full text-sm font-bold tracking-wide transition-all bg-white/50 lg:bg-transparent text-[#1a4a38] border border-[#1a4a38]/40 hover:border-[#1a4a38] hover:bg-white/80">
                EXPLORE MANDI PRICES
              </button>
            </div>
          </div>

          {/* Right Area: Glassmorphic Feature Cards */}
          <div className="flex flex-col gap-4 w-full max-w-sm lg:max-w-md lg:pr-4 mx-auto lg:mx-0 mt-4 lg:mt-0">
            
            {/* Feature Card 1: Soil Health */}
            <div className="bg-gradient-to-r from-[#d9eed4]/90 to-[#eef7ec]/90 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center gap-4 sm:gap-5 transition-transform duration-300 hover:-translate-y-1 cursor-default group">
              <div className="bg-[#b3d7af] p-3 sm:p-4 rounded-2xl text-[#1a4a38] shadow-inner font-bold transform group-hover:scale-110 transition-transform">
                <Leaf size={28} strokeWidth={2.5}/>
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-[#1a4a38] mb-1 tracking-tight">SOIL HEALTH</h3>
                <p className="text-xs sm:text-[13px] text-gray-700 font-medium leading-tight">Comprehensive soil sample analysis and nutrient tracking</p>
              </div>
            </div>

            {/* Feature Card 2: Irrigation */}
            <div className="bg-gradient-to-r from-[#d9eed4]/90 to-[#eef7ec]/90 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center gap-4 sm:gap-5 transition-transform duration-300 hover:-translate-y-1 cursor-default group">
              <div className="bg-[#b3d7af] p-3 sm:p-4 rounded-2xl text-[#1a4a38] shadow-inner font-bold transform group-hover:scale-110 transition-transform">
                <Droplets size={28} strokeWidth={2.5}/>
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-[#1a4a38] mb-1 tracking-tight">IRRIGATION</h3>
                <p className="text-xs sm:text-[13px] text-gray-700 font-medium leading-tight">Smart drip irrigation scheduling and nozzle tracking</p>
              </div>
            </div>

            {/* Feature Card 3: District Data */}
            <div className="bg-gradient-to-r from-[#d9eed4]/90 to-[#eef7ec]/90 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center gap-4 sm:gap-5 transition-transform duration-300 hover:-translate-y-1 cursor-default group">
              <div className="bg-[#b3d7af] p-3 sm:p-4 rounded-2xl text-[#1a4a38] shadow-inner font-bold transform group-hover:scale-110 transition-transform">
                <LineChart size={28} strokeWidth={2.5}/>
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-[#1a4a38] mb-1 tracking-tight">DISTRICT DATA</h3>
                <p className="text-xs sm:text-[13px] text-gray-700 font-medium leading-tight">Real-time regional agricultural metrics dashboard</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Secondary Info Section (Vertical Scroll) */}
      <div className="w-full mt-24 pb-12 flex flex-col items-center justify-start gap-8 relative text-center z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.2] max-w-4xl mx-auto">
          <span className="text-[#4CAF50]">Kisan AI Sahayak: </span>intelligent decisions for Madhya Pradesh Farmers.
        </h2>
        <p className="text-lg md:text-xl text-gray-700 font-medium max-w-3xl mx-auto my-1">
          Unlock data-driven insights, personalized crop advice, and boost your farm's productivity with AI-powered support.
        </p>

        <div className="relative w-full max-w-7xl mt-12 mb-20 flex justify-center perspective-1000 z-10">
          <div className="relative transition-all duration-700 hover:-translate-y-5 hover:scale-105 hover:drop-shadow-[0_20px_50px_rgba(76,175,80,0.6)] cursor-pointer group w-full flex justify-center">
            
            <img 
              src="/mp-crop-map.png" 
              alt="Madhya Pradesh 3D Crop Map" 
              className="w-full max-w-[600px] h-auto relative z-10 transition-transform duration-[1.5s] drop-shadow-2xl group-hover:scale-105" 
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=1200&q=80'; e.target.classList.add('opacity-80', 'rounded-[2rem]') }} 
            />
            
            {/* Map Icon Badge Pop-up */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white text-[#4CAF50] scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 z-30 flex flex-col items-center gap-2 pointer-events-none">
              <Map size={48} strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
