import { Link } from "react-router-dom";
import { 
  ArrowRight, Leaf, Droplets, LineChart, 
  ShieldCheck, Activity, CloudSun, 
  ThermometerSun, CloudRain, Wind, 
  Mic, MessageSquare, Headphones 
} from "lucide-react";

const features = [
  {
    id: 'crop',
    pill: 'Serving Madhya Pradesh Farmers',
    titleTop: 'CROP SUGGESTION',
    titleBottom: 'BETTER YIELDS',
    description: 'Personalized AI-driven crop suggestions based on real-time soil health, weather, and market trends in Madhya Pradesh.',
    bgImage: "https://images.unsplash.com/photo-1592982537447-6f23f5b722aa?q=80&w=2000&auto=format&fit=crop",
    primaryLink: '/suggest',
    primaryLinkText: 'FIND SUGGESTED CROPS',
    miniCards: [
      { icon: Leaf, title: 'SOIL HEALTH', desc: 'Comprehensive soil sample analysis and nutrient tracking' },
      { icon: Droplets, title: 'IRRIGATION', desc: 'Smart drip irrigation scheduling and nozzle tracking' },
      { icon: LineChart, title: 'DISTRICT DATA', desc: 'Real-time regional agricultural metrics dashboard' }
    ]
  },
  {
    id: 'disease',
    pill: 'AI-Powered Analysis',
    titleTop: 'DISEASE DETECTION',
    titleBottom: 'PROTECT YIELDS',
    description: 'Instantly identify plant diseases by uploading a photo. Get AI-powered diagnosis, treatment, and preventive measures.',
    bgImage: "https://images.unsplash.com/photo-1558350315-8aa00e8e4590?q=80&w=2000&auto=format&fit=crop",
    primaryLink: '/disease',
    primaryLinkText: 'DETECT DISEASES NOW',
    miniCards: [
      { icon: ShieldCheck, title: 'INSTANT DIAGNOSIS', desc: 'Fast and accurate plant disease identification' },
      { icon: Activity, title: 'TREATMENT PLANS', desc: 'Actionable steps to treat and prevent spreading' },
      { icon: CloudSun, title: 'WEATHER CONTEXT', desc: 'Environmental factors considered in diagnosis' }
    ]
  },
  {
    id: 'weather',
    pill: 'Real-Time Updates',
    titleTop: 'WEATHER FORECAST',
    titleBottom: 'PLAN AHEAD',
    description: 'Access real-time agricultural weather forecasts. Get temperature, humidity, and rainfall predictions for your district to plan farming activities.',
    bgImage: "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?q=80&w=2000&auto=format&fit=crop",
    primaryLink: '/weather',
    primaryLinkText: 'CHECK WEATHER NOW',
    miniCards: [
      { icon: ThermometerSun, title: 'TEMPERATURE', desc: 'Daily high/low temperature monitoring' },
      { icon: CloudRain, title: 'RAINFALL', desc: 'Precipitation alerts and seasonal forecasts' },
      { icon: Wind, title: 'HUMIDITY & WIND', desc: 'Crucial metrics for spraying and irrigation' }
    ]
  },
  {
  id: 'timeline',
  pill: 'AI Farming Planner',
  titleTop: 'SMART TIMELINE',
  titleBottom: 'PLAN SMARTER',
  description: 'Generate weather-based farming schedules, irrigation planning, and proactive crop alerts using AI-powered agricultural logic.',
  bgImage: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2000&auto=format&fit=crop",
  primaryLink: '/timeline',
  primaryLinkText: 'GENERATE TIMELINE',
  miniCards: [
    { icon: CloudRain, title: 'RAIN ALERTS', desc: 'Avoid irrigation before rainfall' },
    { icon: ThermometerSun, title: 'HEAT WARNINGS', desc: 'Protect crops during heat stress' },
    { icon: LineChart, title: 'SMART ACTIONS', desc: 'Daily farming recommendations' }
  ]
},
  {
    id: 'assistant',
    pill: '24/7 Availability',
    titleTop: 'VOICE ASSISTANT',
    titleBottom: 'EXPERT SUPPORT',
    description: 'Talk to our AI assistant in Hindi or English. Ask any farming-related query and get instant voice or text responses, tailored to your needs.',
    bgImage: "https://images.unsplash.com/photo-1586771107445-d3afef11df98?q=80&w=2000&auto=format&fit=crop",
    primaryLink: '/assistant',
    primaryLinkText: 'START CONVERSATION',
    miniCards: [
      { icon: Mic, title: 'BILINGUAL', desc: 'Seamless support in both Hindi and English' },
      { icon: MessageSquare, title: 'INSTANT ANSWERS', desc: 'Get immediate solutions to your farming queries' },
      { icon: Headphones, title: 'HANDS-FREE', desc: 'Voice-enabled interaction for easy field use' }
    ]
  }
];

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center w-full pb-12">
      {/* Secondary Info Section (Vertical Scroll) */}
      <div className="w-full mt-24 pb-12 flex flex-col items-center justify-start gap-8 relative text-center z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.2] max-w-4xl mx-auto">
          <span className="text-[#4CAF50]">Kisan AI Sahayak: </span>intelligent decisions for Madhya Pradesh Farmers.
        </h2>
        <p className="text-lg md:text-xl text-gray-700 font-medium max-w-3xl mx-auto my-1">
          Unlock data-driven insights, personalized crop advice, and boost your farm's productivity with AI-powered support.
        </p>

        <div className="relative w-full max-w-7xl mt-12 mb-20 flex justify-center perspective-1000 z-10">
          <div className="relative group w-full flex justify-center">
            <img
              src="/mp-crop-map.png"
              alt="Madhya Pradesh 3D Crop Map" 
              className="w-full max-w-[600px] h-auto relative z-10 transition-transform duration-700 hover:-translate-y-5 hover:scale-105 hover:drop-shadow-[0_20px_50px_rgba(76,175,80,0.6)] cursor-pointer"
              onError={(e) => { 
                e.target.src = 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=1200&q=80'; 
                e.target.classList.add('opacity-80', 'rounded-[2rem]') 
              }}
            />
          </div>
        </div>
      </div>

      {/* Feature Sections - 2x2 Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {features.map((feature) => (
          <div key={feature.id} className="w-full relative rounded-3xl overflow-hidden flex flex-col items-center shadow-lg border border-white group">
            
            {/* Background Layer */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] group-hover:scale-105"
              style={{ backgroundImage: `url('${feature.bgImage}')` }}
            ></div>

            {/* Overlay Layer */}
            <div className="absolute inset-0 bg-[#f0f2e6]/85 backdrop-blur-[2px]"></div>

            {/* Content Container */}
            <div className="relative z-10 w-full px-5 py-6 sm:p-8 flex flex-col h-full">

              {/* Title & Description */}
              <div className="mb-6 text-center flex-shrink-0">
                {/* Top Pill Tag */}
                <div className="inline-flex px-3 py-1 rounded-full bg-[#e2e8db] text-[10px] font-bold text-gray-800 tracking-widest uppercase mb-4 shadow-inner mx-auto">
                  {feature.pill}
                </div>

                {/* Main Headline */}
                <h2 className="text-2xl sm:text-3xl font-black text-[#1a4a38] tracking-tight leading-[1.1] mb-3">
                  {feature.titleTop}
                  <span className="block opacity-90 text-xl sm:text-2xl mt-1">{feature.titleBottom}</span>
                </h2>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-gray-800 font-medium leading-relaxed max-w-sm mx-auto">
                  {feature.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 w-full max-w-xs mx-auto mb-8 flex-shrink-0">
                <Link to={feature.primaryLink} className="flex items-center justify-center gap-2 bg-[#1a4a38] hover:bg-[#133629] text-white px-4 py-2.5 rounded-2xl text-xs font-bold tracking-wide transition-all hover:shadow-xl hover:-translate-y-0.5">
                  {feature.primaryLinkText} <ArrowRight size={16} />
                </Link>
                {feature.secondaryLink && (
                  <Link to={feature.secondaryLink} className="flex items-center justify-center px-4 py-2.5 rounded-2xl text-xs font-bold tracking-wide transition-all bg-white/50 text-[#1a4a38] border border-[#1a4a38]/40 hover:border-[#1a4a38] hover:bg-white/80">
                    {feature.secondaryLinkText}
                  </Link>
                )}
              </div>
              
              {/* Glassmorphic Feature Badges (Compact 3-column row) */}
              <div className="mt-auto pt-6 border-t border-[#1a4a38]/10 grid grid-cols-3 gap-2 sm:gap-4 w-full">
                {feature.miniCards.map((card, cardIndex) => (
                  <div key={cardIndex} className="flex flex-col items-center text-center gap-2 group/badge">
                    <div className="bg-white/60 backdrop-blur-md p-2.5 sm:p-3 rounded-full text-[#1a4a38] shadow-[0_2px_10px_rgba(26,74,56,0.05)] border border-white/80 transition-transform duration-300 group-hover/badge:-translate-y-1 group-hover/badge:shadow-md">
                      <card.icon size={18} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-[9px] sm:text-[10px] font-extrabold text-[#1a4a38] tracking-widest uppercase mb-1">{card.title}</h3>
                      <p className="text-[10px] text-gray-600 font-medium leading-tight hidden sm:block">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
