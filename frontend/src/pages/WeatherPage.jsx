/**
 * WeatherPage.jsx
 *
 * A full-featured, skeuomorphic weather dashboard for MP districts.
 * Design: Green gradient/patch background, raised card panels,
 * inset shadows, tactile dials — inspired by physical weather instruments.
 */
import { useState, useEffect, useCallback } from "react";
import {
  Thermometer, Droplets, Wind, Eye, Gauge, CloudSun, Zap,
  Leaf, RefreshCw, MapPin, Loader2, ArrowUp, Sun,
} from "lucide-react";
import { fetchWeatherForDistrict, MP_DISTRICTS } from "../lib/weatherService";

// ─── Utility ────────────────────────────────────────────────────────────────

/** Convert degrees to compass direction */
function degToCompass(deg) {
  const dirs = ["N","NE","E","SE","S","SW","W","NW"];
  return dirs[Math.round(deg / 45) % 8];
}

/** Pressure category */
function pressureLabel(p) {
  if (p < 1000) return { label: "Low", color: "#ef4444" };
  if (p < 1013) return { label: "Normal Low", color: "#f97316" };
  if (p < 1020) return { label: "Normal", color: "#22c55e" };
  return               { label: "High", color: "#3b82f6" };
}

// ─── Sub-components ──────────────────────────────────────────────────────────

/** Skeuomorphic raised card wrapper */
function SkeCard({ children, className = "" }) {
  return (
    <div
      className={`relative rounded-[1.5rem] overflow-hidden ${className}`}
      style={{
        background: "linear-gradient(145deg, #f0faf0, #e6f4e6)",
        boxShadow:
          "6px 6px 14px rgba(0,0,0,0.12), -4px -4px 10px rgba(255,255,255,0.85), inset 0 1px 0 rgba(255,255,255,0.8)",
        border: "1px solid rgba(255,255,255,0.7)",
      }}
    >
      {children}
    </div>
  );
}

/** Circular gauge dial */
function GaugeDial({ value, max, color, size = 80, label, unit, icon }) {
  const pct     = Math.min(value / max, 1);
  const r       = 30;
  const circ    = 2 * Math.PI * r;
  const dashArr = circ * 0.75;           // 270° arc
  const dashOff = dashArr * (1 - pct);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox="0 0 80 80" className="-rotate-[135deg]">
          {/* Track */}
          <circle cx="40" cy="40" r={r} fill="none" stroke="#d1d5db"
            strokeWidth="7" strokeLinecap="round"
            strokeDasharray={`${dashArr} ${circ}`} strokeDashoffset="0" />
          {/* Active */}
          <circle cx="40" cy="40" r={r} fill="none" stroke={color}
            strokeWidth="7" strokeLinecap="round"
            strokeDasharray={`${dashArr} ${circ}`}
            strokeDashoffset={dashOff}
            style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)", filter: `drop-shadow(0 0 4px ${color}80)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-black text-gray-800 leading-none">{value}</span>
          {unit && <span className="text-[9px] font-bold text-gray-500">{unit}</span>}
        </div>
      </div>
      <div className="flex items-center gap-1 text-xs font-semibold text-gray-600">
        {icon} {label}
      </div>
    </div>
  );
}

