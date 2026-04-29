import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CloudSun,
  Loader2,
  MessageSquare,
  Mic,
  MicOff,
  Send,
  Sparkles,
  Sprout,
  Volume2,
  Bot
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || "gemini-2.5-flash";

const PAGE_LABELS = {
  "/": "home",
  "/suggest": "crop recommendation",
  "/results": "results",
  "/weather": "weather",
  "/disease": "disease detection",
  "/assistant": "voice assistant",
};

const QUICK_ACTIONS = [
  { label: "Check Weather", icon: CloudSun, route: "/weather", reply: "Weather page opened." },
  { label: "Crop Suggestion", icon: Sprout, route: "/suggest", reply: "Crop recommendation page opened." },
  { label: "Disease Detection", icon: Sparkles, route: "/disease", reply: "Disease detection page opened." },
];

function getSpeechRecognition() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

function detectSpeechLanguage(text) {
  return /[a-z]/i.test(text) && !/[\u0900-\u097F]/.test(text) ? "en-IN" : "hi-IN";
}

function stopSpeaking() {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

function speakText(text) {
  if (typeof window === "undefined" || !window.speechSynthesis || !text.trim()) {
    return;
  }
  
  const voices = window.speechSynthesis.getVoices();
  const hindiVoices = voices.filter(v => v.lang.includes('hi-IN') || v.lang.includes('hi'));
  const targetVoice = hindiVoices.find(v => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('rishabh')) || hindiVoices[0] || voices[0];
  
  const chunks = text.split(/([.!?\n]+)/);
  let sentences = [];
  for (let i = 0; i < chunks.length; i += 2) {
    let combined = ((chunks[i] || "") + (chunks[i + 1] || "")).trim();
    if (combined) {
      sentences.push(combined);
    }
  }

  sentences.forEach((sentence) => {
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.lang = detectSpeechLanguage(sentence);
    if (targetVoice) {
      utterance.voice = targetVoice;
    }
    utterance.rate = 0.9;
    utterance.pitch = 0.8;
    window.speechSynthesis.speak(utterance);
  });
}

function buildContextLine({ pathname, district, weatherData }) {
  const pageLabel = PAGE_LABELS[pathname] || "app";
  const weatherSummary = weatherData
    ? `District ${district}. Temp ${weatherData.temp}C, humidity ${weatherData.humidity}%, rainfall ${weatherData.rainfall} mm.`
    : `District ${district}. Live weather not loaded.`;

  return `Current page: ${pageLabel}. ${weatherSummary}`;
}

async function askGeminiAndSpeak(message, context, history, onUpdate) {
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key missing hai.");
  }

  const recentHistory = history
    .slice(-6)
    .map((item) => `${item.role === "assistant" ? "Assistant" : "User"}: ${item.text}`)
    .join("\n");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: [
                  "Tum ek behad anubhavi (experienced) desi Kisan ho jo apne kisan bhaiyon ki kheti mein madad karta hai.",
                  "Tumhari boli aur aawaz ekdum gaon ke samajhdar kisan jaisi honi chahiye. Shuruat hamesha 'Ram Ram bhai', 'Kisan bhai', ya 'Bhaiya' jaise shabdo se karo.",
                  "Jawab hamesha theth Hindi ya simple Hinglish me do.",
                  "Bohot important: Jawab sawaal ke hisaab se sateek (accurate) aur puri tarah mukammal (complete) hona chahiye. Agar lambi detail chahiye to step-by-step poora samjhao, aur agar chhota sawaal hai to to-the-point jawab do. Par koi bhi sentence aadhura mat chhodna.",
                  "Agar kisan krishi (agriculture), fasal, ya beej ke baare me puche toh apna pura anubhav ek kisan ki tarah saajha karo.",
                  "Diye gaye Context me district aur Live Weather data hai. Mausam ka haal pooche to strictly usi weather data ka use karke batao aur us mausam me kheti ki salah do.",
                  "Kisan ko practical agla step batao aur relevant hone par apne andaz me crop suggestion ya disease detection page ka zikr karo.",
                  `Context: ${context}`,
                  recentHistory ? `Recent chat:\n${recentHistory}` : "",
                  `User question: ${message}`,
                ]
                  .filter(Boolean)
                  .join("\n"),
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 2048,
        },
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Gemini API error ya quota limit.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullText = "";
  let buffer = "";

  stopSpeaking(); // Clear old audio

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    const chunk = decoder.decode(value, { stream: true });
    
    // Extract text from stream chunk safely
    const regex = /"text":\s*"((?:[^"\\]|\\.)*)"/g;
    let match;
    while ((match = regex.exec(chunk)) !== null) {
       let rawStr = match[1];
       let parsedStr = rawStr.replace(/\\n/g, '\n').replace(/\\"/g, '"');
       
       fullText += parsedStr;
       buffer += parsedStr;
       onUpdate(fullText);

       // Dispatch to TTS queue immediately if we hit sentence boundaries
       if (/[.!?\n]/.test(buffer)) {
          let parts = buffer.split(/([.!?\n]+)/);
          while (parts.length > 2) {
             let sentence = parts.shift();
             let punct = parts.shift();
             let combined = (sentence + punct).trim();
             if (combined) {
                // Speak the chunk using the browser queue
                speakText(combined);
             }
          }
          buffer = parts.join(""); 
       }
    }
  }

  if (buffer.trim()) {
     speakText(buffer.trim());
  }

  if (!fullText) {
    throw new Error("Gemini ne empty response diya.");
  }

  return fullText;
}

