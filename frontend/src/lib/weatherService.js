/**
 * weatherService.js
 *
 * Fetches live weather + air quality data using Open-Meteo APIs.
 * ✅ Completely FREE — NO API key required!
 *
 * Weather API:     https://open-meteo.com/en/docs
 * Air Quality API: https://open-meteo.com/en/docs/air-quality-api
 */

const WEATHER_API = "https://api.open-meteo.com/v1/forecast";
const AQI_API     = "https://air-quality-api.open-meteo.com/v1/air-quality";

/** WMO Weather Interpretation Codes */
const WMO_CODES = {
  0:  { desc: "Clear Sky",              icon: "☀️",  bg: "from-amber-400 to-orange-300" },
  1:  { desc: "Mainly Clear",           icon: "🌤️", bg: "from-amber-300 to-yellow-200" },
  2:  { desc: "Partly Cloudy",          icon: "⛅",  bg: "from-slate-400 to-blue-200"  },
  3:  { desc: "Overcast",               icon: "☁️",  bg: "from-slate-500 to-slate-400" },
  45: { desc: "Foggy",                  icon: "🌫️", bg: "from-gray-400 to-gray-300"   },
  48: { desc: "Icy Fog",                icon: "🌫️", bg: "from-blue-200 to-gray-300"   },
  51: { desc: "Light Drizzle",          icon: "🌦️", bg: "from-blue-400 to-teal-300"   },
  53: { desc: "Moderate Drizzle",       icon: "🌦️", bg: "from-blue-500 to-teal-400"   },
  55: { desc: "Dense Drizzle",          icon: "🌧️", bg: "from-blue-600 to-blue-400"   },
  61: { desc: "Slight Rain",            icon: "🌧️", bg: "from-blue-500 to-blue-400"   },
  63: { desc: "Moderate Rain",          icon: "🌧️", bg: "from-blue-600 to-blue-500"   },
  65: { desc: "Heavy Rain",             icon: "🌧️", bg: "from-blue-800 to-blue-600"   },
  80: { desc: "Slight Showers",         icon: "🌦️", bg: "from-blue-400 to-cyan-300"   },
  81: { desc: "Moderate Showers",       icon: "🌧️", bg: "from-blue-500 to-cyan-400"   },
  82: { desc: "Violent Showers",        icon: "⛈️",  bg: "from-gray-700 to-blue-600"  },
  95: { desc: "Thunderstorm",           icon: "⛈️",  bg: "from-gray-800 to-gray-600"  },
  96: { desc: "Thunderstorm + Hail",    icon: "⛈️",  bg: "from-gray-900 to-gray-700"  },
  99: { desc: "Heavy Thunderstorm",     icon: "⛈️",  bg: "from-gray-900 to-gray-800"  },
};

/** MP district → lat/lon coordinates */
export const DISTRICT_COORDS = {
  Indore:       { lat: 22.7196, lon: 75.8577 },
  Sehore:       { lat: 23.2006, lon: 77.0855 },
  Vidisha:      { lat: 23.5251, lon: 77.8082 },
  Raisen:       { lat: 23.3322, lon: 77.7882 },
  Shivpuri:     { lat: 25.4231, lon: 77.6618 },
  Gwalior:      { lat: 26.2183, lon: 78.1828 },
  Ujjain:       { lat: 23.1793, lon: 75.7849 },
  Narmadapuram: { lat: 22.7523, lon: 77.7249 },
  Sagar:        { lat: 23.8388, lon: 78.7378 },
  Satna:        { lat: 24.5800, lon: 80.8322 },
};

export const MP_DISTRICTS = Object.keys(DISTRICT_COORDS);

/** European AQI category labels */
function getAQICategory(aqi) {
  if (aqi == null) return { label: "N/A", color: "#9ca3af", level: 0 };
  if (aqi <= 20)  return { label: "Good",      color: "#22c55e", level: 1 };
  if (aqi <= 40)  return { label: "Fair",       color: "#84cc16", level: 2 };
  if (aqi <= 60)  return { label: "Moderate",   color: "#eab308", level: 3 };
  if (aqi <= 80)  return { label: "Poor",       color: "#f97316", level: 4 };
  if (aqi <= 100) return { label: "Very Poor",  color: "#ef4444", level: 5 };
  return          { label: "Hazardous",         color: "#7c3aed", level: 6 };
}

