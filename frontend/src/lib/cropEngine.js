export const CROP_LIBRARY = [
  {
    id: "wheat",
    name: "Wheat",
    hindiName: "गेहूं",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=1600&q=80",
    matchScore: 96,
    requirements: {
      n: [80, 120], 
      p: [40, 60],  
      k: [30, 50],  
      ph: [6.0, 7.5], 
    },
    details: {
      seed: "GW-322 Wheat, 100kg/ha",
      npkText: "120:60:40 kg/ha",
      extraTip: "Add Zinc Sulphate (25kg/ha) for your specific soil.",
      water: "~400mm / season",
      irrigationStages: "4-5 irrigations",
      irrigationTip: "Requires critical watering at CRI stage (21 days).",
      yield: "45-50",
      yieldText: "Quintals per hectare avg.",
      price: "₹2,850"
    }
  },
  {
    id: "soybean",
    name: "Soybean",
    hindiName: "सोयाबीन",
    image: "https://images.unsplash.com/photo-1621213032483-e02cc7c80521?auto=format&fit=crop&w=1600&q=80",
    matchScore: 92,
    requirements: {
      n: [20, 50], 
      p: [60, 80],
      k: [40, 60],
      ph: [6.0, 7.0],
    },
    details: {
      seed: "JS-9560 Soybean, 75kg/ha",
      npkText: "20:60:40 kg/ha",
      extraTip: "Treat seeds with Rhizobium culture before sowing.",
      water: "~500mm / season",
      irrigationStages: "Rainfed, 1-2 life-saving",
      irrigationTip: "Sensitive to waterlogging. Ensure good drainage.",
      yield: "20-25",
      yieldText: "Quintals per hectare avg.",
      price: "₹4,600"
    }
  },
  {
    id: "mustard",
    name: "Mustard",
    hindiName: "सरसों",
    image: "https://images.unsplash.com/photo-1589139598284-9cf0c9823eec?auto=format&fit=crop&w=1600&q=80",
    matchScore: 88,
    requirements: {
      n: [60, 100],
      p: [30, 50],
      k: [20, 40],
      ph: [5.5, 7.5],
    },
    details: {
      seed: "Pusa Bold Mustard, 5kg/ha",
      npkText: "80:40:40 kg/ha",
      extraTip: "Apply Sulphur (40kg/ha) to increase oil content.",
      water: "~250mm / season",
      irrigationStages: "2-3 irrigations",
      irrigationTip: "Irrigate before flowering and at pod formation.",
      yield: "18-22",
      yieldText: "Quintals per hectare avg.",
      price: "₹5,200"
    }
  },
  {
    id: "gram",
    name: "Gram (Chana)",
    hindiName: "चना",
    image: "https://images.unsplash.com/photo-1596706030999-52e04f4a3bc7?auto=format&fit=crop&w=1600&q=80",
    matchScore: 90,
    requirements: {
      n: [15, 35],
      p: [40, 60],
      k: [20, 40],
      ph: [6.0, 7.5],
    },
    details: {
      seed: "JG-11 Gram, 70kg/ha",
      npkText: "20:60:20 kg/ha",
      extraTip: "Nipping at 35 days increases branching and yield.",
      water: "~200mm / season",
      irrigationStages: "1-2 irrigations",
      irrigationTip: "Avoid irrigation during flowering stage.",
      yield: "15-20",
      yieldText: "Quintals per hectare avg.",
      price: "₹5,800"
    }
  }
];

export function inferBestCrop(soilData) {
  if (!soilData) return CROP_LIBRARY[0]; 

  let bestMatch = CROP_LIBRARY[0];
  let highestScore = -Infinity;

  for (let crop of CROP_LIBRARY) {
    let score = 100;
    
    // Calculate distance from the ideal range for each parameter
    const nDist = Math.max(0, crop.requirements.n[0] - soilData.N, soilData.N - crop.requirements.n[1]);
    const pDist = Math.max(0, crop.requirements.p[0] - soilData.P, soilData.P - crop.requirements.p[1]);
    const kDist = Math.max(0, crop.requirements.k[0] - soilData.K, soilData.K - crop.requirements.k[1]);
    const phDist = Math.max(0, crop.requirements.ph[0] - soilData.pH, soilData.pH - crop.requirements.ph[1]);

    // Heuristic scoring: deduct points for deviations from the ideal range
    score -= (nDist * 0.4) + (pDist * 0.5) + (kDist * 0.5) + (phDist * 15);

    if (score > highestScore) {
      highestScore = score;
      bestMatch = { ...crop, matchScore: Math.max(40, Math.min(99, Math.round(score))) };
    }
  }

  return bestMatch;
}
