import { Link, useLocation } from "react-router-dom";
import { User, Menu, X, Leaf } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { useAppContext } from "../../context/AppContext";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Crop AI", path: "/suggest" },
  { name: "Weather Condition", path: "/weather" },
  { name: "Disease Detection", path: "/disease" }, // 👈 ADD THIS
  { name: "Mandi News", path: "#mandi" },
  { name: "Farm Health", path: "#health" },
];

const LANGUAGES = ["English", "Hindi", "Malvi", "Bundeli", "Bagheli", "Nimadi"];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useAppContext();
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-[#4CAF50] to-[#81C784] p-2.5 rounded-xl shadow-sm text-white">
              <Leaf size={26} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-gray-900 leading-none">
                Kisan AI
              </span>
              <span className="text-sm font-semibold text-[#4CAF50] tracking-wide uppercase">
                Sahayak
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-[15px] font-semibold transition-all duration-200 hover:text-[#4CAF50] py-6 relative",
                  location.pathname === link.path || (link.path === '/suggest' && location.pathname === '/results')
                    ? "text-[#4CAF50] before:absolute before:bottom-0 before:h-1 before:w-full before:bg-[#4CAF50] before:rounded-t-md"
                    : "text-gray-500"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side: Language & Login */}
          <div className="flex items-center gap-5">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="hidden sm:block text-sm font-medium text-gray-700 border border-gray-200 rounded-lg shadow-sm hover:border-[#4CAF50] focus:border-[#4CAF50] focus:ring-[#4CAF50] bg-gray-50/50 py-2.5 px-3 outline-none transition-colors cursor-pointer"
            >
              {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
            </select>

            <button className="p-2.5 text-gray-500 hover:text-white bg-white hover:bg-[#2196F3] transition-all duration-300 rounded-full border border-gray-200 shadow-sm flex items-center justify-center group">
              <User size={20} className="group-hover:scale-110 transition-transform" />
            </button>

            {/* Mobile menu button */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-gray-600 bg-gray-50 rounded-lg">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white absolute w-full shadow-xl pb-4">
          <div className="px-5 pt-4 space-y-2">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Select Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full text-base font-medium border border-gray-200 rounded-lg py-3 px-4 outline-none bg-gray-50 shadow-sm"
            >
              {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
            </select>

            <div className="pt-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-lg text-base font-semibold text-gray-700 hover:text-[#4CAF50] hover:bg-green-50/50 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
