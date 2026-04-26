import { Link, useLocation } from "react-router-dom";
import { User, Menu, X, Leaf } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { useAppContext } from "../../context/AppContext";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Crop AI", path: "/suggest" },
  { name: "Weather Condition", path: "/weather" },
  { name: "Disease Detection", path: "/disease" },
  { name: "AI Voice Assistant", path: "/assistant" },
  { name: "Farm Health", path: "#health" },
];

const LANGUAGES = ["English", "Hindi", "Malvi", "Bundeli", "Bagheli", "Nimadi"];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useAppContext();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-br from-[#4CAF50] to-[#81C784] p-2.5 text-white shadow-sm">
              <Leaf size={26} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold leading-none text-gray-900">Kisan AI</span>
              <span className="text-sm font-semibold uppercase tracking-wide text-[#4CAF50]">Sahayak</span>
            </div>
          </Link>

          <div className="hidden items-center space-x-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "relative py-6 text-[15px] font-semibold transition-all duration-200 hover:text-[#4CAF50]",
                  location.pathname === link.path || (link.path === "/suggest" && location.pathname === "/results")
                    ? "text-[#4CAF50] before:absolute before:bottom-0 before:h-1 before:w-full before:rounded-t-md before:bg-[#4CAF50]"
                    : "text-gray-500",
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="hidden cursor-pointer rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2.5 text-sm font-medium text-gray-700 shadow-sm outline-none transition-colors hover:border-[#4CAF50] focus:border-[#4CAF50] focus:ring-[#4CAF50] sm:block"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>

            <button className="group flex items-center justify-center rounded-full border border-gray-200 bg-white p-2.5 text-gray-500 shadow-sm transition-all duration-300 hover:bg-[#2196F3] hover:text-white">
              <User size={20} className="transition-transform group-hover:scale-110" />
            </button>

            <button onClick={() => setIsOpen(!isOpen)} className="rounded-lg bg-gray-50 p-2 text-gray-600 lg:hidden">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute w-full border-t border-gray-100 bg-white pb-4 shadow-xl lg:hidden">
          <div className="space-y-2 px-5 pt-4">
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-400">
              Select Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-base font-medium shadow-sm outline-none"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>

            <div className="space-y-1 pt-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base font-semibold text-gray-700 transition-colors hover:bg-green-50/50 hover:text-[#4CAF50]"
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