/** UV Index category labels */
function getUVCategory(uv) {
  if (uv == null) return { label: "N/A", color: "#9ca3af" };
  if (uv < 3)  return { label: "Low",       color: "#22c55e" };
  if (uv < 6)  return { label: "Moderate",  color: "#eab308" };
  if (uv < 8)  return { label: "High",      color: "#f97316" };
  if (uv < 11) return { label: "Very High", color: "#ef4444" };
  return        { label: "Extreme",         color: "#7c3aed" };
}

/**
 * Fetches FULL current weather for a given MP district.
 * Includes: temp, feels_like, humidity, rainfall, wind, pressure,
 *           UV index, cloud cover, visibility, hourly forecast.
 */
export async function fetchWeatherForDistrict(district) {
  const coords = DISTRICT_COORDS[district];
  if (!coords) throw new Error("DISTRICT_NOT_FOUND");

  const wxParams = new URLSearchParams({
    latitude:  coords.lat,
    longitude: coords.lon,
    current: [
      "temperature_2m", "relative_humidity_2m", "apparent_temperature",
      "precipitation", "weather_code", "wind_speed_10m", "wind_direction_10m",
      "surface_pressure", "cloud_cover", "visibility", "uv_index",
    ].join(","),
    hourly: [
      "temperature_2m", "precipitation_probability", "weather_code",
    ].join(","),
    forecast_days: 1,
    timezone: "Asia/Kolkata",
  });

  const aqiParams = new URLSearchParams({
    latitude:  coords.lat,
    longitude: coords.lon,
    current: ["european_aqi", "pm2_5", "pm10", "nitrogen_dioxide", "ozone"].join(","),
    timezone: "Asia/Kolkata",
  });

  const [wxRes, aqiRes] = await Promise.all([
    fetch(`${WEATHER_API}?${wxParams}`),
    fetch(`${AQI_API}?${aqiParams}`),
  ]);

  if (!wxRes.ok) throw new Error(`WEATHER_API_ERROR_${wxRes.status}`);

  const wxData  = await wxRes.json();
  const aqiData = aqiRes.ok ? await aqiRes.json() : null;

  const c   = wxData.current;
  const wmo = WMO_CODES[c.weather_code] ?? { desc: "Unknown", icon: "🌡️", bg: "from-green-400 to-teal-300" };
  const aqi = aqiData?.current?.european_aqi ?? null;

  // Build 8-point hourly forecast for today
  const now      = new Date();
  const hourly   = wxData.hourly;
  const forecast = [];
  if (hourly?.time) {
    for (let i = 0; i < hourly.time.length && forecast.length < 8; i++) {
      const t = new Date(hourly.time[i]);
      if (t >= now) {
        forecast.push({
          time:    t.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }),
          temp:    Math.round(hourly.temperature_2m[i]),
          pop:     hourly.precipitation_probability[i] ?? 0,
          wmoIcon: (WMO_CODES[hourly.weather_code[i]] ?? { icon: "🌡️" }).icon,
        });
      }
    }
  }

  return {
    temp:        Math.round(c.temperature_2m),
    feelsLike:   Math.round(c.apparent_temperature),
    humidity:    c.relative_humidity_2m,
    rainfall:    parseFloat((c.precipitation ?? 0).toFixed(1)),
    windSpeed:   Math.round(c.wind_speed_10m),
    windDir:     c.wind_direction_10m ?? 0,
    pressure:    Math.round(c.surface_pressure ?? 1013),
    cloudCover:  c.cloud_cover ?? 0,
    visibility:  c.visibility != null ? (c.visibility / 1000).toFixed(1) : "N/A",
    uvIndex:     c.uv_index != null ? parseFloat(c.uv_index.toFixed(1)) : null,
    uvCategory:  getUVCategory(c.uv_index),
    description: wmo.desc,
    icon:        wmo.icon,
    wmoGradient: wmo.bg,
    aqi,
    aqiCategory: getAQICategory(aqi),
    pm25:        aqiData?.current?.pm2_5?.toFixed(1) ?? "N/A",
    pm10:        aqiData?.current?.pm10?.toFixed(1)  ?? "N/A",
    no2:         aqiData?.current?.nitrogen_dioxide?.toFixed(1) ?? "N/A",
    ozone:       aqiData?.current?.ozone?.toFixed(1) ?? "N/A",
    forecast,
  };
}