function getIntent(message) {
  const value = message.toLowerCase();

  if (/(mausam|weather|barish|temperature|humid|rain)/.test(value)) return "weather";
  if (/(disease|bimari|rog|leaf|patta|photo|image|analyze)/.test(value)) return "disease";
  if (/(crop|fasal|suggest|recommend|beej|soil|npk|ph)/.test(value)) return "suggest";
  if (/(result|plan|yield|mandi|price)/.test(value)) return "results";
  if (/(assistant|voice|awaaz)/.test(value)) return "assistant";
  if (/(home|ghar|landing|main page)/.test(value)) return "home";

  return null;
}

function resolveLocalAction(message, navigate, district, pathname) {
  const value = message.toLowerCase().trim();
  const intent = getIntent(value);

  if (/(khol|open|le chalo|show|dikhao|jao)/.test(value) && intent) {
    const route =
      intent === "weather"
        ? "/weather"
        : intent === "disease"
          ? "/disease"
          : intent === "suggest"
            ? "/suggest"
            : intent === "results"
              ? "/results"
              : intent === "assistant"
                ? "/assistant"
                : "/";

    navigate(route);

    const labels = {
      "/weather": "Weather page",
      "/disease": "Disease detection page",
      "/suggest": "Crop recommendation page",
      "/results": "Results page",
      "/assistant": "Voice assistant page",
      "/": "Home page",
    };

    return `${labels[route]} khol diya. ${district} ke hisaab se aage ka kaam yahin se kar sakte ho.`;
  }

  if (/tum kya kar sakte ho|help|madad|kaise use karu/.test(value)) {
    return `Main mausam samjha sakta hoon, crop suggestion page tak le ja sakta hoon, disease detection guide kar sakta hoon, aur ${district} context ke saath short advice de sakta hoon.`;
  }

  if (/mera district|current district|kaunsa district/.test(value)) {
    return `Abhi selected district ${district} hai aur aap ${PAGE_LABELS[pathname] || "app"} page par ho.`;
  }

  return null;
}

function createAssistantMessage(text) {
  return { role: "assistant", text, id: `${Date.now()}-assistant-${Math.random()}` };
}

function createUserMessage(text) {
  return { role: "user", text, id: `${Date.now()}-user-${Math.random()}` };
}

