import { Link, useLocation } from "react-router-dom";
import { User, Menu, X, Leaf, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { useAppContext } from "../../context/AppContext";
import { LANGUAGES } from "../../lib/translations";

const NAV_LINKS = [
  { labelKey: "nav.home", path: "/" },
  // { name: "Smart Timeline", path: "/timeline" },
  { labelKey: "nav.cropAi", path: "/suggest" },
  { labelKey: "nav.seedAdvisor", path: "/seed-advisor" },
  { labelKey: "nav.weather", path: "/weather" },
  { labelKey: "nav.disease", path: "/disease" },
  // { name: "Smart Timeline", path: "/timeline" },
  { labelKey: "nav.assistant", path: "/assistant" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { language, setLanguage, t } = useAppContext();
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
                key={link.labelKey}
                to={link.path}
                className={cn(
                  "relative py-6 text-[15px] font-semibold transition-all duration-200 hover:text-[#4CAF50]",
                  location.pathname === link.path || (link.path === "/suggest" && location.pathname === "/results")
                    ? "text-[#4CAF50] before:absolute before:bottom-0 before:h-1 before:w-full before:rounded-t-md before:bg-[#4CAF50]"
                    : "text-gray-500",
                )}
              >
                {t(link.labelKey)}
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
                <option key={lang.code} value={lang.code}>
                  {lang.nativeLabel}
                </option>
              ))}
            </select>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsProfileOpen((current) => !current)}
                className="group flex items-center justify-center rounded-full border border-gray-200 bg-white p-2.5 text-gray-500 shadow-sm transition-all duration-300 hover:bg-[#2196F3] hover:text-white"
                aria-label={t("nav.profile")}
                aria-expanded={isProfileOpen}
              >
                <User size={20} className="transition-transform group-hover:scale-110" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-12 w-56 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                  <div className="border-b border-gray-100 px-4 py-3">
                    <p className="text-sm font-extrabold text-gray-900">{t("nav.profile")}</p>
                    <p className="text-xs font-medium text-gray-500">Kisan AI Sahayak</p>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsProfileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 text-sm font-bold transition-colors hover:bg-green-50 hover:text-[#4CAF50]",
                      location.pathname === "/dashboard" ? "bg-green-50 text-[#4CAF50]" : "text-gray-700",
                    )}
                  >
                    <LayoutDashboard size={17} />
                    {t("nav.dashboard")}
                  </Link>
                </div>
              )}
            </div>

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
              {t("nav.selectLanguage")}
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-base font-medium shadow-sm outline-none"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeLabel}
                </option>
              ))}
            </select>

            <div className="space-y-1 pt-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.labelKey}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base font-semibold text-gray-700 transition-colors hover:bg-green-50/50 hover:text-[#4CAF50]"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
              <div className="border-t border-gray-100 pt-3 mt-3">
                <p className="px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {t("nav.profile")}
                </p>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-semibold text-gray-700 transition-colors hover:bg-green-50/50 hover:text-[#4CAF50]"
                >
                  <LayoutDashboard size={18} />
                  {t("nav.dashboard")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