/** Wind compass rose */
function WindCompass({ deg, speed }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative w-20 h-20 rounded-full flex items-center justify-center"
        style={{
          background: "radial-gradient(circle at 40% 35%, #e6f4e6, #c8e6c9)",
          boxShadow: "inset 3px 3px 8px rgba(0,0,0,0.15), inset -2px -2px 6px rgba(255,255,255,0.7), 0 4px 10px rgba(76,175,80,0.2)",
        }}
      >
        {/* Cardinal marks */}
        {["N","E","S","W"].map((d, i) => (
          <span
            key={d}
            className="absolute text-[8px] font-black text-green-800"
            style={{
              top: i === 0 ? "4px" : i === 2 ? "auto" : "50%",
              bottom: i === 2 ? "4px" : "auto",
              left: i === 3 ? "4px" : i === 1 ? "auto" : "50%",
              right: i === 1 ? "4px" : "auto",
              transform: (i === 0 || i === 2) ? "translateX(-50%)" : "translateY(-50%)",
            }}
          >{d}</span>
        ))}
        {/* Arrow */}
        <div
          className="absolute w-1 h-8 rounded-full origin-bottom"
          style={{
            background: "linear-gradient(to top, #ef4444, #fca5a5)",
            boxShadow: "0 2px 6px rgba(239,68,68,0.4)",
            bottom: "50%",
            left: "calc(50% - 2px)",
            transform: `rotate(${deg}deg)`,
            transition: "transform 0.8s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
        <div className="w-3 h-3 rounded-full bg-gray-700 z-10 shadow-md" />
      </div>
      <div className="text-center">
        <p className="text-lg font-black text-gray-800">{speed} <span className="text-xs font-bold text-gray-500">km/h</span></p>
        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">{degToCompass(deg)}</p>
      </div>
    </div>
  );
}

/** AQI bar with gradient fill */
function AQIBar({ aqi, category, pm25, pm10, no2, ozone }) {
  const width = aqi != null ? Math.min((aqi / 150) * 100, 100) : 0;
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <div>
          <span className="text-4xl font-black text-gray-800">{aqi ?? "—"}</span>
          <span className="ml-2 text-sm font-bold" style={{ color: category.color }}>
            {category.label}
          </span>
        </div>
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">EU AQI</span>
      </div>

      {/* Progress bar */}
      <div className="relative h-4 rounded-full overflow-hidden"
        style={{ background: "linear-gradient(to right, #22c55e, #84cc16, #eab308, #f97316, #ef4444, #7c3aed)", opacity: 0.3 }}>
      </div>
      <div className="relative -mt-[1.25rem] h-4 rounded-full overflow-hidden bg-transparent">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${width}%`, background: category.color, boxShadow: `0 0 10px ${category.color}80` }}
        />
      </div>
      <div className="flex justify-between text-[9px] font-bold text-gray-400">
        <span>0 Good</span><span>50 Moderate</span><span>100+</span>
      </div>

      {/* Pollutant grid */}
      <div className="grid grid-cols-2 gap-2 mt-2">
        {[
          { label: "PM2.5", value: pm25, unit: "μg/m³" },
          { label: "PM10",  value: pm10, unit: "μg/m³" },
          { label: "NO₂",   value: no2,  unit: "μg/m³" },
          { label: "Ozone", value: ozone, unit: "μg/m³" },
        ].map(p => (
          <div key={p.label}
            className="rounded-xl px-3 py-2 flex justify-between items-center"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(240,250,240,0.5))",
              boxShadow: "inset 1px 1px 3px rgba(0,0,0,0.08), 1px 1px 4px rgba(255,255,255,0.8)",
              border: "1px solid rgba(255,255,255,0.6)",
            }}
          >
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">{p.label}</span>
            <span className="text-xs font-black text-gray-800">{p.value} <span className="text-[8px] text-gray-400 font-medium">{p.unit}</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Hourly forecast strip */
function HourlyForecast({ forecast }) {
  if (!forecast?.length) return null;
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
      {forecast.map((h, i) => (
        <div
          key={i}
          className="flex flex-col items-center gap-1.5 min-w-[62px] rounded-2xl px-2 py-3 flex-shrink-0"
          style={{
            background: i === 0
              ? "linear-gradient(145deg, #4caf50, #2e7d32)"
              : "linear-gradient(145deg, rgba(255,255,255,0.8), rgba(240,250,240,0.6))",
            boxShadow: i === 0
              ? "3px 3px 8px rgba(0,0,0,0.2), -2px -2px 6px rgba(255,255,255,0.3), inset 0 1px 0 rgba(255,255,255,0.2)"
              : "3px 3px 8px rgba(0,0,0,0.08), -2px -2px 6px rgba(255,255,255,0.9)",
            border: "1px solid rgba(255,255,255,0.6)",
          }}
        >
          <span className={`text-[9px] font-bold uppercase tracking-wide ${i === 0 ? "text-green-100" : "text-gray-400"}`}>{h.time}</span>
          <span className="text-xl leading-none">{h.wmoIcon}</span>
          <span className={`text-sm font-black ${i === 0 ? "text-white" : "text-gray-800"}`}>{h.temp}°</span>
          <div className="flex items-center gap-0.5">
            <Droplets size={8} className={i === 0 ? "text-blue-200" : "text-blue-400"} />
            <span className={`text-[9px] font-semibold ${i === 0 ? "text-blue-100" : "text-blue-500"}`}>{h.pop}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Small stat pill */
function StatPill({ icon, label, value, bg = "#f0faf0", accent = "#4CAF50" }) {
  return (
    <div
      className="flex items-center gap-3 rounded-2xl p-4"
      style={{
        background: `linear-gradient(145deg, ${bg}, #e8f5e8)`,
        boxShadow: "4px 4px 10px rgba(0,0,0,0.1), -3px -3px 8px rgba(255,255,255,0.85), inset 0 1px 0 rgba(255,255,255,0.7)",
        border: "1px solid rgba(255,255,255,0.65)",
      }}
    >
      <div
        className="p-2.5 rounded-xl flex-shrink-0"
        style={{ background: `${accent}20`, color: accent, boxShadow: `inset 2px 2px 4px rgba(0,0,0,0.08)` }}
      >
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{label}</p>
        <p className="text-base font-black text-gray-800 leading-tight">{value}</p>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function WeatherPage() {
  const [district, setDistrict] = useState("Indore");
  const [weather, setWeather]   = useState(null);
  const [status, setStatus]     = useState("idle");   // idle | loading | success | error
  const [lastUpdated, setLastUpdated] = useState(null);

  const load = useCallback(async (d) => {
    setStatus("loading");
    setWeather(null);
    try {
      const data = await fetchWeatherForDistrict(d);
      setWeather(data);
      setStatus("success");
      setLastUpdated(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }));
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => { load(district); }, [district, load]);

  const pLabel = weather ? pressureLabel(weather.pressure) : null;

  return (
    <div className="w-full max-w-5xl mx-auto pb-16">

      {/* ── Page Header ── */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-1">Weather Condition</h1>
        <p className="text-gray-500 font-medium text-lg">Live atmospheric data for Madhya Pradesh districts</p>
      </div>

      {/* ── District Selector Bar ── */}
      <div
        className="mb-8 p-4 rounded-2xl flex flex-wrap gap-3 items-center justify-between"
        style={{
          background: "linear-gradient(145deg, #f0faf0, #e0f2e0)",
          boxShadow: "6px 6px 14px rgba(0,0,0,0.1), -4px -4px 10px rgba(255,255,255,0.9), inset 0 1px 0 rgba(255,255,255,0.8)",
          border: "1px solid rgba(255,255,255,0.7)",
        }}
      >
        <div className="flex items-center gap-3 flex-1 min-w-[200px]">
          <div className="p-2.5 rounded-xl bg-[#4CAF50]/15 text-[#4CAF50]"
            style={{ boxShadow: "inset 2px 2px 4px rgba(0,0,0,0.1)" }}>
            <MapPin size={20} />
          </div>
          <select
            value={district}
            onChange={e => setDistrict(e.target.value)}
            className="text-lg font-bold text-gray-800 bg-transparent outline-none cursor-pointer pr-2"
          >
            {MP_DISTRICTS.map(d => <option key={d} value={d}>{d}, Madhya Pradesh</option>)}
          </select>
        </div>

        <div className="flex items-center gap-3">
          {lastUpdated && (
            <span className="text-xs font-semibold text-gray-400">
              Updated {lastUpdated}
            </span>
          )}
          <button
            onClick={() => load(district)}
            disabled={status === "loading"}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-60"
            style={{
              background: "linear-gradient(to bottom, #66bb6a, #43a047)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 8px rgba(76,175,80,0.3)",
              border: "1px solid #2e7d32",
            }}
          >
            <RefreshCw size={14} className={status === "loading" ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {/* ── Loading State ── */}
      {status === "loading" && (
        <div className="flex flex-col items-center justify-center py-32 gap-5">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-green-200 border-t-[#4CAF50] animate-spin" />
            <div className="absolute inset-3 rounded-full border-4 border-green-100 border-b-green-400 animate-spin animate-reverse" />
            <Leaf className="absolute inset-0 m-auto text-[#4CAF50]" size={24} />
          </div>
          <p className="text-gray-500 font-semibold animate-pulse">Fetching live data for {district}…</p>
        </div>
      )}

      {/* ── Error State ── */}
      {status === "error" && (
        <div
          className="flex flex-col items-center justify-center py-24 gap-4 rounded-3xl"
          style={{
            background: "linear-gradient(145deg, #fef2f2, #fee2e2)",
            boxShadow: "6px 6px 14px rgba(0,0,0,0.08), -4px -4px 10px rgba(255,255,255,0.9)",
            border: "1px solid rgba(254,202,202,0.7)",
          }}
        >
          <span className="text-5xl">⚠️</span>
          <p className="text-gray-700 font-bold text-lg">Could not reach weather service</p>
          <button
            onClick={() => load(district)}
            className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)", boxShadow: "0 4px 12px rgba(239,68,68,0.3)" }}
          >
            <RefreshCw size={14} /> Try Again
          </button>
        </div>
      )}

      {/* ── Main Dashboard ── */}
      {status === "success" && weather && (
        <div className="space-y-6">

          {/* ─── ROW 1: Hero Card + Wind + UV ───────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Hero: Temperature Card */}
            <SkeCard className="lg:col-span-2 p-7 relative overflow-hidden">
              {/* Background green gradient patches */}
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-20 blur-2xl"
                style={{ background: "radial-gradient(circle, #4CAF50, transparent)" }} />
              <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full opacity-15 blur-xl"
                style={{ background: "radial-gradient(circle, #81C784, transparent)" }} />

              <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-6xl sm:text-7xl leading-none drop-shadow-lg">{weather.icon}</span>
                    <div>
                      <p className="text-5xl sm:text-6xl font-black text-gray-900 leading-none">
                        {weather.temp}<span className="text-3xl text-gray-400 font-bold">°C</span>
                      </p>
                      <p className="text-sm font-semibold text-gray-500 mt-1">Feels like {weather.feelsLike}°C</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-gray-700">{weather.description}</p>
                  <p className="text-sm text-gray-500 font-medium mt-1 flex items-center gap-1.5">
                    <MapPin size={13} className="text-[#4CAF50]" /> {district}, Madhya Pradesh
                  </p>
                </div>

                {/* Mini stat pills on right */}
                <div className="flex flex-row sm:flex-col gap-3 flex-wrap sm:flex-nowrap">
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl"
                    style={{
                      background: "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(220,240,220,0.8))",
                      boxShadow: "4px 4px 10px rgba(0,0,0,0.1), -2px -2px 7px rgba(255,255,255,0.9)",
                      border: "1px solid rgba(255,255,255,0.8)",
                    }}
                  >
                    <Droplets size={16} className="text-blue-500" />
                    <span className="text-sm font-bold text-gray-700">{weather.humidity}% Humidity</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl"
                    style={{
                      background: "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(220,240,220,0.8))",
                      boxShadow: "4px 4px 10px rgba(0,0,0,0.1), -2px -2px 7px rgba(255,255,255,0.9)",
                      border: "1px solid rgba(255,255,255,0.8)",
                    }}
                  >
                    <CloudSun size={16} className="text-[#4CAF50]" />
                    <span className="text-sm font-bold text-gray-700">{weather.cloudCover}% Clouds</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl"
                    style={{
                      background: "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(220,240,220,0.8))",
                      boxShadow: "4px 4px 10px rgba(0,0,0,0.1), -2px -2px 7px rgba(255,255,255,0.9)",
                      border: "1px solid rgba(255,255,255,0.8)",
                    }}
                  >
                    <CloudSun size={16} className="text-orange-500" />
                    <span className="text-sm font-bold text-gray-700">{weather.rainfall} mm Rain</span>
                  </div>
                </div>
              </div>
            </SkeCard>

            {/* Wind Compass Card */}
            <SkeCard className="p-6 flex flex-col items-center justify-center gap-4">
              <div className="absolute top-0 left-0 w-full h-1 rounded-tl-[1.5rem] rounded-tr-[1.5rem]"
                style={{ background: "linear-gradient(to right, #4CAF50, #81C784)" }} />
              <p className="text-xs font-black uppercase tracking-widest text-[#4CAF50]">Wind</p>
              <WindCompass deg={weather.windDir} speed={weather.windSpeed} />
              <div className="text-center">
                <p className="text-xs font-semibold text-gray-400">Direction: <span className="text-gray-700 font-bold">{degToCompass(weather.windDir)}</span></p>
              </div>
            </SkeCard>
          </div>

          {/* ─── ROW 2: Gauge Dials ──────────────────────────────────────── */}
          <SkeCard className="p-6 relative">
            <div className="absolute top-0 left-0 w-full h-1 rounded-tl-[1.5rem] rounded-tr-[1.5rem]"
              style={{ background: "linear-gradient(to right, #4CAF50, #2196F3, #4CAF50)" }} />
            <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6 text-center">Live Sensors</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 place-items-center">
              <GaugeDial value={weather.humidity}   max={100}  color="#3b82f6"  label="Humidity"   unit="%"    icon={<Droplets size={12}    className="text-blue-500"   />} />
              <GaugeDial value={weather.cloudCover} max={100}  color="#6b7280"  label="Cloud Cover" unit="%"   icon={<CloudSun size={12}    className="text-gray-500"   />} />
              <GaugeDial value={weather.windSpeed}  max={120}  color="#4CAF50"  label="Wind"       unit="km/h" icon={<Wind size={12}       className="text-green-600"  />} />
              <GaugeDial value={weather.uvIndex ?? 0} max={12} color="#f59e0b"  label="UV Index"   unit="idx"  icon={<Sun size={12}        className="text-amber-500"  />} />
            </div>
          </SkeCard>

          {/* ─── ROW 3: AQI + Pressure + Visibility ─────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* AQI Card */}
            <SkeCard className="lg:col-span-2 p-6 relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 blur-2xl"
                style={{ background: "radial-gradient(circle, #22c55e, transparent)" }} />
              <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-5 flex items-center gap-2">
                <Leaf size={13} className="text-[#4CAF50]" /> Air Quality Index
              </p>
              <AQIBar
                aqi={weather.aqi}
                category={weather.aqiCategory}
                pm25={weather.pm25}
                pm10={weather.pm10}
                no2={weather.no2}
                ozone={weather.ozone}
              />
            </SkeCard>

            {/* Pressure + Visibility */}
            <div className="flex flex-col gap-6">
              <SkeCard className="p-5 flex-1 relative">
                <div className="absolute top-0 left-0 w-full h-1 rounded-tl-[1.5rem] rounded-tr-[1.5rem]"
                  style={{ background: `linear-gradient(to right, ${pLabel?.color ?? "#4CAF50"}, #4CAF50)` }} />
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-1.5">
                  <Gauge size={11} /> Pressure
                </p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-black text-gray-800">{weather.pressure}</p>
                    <p className="text-xs font-bold text-gray-400">hPa</p>
                  </div>
                  <span className="text-xs font-black px-3 py-1.5 rounded-full"
                    style={{ background: `${pLabel?.color}20`, color: pLabel?.color }}>
                    {pLabel?.label}
                  </span>
                </div>
                {/* bar */}
                <div className="mt-4 h-2 rounded-full overflow-hidden bg-gray-200">
                  <div className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${Math.min(((weather.pressure - 980) / 60) * 100, 100)}%`,
                      background: `linear-gradient(to right, ${pLabel?.color}, ${pLabel?.color}aa)`,
                    }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-[8px] font-bold text-gray-400">
                  <span>980</span><span>1010</span><span>1040+</span>
                </div>
              </SkeCard>

              <SkeCard className="p-5 flex-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-1.5">
                  <Eye size={11} /> Visibility
                </p>
                <p className="text-3xl font-black text-gray-800">{weather.visibility} <span className="text-sm text-gray-400 font-bold">km</span></p>
                <p className="text-xs text-gray-500 font-semibold mt-1">
                  {parseFloat(weather.visibility) > 10 ? "🟢 Excellent" :
                   parseFloat(weather.visibility) > 5  ? "🟡 Good" :
                   parseFloat(weather.visibility) > 2  ? "🟠 Moderate" : "🔴 Poor"}
                </p>
              </SkeCard>
            </div>
          </div>

          {/* ─── ROW 4: UV + Cloud + Extra Stats ────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatPill
              icon={<Sun size={18} />}
              label="UV Index"
              value={`${weather.uvIndex ?? "N/A"} — ${weather.uvCategory.label}`}
              accent={weather.uvCategory.color}
              bg={`${weather.uvCategory.color}10`}
            />
            <StatPill
              icon={<Thermometer size={18} />}
              label="Feels Like"
              value={`${weather.feelsLike}°C`}
              accent="#ef4444"
              bg="#fff1f1"
            />
            <StatPill
              icon={<Zap size={18} />}
              label="Rainfall"
              value={`${weather.rainfall} mm`}
              accent="#3b82f6"
              bg="#eff6ff"
            />
            <StatPill
              icon={<ArrowUp size={18} />}
              label="Wind Dir"
              value={`${degToCompass(weather.windDir)} / ${weather.windDir}°`}
              accent="#8b5cf6"
              bg="#f5f3ff"
            />
          </div>

          {/* ─── ROW 5: Hourly Forecast ───────────────────────────────── */}
          <SkeCard className="p-6 relative">
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-10 blur-2xl"
              style={{ background: "radial-gradient(circle, #4CAF50, transparent)" }} />
            <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-5">Today's Hourly Forecast</p>
            <HourlyForecast forecast={weather.forecast} />
          </SkeCard>

          {/* ─── Footer attribution ───────────────────────────────────── */}
          <p className="text-center text-xs text-gray-400 font-medium pt-2">
            Powered by{" "}
            <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer"
              className="text-[#4CAF50] font-semibold hover:underline">
              Open-Meteo
            </a>{" "}
            &amp;{" "}
            <a href="https://open-meteo.com/en/docs/air-quality-api" target="_blank" rel="noopener noreferrer"
              className="text-[#4CAF50] font-semibold hover:underline">
              Open-Meteo Air Quality
            </a>{" "}
            — Free, no API key required
          </p>
        </div>
      )}
    </div>
  );
}
