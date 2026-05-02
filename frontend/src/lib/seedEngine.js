export const SEED_DATABASE = {
  wheat: [
    {
      id: "lok-1",
      name: "Lok 1",
      budget: "low",
      price: "₹40 - ₹50 / kg",
      yield: "35-40 q/ha",
      quality: "Standard",
      rating: 4.2,
      features: ["Drought resistant", "Good for late sowing"],
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "gw-322",
      name: "GW 322",
      budget: "medium",
      price: "₹55 - ₹65 / kg",
      yield: "45-50 q/ha",
      quality: "Premium",
      rating: 4.6,
      features: ["High yield", "Disease resistant", "Balanced"],
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "hi-1544",
      name: "HI 1544",
      budget: "high",
      price: "₹75 - ₹90 / kg",
      yield: "55-60 q/ha",
      quality: "Export Quality",
      rating: 4.8,
      features: ["Heat tolerant", "Premium grain", "Maximum yield"],
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80"
    }
  ],
  soybean: [
    {
      id: "js-335",
      name: "JS 335",
      budget: "low",
      price: "₹60 - ₹70 / kg",
      yield: "18-20 q/ha",
      quality: "Standard",
      rating: 4.1,
      features: ["Drought tolerant", "Reliable"],
      image: "https://images.unsplash.com/photo-1621213032483-e02cc7c80521?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "js-9560",
      name: "JS 9560",
      budget: "medium",
      price: "₹80 - ₹95 / kg",
      yield: "22-25 q/ha",
      quality: "Premium",
      rating: 4.5,
      features: ["Early maturity", "High yield"],
      image: "https://images.unsplash.com/photo-1582281292025-c6031846c4f0?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "js-21-72",
      name: "JS 21-72",
      budget: "high",
      price: "₹110 - ₹130 / kg",
      yield: "26-30 q/ha",
      quality: "Export Quality",
      rating: 4.9,
      features: ["Pest resistant", "Premium oil content", "Heat tolerant"],
      image: "https://images.unsplash.com/photo-1529313264639-652a233ccbd4?auto=format&fit=crop&w=600&q=80"
    }
  ],
  gram: [
    {
      id: "jg-11",
      name: "JG 11",
      budget: "low",
      price: "₹70 - ₹80 / kg",
      yield: "15-18 q/ha",
      quality: "Standard",
      rating: 4.3,
      features: ["Wilt resistant", "Drought tolerant"],
      image: "https://images.unsplash.com/photo-1596706030999-52e04f4a3bc7?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "jg-14",
      name: "JG 14",
      budget: "medium",
      price: "₹90 - ₹105 / kg",
      yield: "20-22 q/ha",
      quality: "Premium",
      rating: 4.7,
      features: ["Heat tolerant", "Large grain"],
      image: "https://images.unsplash.com/photo-1585250005527-3199be3a1198?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "kabuli-gram",
      name: "Kabuli Gram",
      budget: "high",
      price: "₹140 - ₹160 / kg",
      yield: "18-24 q/ha",
      quality: "Export Quality",
      rating: 4.8,
      features: ["Premium market price", "Large white grains"],
      image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=600&q=80"
    }
  ]
};

export function getSeedRecommendation(inputs) {
  const { crop, budget, temp, rainfall, humidity } = inputs;
  
  const availableSeeds = SEED_DATABASE[crop.toLowerCase()] || SEED_DATABASE["wheat"];
  
  // Base recommendation on budget
  let bestSeed = availableSeeds.find(s => s.budget === budget);
  if (!bestSeed) bestSeed = availableSeeds[0];

  let reason = ``;
  let alerts = [];

  // Weather rules override
  if (rainfall < 400 || rainfall === "low") {
    const droughtSeed = availableSeeds.find(s => s.features.some(f => f.toLowerCase().includes("drought")));
    if (droughtSeed) {
      bestSeed = droughtSeed;
      reason += `Since rainfall is low, this drought-resistant variety (${bestSeed.name}) is chosen over budget choices. `;
    }
  } else if (temp > 35) {
    const heatSeed = availableSeeds.find(s => s.features.some(f => f.toLowerCase().includes("heat")));
    if (heatSeed) {
      bestSeed = heatSeed;
      reason += `With temperatures exceeding 35°C, heat-tolerant characteristics of ${bestSeed.name} will prevent crop damage. `;
    }
  } else {
    // Budget logic (if no extreme weather overrides it)
    if (budget === "low") {
      reason += `${bestSeed.name} is recommended because your budget is low. It offers a cost-effective solution with reliable yields. `;
    } else if (budget === "medium") {
      reason += `${bestSeed.name} is the best fit for your moderate budget, providing a highly balanced and stable yield. `;
    } else {
      reason += `${bestSeed.name} is selected for your premium budget, maximizing your profit and export-quality yield. `;
    }
  }

  // Humidity check for alerts
  if (humidity > 80) {
    alerts.push("High Humidity Alert: Disease risk is high. Recommend applying preventative fungicide 10 days after sowing.");
  }

  // Final adjustments
  if (alerts.length > 0) {
    reason += ` Please check the alerts below for additional weather-based precautions.`;
  } else {
    reason += ` Conditions are favorable for sowing.`;
  }

  return {
    seed: bestSeed,
    reason: reason,
    alerts: alerts,
    profitBenefit: `Expected Return: ${bestSeed.yield} at optimal market rates.`
  };
}