function AssistantPanel({ location, district, weatherData }) {
  const SpeechRecognition = getSpeechRecognition();
  const recognitionRef = useRef(null);
  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const navigate = useNavigate();

  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [heardText, setHeardText] = useState("");
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([
    createAssistantMessage("Welcome to Kisan AI Sahayak! I am here to assist you with crop suggestions, weather updates, and disease detection. How can I help you today?"),
  ]);

  const contextLine = useMemo(
    () =>
      buildContextLine({
        pathname: location.pathname,
        district,
        weatherData,
      }),
    [district, location.pathname, weatherData],
  );

  const latestAssistantReply =
    [...messages].reverse().find((item) => item.role === "assistant")?.text ||
    "Namaste! Main sun raha hoon.";

  useEffect(() => {
    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 120);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) {
      return;
    }

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isListening, heardText]);

  // Removed auto-mic start behavior as requested.

  useEffect(() => {
    if (!SpeechRecognition) {
      return undefined;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "hi-IN";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onstart = () => {
      setHeardText("");
      setError("");
    };

    recognition.onresult = async (event) => {
      const transcript = Array.from(event.results || [])
        .map((result) => result?.[0]?.transcript || "")
        .join(" ")
        .trim();

      setHeardText(transcript);
      setQuery(transcript);

      const isFinal = Array.from(event.results || []).some((result) => result.isFinal);
      if (isFinal && transcript) {
        await handleAsk(transcript);
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      if (event.error === "no-speech") {
        setError("Aapne kuch bola nahi. Kripya dobara mic dabayein aur bolein.");
        return;
      }
      setError(
        event.error === "not-allowed"
          ? "Mic permission allow karo."
          : `Voice input error: ${event.error}. Mic check karein.`,
      );
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [SpeechRecognition, contextLine, district, location.pathname, messages]);

  async function handleAsk(rawMessage) {
    const message = rawMessage.trim();
    if (!message || isLoading) {
      return;
    }

    const userMessage = createUserMessage(message);
    const historyWithUser = [...messages, userMessage];

    setError("");
    setIsLoading(true);
    setMessages(historyWithUser);
    setQuery("");

    try {
      const localReply = resolveLocalAction(message, navigate, district, location.pathname);
      
      if (localReply) {
         setMessages((current) => [...current, createAssistantMessage(localReply)]);
         speakText(localReply);
         setIsLoading(false);
      } else {
         const assistantMessageId = `${Date.now()}-assistant`;
         setMessages((current) => [...current, { role: "assistant", text: "", id: assistantMessageId }]);
         
         await askGeminiAndSpeak(message, contextLine, historyWithUser, (partialText) => {
            setMessages((current) => 
               current.map((m) => m.id === assistantMessageId ? { ...m, text: partialText } : m)
            );
            // Hide loading indicator as soon as we start getting stream chunks
            setIsLoading(false);
         });
      }
    } catch (err) {
      setError(err.message || "Assistant abhi jawab nahi de pa raha.");
      setIsLoading(false);
    }
  }

  function handleMicClick() {
    // Unlock audio for TTS
    new Audio("data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA").play().catch(() => {});

    if (!recognitionRef.current) {
      setError("Is browser me voice recognition support nahi hai. Type karke pucho.");
      return;
    }

    setError("");

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch {
      setError("Mic ko dobara try karo. Browser ne request hold kar li.");
      setIsListening(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Unlock audio for asynchronous TTS
    new Audio("data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA").play().catch(() => {});
    handleAsk(query);
  }

  function handleQuickAction(action) {
    setError("");
    navigate(action.route);
    setMessages((current) => [
      ...current,
      createAssistantMessage(`${action.reply} ${district} ke hisaab se aage ka kaam yahin se kar sakte ho.`),
    ]);
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-2 sm:px-0">
      <section className="overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/70 shadow-[0_32px_80px_rgba(31,38,135,0.08)] backdrop-blur-2xl">
        {/* Header */}
        <div className="border-b border-white/50 bg-[#eef7ec]/40 px-6 py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1a4a38] shadow-lg shadow-[#1a4a38]/30">
                <Bot className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-[#1a4a38]">Kisan AI Sahayak</h1>
                <p className="mt-0.5 text-xs font-medium text-[#1a4a38]/80">Intelligent decisions for your farm</p>
              </div>
            </div>
            <div className="rounded-2xl border border-[#b3d7af] bg-white/60 px-4 py-1.5 text-xs font-bold text-[#1a4a38] shadow-sm backdrop-blur-md">
              {district}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border-b border-white/30 bg-[#d9eed4]/30 px-6 py-4">
          <div className="flex flex-wrap gap-2.5">
            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  type="button"
                  onClick={() => handleQuickAction(action)}
                  className="group flex items-center gap-2 rounded-2xl border border-slate-200/60 bg-white/80 px-4 py-2 text-[13px] font-semibold text-[#1a4a38] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#b3d7af] hover:bg-[#eef7ec] hover:text-[#1a4a38] hover:shadow-md"
                >
                  <Icon size={16} className="text-[#4CAF50] transition-colors group-hover:text-[#1a4a38]" />
                  <span>{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Area */}
        <div
          ref={messagesContainerRef}
          className="h-[55vh] min-h-[30rem] space-y-6 overflow-y-auto px-6 py-6 scroll-smooth"
        >
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`relative max-w-[85%] rounded-[2rem] px-5 py-4 text-[15px] leading-relaxed shadow-sm ${
                    message.role === "assistant"
                      ? "rounded-tl-sm border border-white/60 bg-[#eef7ec]/90 text-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
                      : "rounded-tr-sm bg-[#1a4a38] text-white shadow-md shadow-[#1a4a38]/20"
                  }`}
                >
                  <div className={`mb-1.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${message.role === "assistant" ? "text-[#1a4a38]" : "text-slate-300"}`}>
                    {message.role === "assistant" ? <Bot size={13} /> : <Send size={13} />}
                    {message.role === "assistant" ? "Kisan AI" : "You"}
                  </div>
                  <p className="whitespace-pre-wrap">{message.text}</p>
                </div>
              </motion.div>
            ))}

            {heardText && isListening && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="max-w-[85%] rounded-[2rem] rounded-tl-sm border border-[#b3d7af]/50 bg-[#eef7ec]/80 px-5 py-4 text-[15px] text-[#1a4a38] backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-[#4CAF50] animate-pulse"></span>
                    <span className="font-medium">Listening:</span> {heardText}
                  </div>
                </div>
              </motion.div>
            )}

            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="flex max-w-[85%] items-center gap-2 rounded-[2rem] rounded-tl-sm border border-white/60 bg-[#eef7ec]/90 px-6 py-5 shadow-sm">
                  <div className="flex gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-[#1a4a38] animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="h-2 w-2 rounded-full bg-[#1a4a38] animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="h-2 w-2 rounded-full bg-[#1a4a38] animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="border-t border-white/40 bg-white/40 px-6 py-5 backdrop-blur-xl">
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-2xl border border-red-200/60 bg-red-50/80 px-4 py-3 text-sm font-medium text-red-700 backdrop-blur-sm">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-red-600">!</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex items-end gap-3">
            <div className="relative flex-1 rounded-[2rem] border border-white/60 bg-white/80 p-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] backdrop-blur-sm focus-within:border-[#b3d7af] focus-within:bg-white focus-within:shadow-[0_8px_30px_rgba(26,74,56,0.1)] transition-all">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ask your farming questions..."
                className="w-full border-0 bg-transparent py-3 pl-5 pr-12 text-[15px] font-medium text-slate-800 outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={handleMicClick}
                className={`absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition-all ${
                  isListening
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse"
                    : "bg-[#eef7ec] text-[#1a4a38] hover:bg-[#d9eed4]"
                }`}
                aria-label="Start voice input"
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
            </div>
            
            <button
              type="button"
              onClick={() => speakText(latestAssistantReply)}
              className="flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-full border border-white/60 bg-white/80 text-slate-600 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[#1a4a38] hover:shadow-md"
              aria-label="Speak latest reply"
            >
              <Volume2 size={20} />
            </button>

            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-full bg-[#1a4a38] text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-[#1a4a38]/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              aria-label="Send message"
            >
               <Send size={20} className={isLoading || !query.trim() ? "opacity-50" : "ml-1"} />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default function FloatingVoiceAssistant({ mode = "floating" }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { district, weatherData } = useAppContext();

  if (mode === "page") {
    return <AssistantPanel location={location} district={district} weatherData={weatherData} />;
  }

  if (location.pathname === "/assistant") {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <motion.button
        type="button"
        onClick={() => navigate("/assistant")}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="group relative flex h-[90px] w-[90px] items-center justify-center rounded-full bg-gradient-to-tr from-[#4CAF50] to-[#2196F3] border-4 border-white shadow-[0_10px_40px_rgba(76,175,80,0.4)] transition-all hover:scale-105 hover:shadow-[0_15px_50px_rgba(33,150,243,0.5)] active:scale-95"
        aria-label="Open voice assistant page"
      >
        {/* Tooltip */}
        <div className="absolute -top-14 right-0 rounded-2xl bg-slate-900 px-4 py-2 text-[13px] font-bold tracking-wide text-white opacity-0 shadow-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-100 whitespace-nowrap z-20">
          Kisan Assistant
          <div className="absolute -bottom-1.5 right-8 h-3 w-3 rotate-45 bg-slate-900"></div>
        </div>

        {/* Original Farmer Icon */}
        <svg viewBox="0 0 100 100" className="z-10 mt-3 h-[85%] w-[85%]">
            <path d="M 20 100 C 20 70, 80 70, 80 100" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
            <path d="M 15 45 C 20 10, 80 10, 85 45 C 80 40, 20 40, 15 45" fill="#f87171" />
            <path d="M 10 35 C 40 20, 70 50, 90 25 C 80 10, 20 10, 10 35" fill="#ef4444" />
            <path d="M 85 40 C 95 60, 100 80, 85 95 C 75 70, 85 50, 85 40" fill="#ef4444" opacity="0.9" />
            <circle cx="50" cy="55" r="24" fill="#fbbf24" />
            <ellipse cx="40" cy="48" rx="3" ry="4" fill="#1e293b" />
            <ellipse cx="60" cy="48" rx="3" ry="4" fill="#1e293b" />
            <circle cx="41" cy="47" r="1" fill="#fff" />
            <circle cx="61" cy="47" r="1" fill="#fff" />
            <path d="M 32 40 Q 40 37 45 42" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 55 42 Q 60 37 68 40" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 25 65 Q 50 50 75 65 Q 85 70 65 65 Q 50 60 35 65 Q 15 70 25 65 Z" fill="#1e293b" />
            <path d="M 42 68 Q 50 80 58 68" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2" strokeLinecap="round" />
            <path d="M 85 30 Q 95 50 85 70" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" className="animate-pulse" />
            <path
              d="M 95 25 Q 110 50 95 75"
              fill="none"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.5"
              className="animate-ping"
              style={{ animationDuration: "2s" }}
            />
          </svg>

        {/* Pulse Effect */}
        <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping" style={{ animationDuration: "3s" }}></div>
        <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 transition-opacity group-hover:opacity-100"></div>

        {/* Recording Indicator (always red pulse for aesthetic) */}
        <div className="absolute right-1 top-1 h-4 w-4 rounded-full border-2 border-emerald-500 bg-red-500 shadow-sm"></div>
      </motion.button>
    </div>
  );
}
