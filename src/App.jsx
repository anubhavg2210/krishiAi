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

function App() {
  return (
    <div className="min-h-screen flex flex-col w-full relative bg-[#f9fbf9] overflow-hidden z-0">
      
      {/* Modern Gradient Blobs Background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-green-400/20 blur-[140px]"></div>
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[50%] rounded-full bg-yellow-300/10 blur-[120px]"></div>
        <div className="absolute bottom-[20%] left-[10%] w-[40%] h-[40%] rounded-full bg-green-200/20 blur-[140px]"></div>
        <div className="absolute bottom-[-15%] right-[10%] w-[50%] h-[30%] rounded-full bg-green-400/15 blur-[150px]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
      </div>

      <Navbar />
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-32 max-w-[1600px] relative">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/suggest" element={<CropSuggestForm />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/disease" element={<DiseasePage />} />
        </Routes>
      </main>
      <Footer />
      <FloatingVoiceAssistant />
    </div>
  );
}

export default App;
