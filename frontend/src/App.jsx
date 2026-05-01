/**
 * App.jsx
 * 
 * The root component of the Kisan AI Sahayak application.
 * This file is responsible for setting up the main layout (Navbar, Footer, FloatingVoiceAssistant)
 * and configuring the URL routes to render different pages (Landing, Form, Results).
 */
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import FloatingVoiceAssistant from "./components/FloatingVoiceAssistant";
import LandingPage from "./pages/LandingPage";
import CropSuggestForm from "./pages/CropSuggestForm";
import ResultsPage from "./pages/ResultsPage";
import WeatherPage from "./pages/WeatherPage";
import DiseasePage from "./pages/DiseasePage";
import VoiceAssistantPage from "./pages/VoiceAssistantPage";
<<<<<<< HEAD
import TimelinePage from "./pages/TimelinePage";
=======
import SeedAdvisorPage from "./pages/SeedAdvisorPage";
import DashboardPage from "./pages/DashboardPage";
import TimelinePage from "./pages/Timelinepage";
>>>>>>> 76e81efe (Clean repo and added new features)

function App() {
  return (
    <div className="min-h-screen flex flex-col w-full relative bg-[#f9fbf9] overflow-hidden z-0">
      
      {/* Modern Gradient Blobs Background */}
      <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden bg-gradient-premium">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-400/20 blur-[120px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-teal-300/15 blur-[130px] animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-10%] left-[10%] w-[45%] h-[45%] rounded-full bg-green-300/20 blur-[140px] animate-blob" style={{ animationDelay: '4s' }}></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.04] mix-blend-overlay"></div>
      </div>

      <Navbar />
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-32 max-w-[1600px] relative">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/suggest" element={<CropSuggestForm />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/disease" element={<DiseasePage />} />
          <Route path="/assistant" element={<VoiceAssistantPage />} />
<<<<<<< HEAD
=======
          <Route path="/seed-advisor" element={<SeedAdvisorPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
>>>>>>> 76e81efe (Clean repo and added new features)
          <Route path="/timeline" element={<TimelinePage />} />
        </Routes>
      </main>
      <Footer />
      <FloatingVoiceAssistant />
    </div>
  );
}

export default App;
