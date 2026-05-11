export const CROP_LIBRARY = [
  // ─── RAINY SEASON CROPS (KHARIF) ─────────────────────────────
  {
    id: "rice", name: "Rice", hindiName: "चावल",
    image: "https://images.unsplash.com/photo-1586771107445-d3afbf0a4732?auto=format&fit=crop&w=1600&q=80",
    season: "Best for Rainy Season 🌧️", tempRange: "25-35°C", waterNeed: "High (200-300mm)", soilType: "Clayey/Alluvial",
    profitability: "High", difficulty: "Moderate",
    details: { seed: "Swarna, 25kg/ha", npkText: "100:50:50 kg/ha", extraTip: "Maintain standing water during growth.", water: "Continuous flooding", irrigationStages: "Crucial at tillering", irrigationTip: "Needs standing water.", yield: "40-50", yieldText: "Qtl/ha", price: "₹2,200" }
  },
  {
    id: "maize", name: "Maize", hindiName: "मक्का",
    image: "https://images.unsplash.com/photo-1599818451105-0210fec6cb9f?auto=format&fit=crop&w=1600&q=80",
    season: "Best for Rainy Season 🌧️", tempRange: "25-30°C", waterNeed: "Medium (100-150mm)", soilType: "Loamy",
    profitability: "High", difficulty: "Easy",
    details: { seed: "Pusa Hybrid, 20kg/ha", npkText: "120:60:40 kg/ha", extraTip: "Apply Zinc if soil is deficient.", water: "~120mm / season", irrigationStages: "3-4 irrigations", irrigationTip: "Avoid water stress at silking.", yield: "50-60", yieldText: "Qtl/ha", price: "₹2,100" }
  },
  {
    id: "cotton", name: "Cotton", hindiName: "कपास",
    image: "https://images.unsplash.com/photo-1629828459418-472b535ce952?auto=format&fit=crop&w=1600&q=80",
    season: "Best for Rainy Season 🌧️", tempRange: "25-35°C", waterNeed: "Medium (80-120mm)", soilType: "Black/Alluvial",
    profitability: "Very High", difficulty: "High",
    details: { seed: "Bt Cotton, 2.5kg/ha", npkText: "120:60:60 kg/ha", extraTip: "Needs clear sunny days for harvesting.", water: "~100mm / season", irrigationStages: "2-3 irrigations", irrigationTip: "Extremely sensitive to waterlogging.", yield: "20-25", yieldText: "Qtl/ha", price: "₹7,000" }
  },
  {
    id: "soybean", name: "Soybean", hindiName: "सोयाबीन",
    image: "https://images.unsplash.com/photo-1621213032483-e02cc7c80521?auto=format&fit=crop&w=1600&q=80",
    season: "Best for Rainy Season 🌧️", tempRange: "20-30°C", waterNeed: "Medium (100-200mm)", soilType: "Sandy Loam",
    profitability: "High", difficulty: "Moderate",
    details: { seed: "JS-9560, 75kg/ha", npkText: "20:60:40 kg/ha", extraTip: "Treat seeds with Rhizobium culture.", water: "~150mm / season", irrigationStages: "Rainfed", irrigationTip: "Sensitive to waterlogging.", yield: "20-25", yieldText: "Qtl/ha", price: "₹4,600" }
  },
  {
    id: "groundnut", name: "Groundnut", hindiName: "मूंगफली",
    image: "https://images.unsplash.com/photo-1565576725359-22a014949514?auto=format&fit=crop&w=1600&q=80",
    season: "Best for Rainy Season 🌧️", tempRange: "25-35°C", waterNeed: "Low (50-100mm)", soilType: "Sandy",
    profitability: "High", difficulty: "Moderate",
    details: { seed: "TAG-24, 100kg/ha", npkText: "20:40:40 kg/ha", extraTip: "Apply Gypsum at pegging stage.", water: "~70mm / season", irrigationStages: "2-3 irrigations", irrigationTip: "Crucial at pod development.", yield: "15-20", yieldText: "Qtl/ha", price: "₹6,000" }
  },
  {
    id: "bajra", name: "Bajra", hindiName: "बाजरा",
    image: "https://images.unsplash.com/photo-1579708687789-9bd2a16d3f25?auto=format&fit=crop&w=1600&q=80",
    season: "Best for Hot/Dry Climate 🏜️", tempRange: "25-40°C", waterNeed: "Very Low (30-60mm)", soilType: "Sandy",
    profitability: "Medium", difficulty: "Easy",
    details: { seed: "Pusa-415, 4kg/ha", npkText: "40:20:20 kg/ha", extraTip: "Highly drought tolerant.", water: "~40mm / season", irrigationStages: "Rainfed", irrigationTip: "Requires very little water.", yield: "20-25", yieldText: "Qtl/ha", price: "₹2,500" }
  },
  {
    id: "jowar", name: "Jowar", hindiName: "ज्वार",
    image: "https://images.unsplash.com/photo-1568014529452-f4daefd59f77?auto=format&fit=crop&w=1600&q=80",
    season: "Best for Hot/Dry Climate 🏜️", tempRange: "25-35°C", waterNeed: "Low (40-80mm)", soilType: "Sandy Loam",
    profitability: "Medium", difficulty: "Easy",
    details: { seed: "CSH-16, 10kg/ha", npkText: "60:30:30 kg/ha", extraTip: "Good for fodder and grain.", water: "~60mm / season", irrigationStages: "1-2 irrigations", irrigationTip: "Drought resistant.", yield: "25-30", yieldText: "Qtl/ha", price: "₹2,700" }
  },

  // ─── WINTER CROPS (RABI) ─────────────────────────────
  {
    id: "wheat", name: "Wheat", hindiName: "गेहूं",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1600&q=80",
    season: "Best for Winter ❄️", tempRange: "15-25°C", waterNeed: "Medium (40-80mm)", soilType: "Loamy",
    profitability: "High", difficulty: "Moderate",
    details: { seed: "GW-322, 100kg/ha", npkText: "120:60:40 kg/ha", extraTip: "Add Zinc Sulphate (25kg/ha).", water: "~60mm / season", irrigationStages: "4-5 irrigations", irrigationTip: "Critical at CRI stage (21 days).", yield: "45-50", yieldText: "Qtl/ha", price: "₹2,850" }
  },
  {
    id: "gram", name: "Gram", hindiName: "चना",
    image: "https://images.unsplash.com/photo-1596706030999-52e04f4a3bc7?auto=format&fit=crop&w=1600&q=80",
    season: "Best for Winter ❄️", tempRange: "20-25°C", waterNeed: "Low (30-60mm)", soilType: "Loamy",
    profitability: "High", difficulty: "Moderate",
    details: { seed: "JG-11, 70kg/ha", npkText: "20:60:20 kg/ha", extraTip: "Nipping at 35 days increases yield.", water: "~40mm / season", irrigationStages: "1-2 irrigations", irrigationTip: "Avoid irrigation during flowering.", yield: "15-20", yieldText: "Qtl/ha", price: "₹5,800" }
  },
  {
    id: "mustard", name: "Mustard", hindiName: "सरसों",
    image: "https://images.unsplash.com/photo-1589139598284-9cf0c9823eec?auto=format&fit=crop&w=1600&q=80",
    season: "Best for Winter ❄️", tempRange: "10-20°C", waterNeed: "Low (20-50mm)", soilType: "Sandy Loam",
    profitability: "High", difficulty: "Easy",
    details: { seed: "Pusa Bold, 5kg/ha", npkText: "80:40:40 kg/ha", extraTip: "Apply Sulphur to increase oil content.", water: "~30mm / season", irrigationStages: "2-3 irrigations", irrigationTip: "Irrigate before flowering.", yield: "18-22", yieldText: "Qtl/ha", price: "₹5,200" }
  },
  {
    id: "peas", name: "Peas", hindiName: "मटर",
    image: "https://images.unsplash.com/photo-1606550750379-fc8a0885e3cb?auto=format&fit=crop&w=1600&q=80",
    season: "Best for Winter ❄️", tempRange: "15-20°C", waterNeed: "Medium (40-60mm)", soilType: "Loamy",
    profitability: "Medium", difficulty: "Moderate",
    details: { seed: "Arkel, 100kg/ha", npkText: "20:40:20 kg/ha", extraTip: "Ensure good drainage to avoid root rot.", water: "~50mm / season", irrigationStages: "1-2 irrigations", irrigationTip: "Sensitive to waterlogging.", yield: "80-100", yieldText: "Qtl/ha (Green pods)", price: "₹3,500" }
  },
  {
    id: "barley", name: "Barley", hindiName: "जौ",
    image: "https://images.unsplash.com/photo-1582276081273-0498b0f1ed85?auto=format&fit=crop&w=1600&q=80",
    season: "Best for Winter ❄️", tempRange: "15-25°C", waterNeed: "Low (30-60mm)", soilType: "Sandy Loam",
    profitability: "Medium", difficulty: "Easy",
    details: { seed: "RD-2035, 100kg/ha", npkText: "60:30:20 kg/ha", extraTip: "Tolerates saline soils better than wheat.", water: "~40mm / season", irrigationStages: "2-3 irrigations", irrigationTip: "Irrigate at active tillering.", yield: "30-35", yieldText: "Qtl/ha", price: "₹2,200" }
  },

  // ─── SUMMER CROPS (ZAID) ─────────────────────────────
  {
    id: "watermelon", name: "Watermelon", hindiName: "तरबूज",
    image: "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?auto=format&fit=crop&w=1600&q=80",
    season: "Best for Summer ☀️", tempRange: "25-35°C", waterNeed: "Low (20-50mm)", soilType: "Sandy",
    profitability: "High", difficulty: "Moderate",
    details: { seed: "Sugar Baby, 3kg/ha", npkText: "80:40:40 kg/ha", extraTip: "Requires plenty of sunshine.", water: "~40mm / season", irrigationStages: "Frequent", irrigationTip: "Reduce watering before harvest.", yield: "200-300", yieldText: "Qtl/ha", price: "₹1,500" }
  },
  {
    id: "muskmelon", name: "Muskmelon", hindiName: "खरबूजा",
    image: "https://images.unsplash.com/photo-1571221772648-9b819fbc3fc8?auto=format&fit=crop&w=1600&q=80",
    season: "Best for Summer ☀️", tempRange: "25-35°C", waterNeed: "Low (20-50mm)", soilType: "Sandy",
    profitability: "High", difficulty: "Moderate",
    details: { seed: "Pusa Sharbati, 2kg/ha", npkText: "80:40:40 kg/ha", extraTip: "Needs warm climate.", water: "~40mm / season", irrigationStages: "Frequent", irrigationTip: "Avoid wetting the foliage.", yield: "150-200", yieldText: "Qtl/ha", price: "₹2,500" }
  },
  {
    id: "cucumber", name: "Cucumber", hindiName: "खीरा",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1600&q=80",
    season: "Best for Summer ☀️", tempRange: "20-30°C", waterNeed: "Medium (30-60mm)", soilType: "Loamy",
    profitability: "High", difficulty: "Moderate",
    details: { seed: "Pusa Sanyog, 2.5kg/ha", npkText: "60:40:40 kg/ha", extraTip: "Staking increases yield.", water: "~50mm / season", irrigationStages: "Frequent", irrigationTip: "Keep soil consistently moist.", yield: "150-200", yieldText: "Qtl/ha", price: "₹2,000" }
  },
  {
    id: "tomato", name: "Tomato", hindiName: "टमाटर",
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=1600&q=80",
    season: "Best for Summer ☀️", tempRange: "20-30°C", waterNeed: "Medium (40-80mm)", soilType: "Loamy",
    profitability: "High", difficulty: "High",
    details: { seed: "Pusa Ruby, 500g/ha", npkText: "100:60:60 kg/ha", extraTip: "Requires staking and pruning.", water: "~60mm / season", irrigationStages: "Frequent", irrigationTip: "Drip irrigation is best.", yield: "250-300", yieldText: "Qtl/ha", price: "₹3,000" }
  },
  {
    id: "onion", name: "Onion", hindiName: "प्याज",
    image: "https://images.unsplash.com/photo-1618512496248-a07ce83aa8cb?auto=format&fit=crop&w=1600&q=80",
    season: "Best for Summer ☀️", tempRange: "15-25°C", waterNeed: "Medium (30-60mm)", soilType: "Loamy",
    profitability: "High", difficulty: "Moderate",
    details: { seed: "Pusa Red, 10kg/ha", npkText: "100:50:50 kg/ha", extraTip: "Stop irrigation 15 days before harvest.", water: "~50mm / season", irrigationStages: "Regular", irrigationTip: "Frequent but light irrigation.", yield: "200-250", yieldText: "Qtl/ha", price: "₹2,500" }
  },
  {
    id: "sunflower", name: "Sunflower", hindiName: "सूरजमुखी",
    image: "https://images.unsplash.com/photo-1502096335987-9bc40428d11c?auto=format&fit=crop&w=1600&q=80",
    season: "Best for Summer ☀️", tempRange: "20-30°C", waterNeed: "Low (30-60mm)", soilType: "Sandy Loam",
    profitability: "Medium", difficulty: "Easy",
    details: { seed: "Morden, 5kg/ha", npkText: "60:40:40 kg/ha", extraTip: "Provide irrigation at flowering stage.", water: "~45mm / season", irrigationStages: "2-3 irrigations", irrigationTip: "Critical at seed setting.", yield: "15-20", yieldText: "Qtl/ha", price: "₹5,000" }
  },
  {
    id: "moong", name: "Moong", hindiName: "मूंग",
    image: "https://images.unsplash.com/photo-1627914619728-66258414fae8?auto=format&fit=crop&w=1600&q=80",
    season: "Best for Summer ☀️", tempRange: "25-35°C", waterNeed: "Low (30-60mm)", soilType: "Loamy",
    profitability: "High", difficulty: "Easy",
    details: { seed: "Pusa Vishal, 15kg/ha", npkText: "15:40:20 kg/ha", extraTip: "Fast growing short duration crop.", water: "~40mm / season", irrigationStages: "1-2 irrigations", irrigationTip: "Irrigate before flowering.", yield: "10-15", yieldText: "Qtl/ha", price: "₹7,500" }
  }
];
