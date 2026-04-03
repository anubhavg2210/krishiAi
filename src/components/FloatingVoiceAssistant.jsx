import { motion } from "framer-motion";

export default function FloatingVoiceAssistant() {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex items-end justify-end group cursor-pointer">
      <motion.div 
        animate={{ y: [0, -8, 0] }} 
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="relative"
      >
        {/* Tooltip text */}
        <div className="absolute -top-16 right-4 bg-gray-900 text-white text-[15px] font-semibold py-2.5 px-5 rounded-2xl shadow-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 whitespace-nowrap pointer-events-none before:absolute before:-bottom-2 before:right-8 before:border-t-8 before:border-t-gray-900 before:border-x-8 before:border-x-transparent">
          Ask me anything! 🚜
        </div>
        
        {/* Cartoon illustration holder */}
        <div className="w-[100px] h-[100px] bg-gradient-to-tr from-[#4CAF50] to-[#2196F3] rounded-full shadow-[0_10px_40px_rgba(76,175,80,0.4)] flex items-center justify-center border-[4px] border-white overflow-hidden relative group-hover:shadow-[0_15px_50px_rgba(33,150,243,0.5)] transition-shadow duration-300 hover:scale-105 active:scale-95">
          
          {/* Simple SVG cartoon of an Indian farmer talking */}
          <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] mt-3 z-10">
            {/* Shoulders / body */}
            <path d="M 20 100 C 20 70, 80 70, 80 100" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2"/>
            
            {/* Turban (Safa) */}
            <path d="M 15 45 C 20 10, 80 10, 85 45 C 80 40, 20 40, 15 45" fill="#f87171" />
            <path d="M 10 35 C 40 20, 70 50, 90 25 C 80 10, 20 10, 10 35" fill="#ef4444" />
            <path d="M 85 40 C 95 60, 100 80, 85 95 C 75 70, 85 50, 85 40" fill="#ef4444" opacity="0.9" />

            {/* Face */}
            <circle cx="50" cy="55" r="24" fill="#fbbf24" />
            
            {/* Eyes */}
            <ellipse cx="40" cy="48" rx="3" ry="4" fill="#1e293b" />
            <ellipse cx="60" cy="48" rx="3" ry="4" fill="#1e293b" />
            <circle cx="41" cy="47" r="1" fill="#fff" />
            <circle cx="61" cy="47" r="1" fill="#fff" />
            
            {/* Eyebrows */}
            <path d="M 32 40 Q 40 37 45 42" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 55 42 Q 60 37 68 40" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />

            {/* Big Mustache */}
            <path d="M 25 65 Q 50 50 75 65 Q 85 70 65 65 Q 50 60 35 65 Q 15 70 25 65 Z" fill="#1e293b" />
            
            {/* Talking Mouth (hidden slightly under mustache) */}
            <path d="M 42 68 Q 50 80 58 68" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2" strokeLinecap="round" />

            {/* Sound waves emitted to show he is talking/listening */}
            <path d="M 85 30 Q 95 50 85 70" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" className="animate-pulse" />
            <path d="M 95 25 Q 110 50 95 75" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.5" className="animate-ping" style={{ animationDuration: '2s' }} />
          </svg>

          {/* Sparkle background element */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 rotate-45 transition-opacity"></div>
        </div>
        
        {/* Pulse Dot */}
        <div className="absolute top-1 right-2 w-5 h-5 bg-red-500 rounded-full border-[3px] border-white shadow-sm animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
        <div className="absolute top-1 right-2 w-5 h-5 bg-red-500 rounded-full border-[3px] border-white shadow-sm"></div>
      </motion.div>
    </div>
  );
}
