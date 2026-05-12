import { useState } from "react";
import {
  Bug,
  ChevronDown,
  ExternalLink,
  FlaskConical,
  Leaf,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

const BUY_LINK = "https://utpannseeds.in/";

const uiText = {
  en: {
    trust: "Trusted input planning",
    titleA: "Kisan Smart",
    subtitle: "Choose a crop and get farmer-friendly recommendations for seeds, fertilizer, and pesticide in one simple dashboard.",
    selectCrop: "Select Crop",
    plan: "Farm Advisor Plan",
    planNote: "Recommendations are grouped into only three input sections: seeds, fertilizer, and pesticide. Farm Health tools stay separate.",
    seeds: "Seeds",
    seedsDesc: "Best crop varieties and practical buying options.",
    fertilizer: "Fertilizer",
    fertilizerDesc: "Chemical and biofertilizer choices for crop nutrition.",
    pesticide: "Pesticide",
    pesticideDesc: "Simple pesticide recommendations for the selected crop.",
    benefit: "Benefit",
    price: "Price",
    purpose: "Purpose",
    useStage: "Use stage",
    dose: "Dose",
    usedFor: "Used for",
    applyWhen: "Apply when",
    why: "Why recommended?",
    buy: "Buy Now",
  },
  hi: {
    trust: "भरोसेमंद इनपुट योजना",
    titleA: "किसान स्मार्ट",
    subtitle: "फसल चुनें और बीज, खाद और कीटनाशक की आसान किसान-हितैषी सलाह एक ही डैशबोर्ड में पाएं.",
    selectCrop: "फसल चुनें",
    plan: "फार्म सलाहकार योजना",
    planNote: "सलाह केवल तीन इनपुट भागों में है: बीज, खाद और कीटनाशक. फार्म हेल्थ टूल अलग रहेंगे.",
    seeds: "बीज",
    seedsDesc: "बेहतर किस्में और खरीदने के व्यावहारिक विकल्प.",
    fertilizer: "खाद",
    fertilizerDesc: "फसल पोषण के लिए रासायनिक और जैव उर्वरक विकल्प.",
    pesticide: "कीटनाशक",
    pesticideDesc: "चुनी गई फसल के लिए सरल कीटनाशक सलाह.",
    benefit: "लाभ",
    price: "भाव",
    purpose: "उद्देश्य",
    useStage: "उपयोग अवस्था",
    dose: "मात्रा",
    usedFor: "किसके लिए",
    applyWhen: "कब लगाएं",
    why: "क्यों सुझाया?",
    buy: "अभी खरीदें",
  },
};

const FARM_ADVISOR_DATA = {
  wheat: {
    label: "Wheat",
    labelHi: "गेहूं",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80",
    seeds: [
      item("GW 322", "Best Match", "सबसे अच्छा मेल", "45-50 q/ha", "45-50 क्विंटल/हेक्टेयर", "₹55 - ₹65 / kg", "Reliable MP wheat variety with stable grain quality.", "मध्य प्रदेश के लिए भरोसेमंद गेहूं किस्म, दाने की गुणवत्ता स्थिर रहती है.", "Good fit for irrigated wheat fields and balanced NPK planning.", "सिंचित गेहूं खेत और संतुलित NPK योजना के लिए अच्छी पसंद है."),
      item("Lok 1", "Budget Option", "किफायती विकल्प", "35-40 q/ha", "35-40 क्विंटल/हेक्टेयर", "₹40 - ₹50 / kg", "Cost-effective seed for regular sowing conditions.", "सामान्य बुवाई स्थिति के लिए कम खर्च वाला बीज विकल्प.", "Useful where farmers want lower input cost with dependable yield.", "जहां किसान कम लागत और भरोसेमंद उपज चाहते हैं, वहां उपयोगी है."),
      item("HI 1544", "High Yield", "अधिक उपज", "55-60 q/ha", "55-60 क्विंटल/हेक्टेयर", "₹75 - ₹90 / kg", "Premium variety suited for better-managed fields.", "अच्छे प्रबंधन वाले खेतों के लिए प्रीमियम किस्म.", "Performs well when irrigation and fertilizer timing are maintained.", "सिंचाई और खाद का समय सही रखने पर अच्छा प्रदर्शन करती है."),
    ],
    fertilizer: [
      input("DAP + Urea", "Trusted Choice", "भरोसेमंद विकल्प", "Root growth and tillering", "जड़ बढ़वार और कल्ले बनाना", "Basal + 1st irrigation", "बुवाई के समय + पहली सिंचाई", "DAP 100 kg/ha, Urea 120 kg/ha split", "DAP 100 kg/ha, यूरिया 120 kg/ha किस्तों में", "Supports strong early growth and grain formation.", "शुरुआती बढ़वार और दाना बनने में मदद करता है.", "Wheat needs early phosphorus and split nitrogen for better tillers.", "गेहूं को अच्छे कल्लों के लिए शुरुआत में फॉस्फोरस और किस्तों में नाइट्रोजन चाहिए."),
      input("Zinc Sulphate", "Best Match", "सबसे अच्छा मेल", "Micronutrient correction", "सूक्ष्म पोषक तत्व सुधार", "Before sowing", "बुवाई से पहले", "25 kg/ha", "25 kg/ha", "Helps prevent zinc deficiency in wheat fields.", "गेहूं में जिंक की कमी रोकने में मदद करता है.", "Many central Indian soils respond well to zinc in wheat.", "मध्य भारत की कई मिट्टियों में गेहूं जिंक देने से अच्छा जवाब देता है."),
      input("Azotobacter Culture", "Eco-Friendly", "पर्यावरण अनुकूल", "Biofertilizer nitrogen support", "जैविक नाइट्रोजन सहायता", "Seed treatment", "बीज उपचार", "200 g per 10 kg seed", "10 kg बीज पर 200 g", "Eco-friendly support for nitrogen availability.", "नाइट्रोजन उपलब्धता के लिए पर्यावरण अनुकूल मदद.", "Improves nutrient use and reduces pressure on chemical nitrogen.", "पोषक तत्व उपयोग सुधारता है और रासायनिक नाइट्रोजन पर दबाव घटाता है."),
    ],
    pesticide: [
      spray("Imidacloprid 17.8 SL", "Trusted Choice", "भरोसेमंद विकल्प", "Aphid and sucking pest control", "एफिड और रस चूसने वाले कीट नियंत्रण", "When pest population starts", "जब कीट संख्या शुरू हो", "Useful for early sucking pest pressure in wheat.", "गेहूं में शुरुआती रस चूसक कीट दबाव पर उपयोगी.", "Apply only when pest presence is visible and follow label dose.", "कीट दिखने पर ही छिड़कें और लेबल पर लिखी मात्रा का पालन करें."),
      spray("Lambda-cyhalothrin", "Best Match", "सबसे अच्छा मेल", "Termite and caterpillar control", "दीमक और इल्ली नियंत्रण", "Early crop stage if needed", "जरूरत होने पर शुरुआती अवस्था", "Protects young crop from common chewing pests.", "नई फसल को चबाने वाले कीटों से बचाने में मदद करता है.", "Works best as a targeted spray, not as routine use.", "इसे नियमित छिड़काव की तरह नहीं, जरूरत पर लक्षित छिड़काव करें."),
    ],
  },
  soybean: {
    label: "Soybean",
    labelHi: "सोयाबीन",
    image: "https://images.unsplash.com/photo-1621213032483-e02cc7c80521?auto=format&fit=crop&w=1200&q=80",
    seeds: [
      item("JS 9560", "Best Match", "सबसे अच्छा मेल", "22-25 q/ha", "22-25 क्विंटल/हेक्टेयर", "₹80 - ₹95 / kg", "Popular early-maturing soybean variety.", "जल्दी पकने वाली लोकप्रिय सोयाबीन किस्म.", "Good choice for timely monsoon sowing and balanced fields.", "समय पर मानसून बुवाई और संतुलित खेतों के लिए अच्छा विकल्प."),
      item("JS 335", "Budget Option", "किफायती विकल्प", "18-20 q/ha", "18-20 क्विंटल/हेक्टेयर", "₹60 - ₹70 / kg", "Reliable variety for moderate budget farms.", "मध्यम बजट वाले खेतों के लिए भरोसेमंद किस्म.", "Works well where farmers want a familiar, stable option.", "जहां किसान परिचित और स्थिर विकल्प चाहते हैं, वहां अच्छा काम करती है."),
      item("JS 21-72", "High Yield", "अधिक उपज", "26-30 q/ha", "26-30 क्विंटल/हेक्टेयर", "₹110 - ₹130 / kg", "Premium option with strong yield potential.", "अच्छी उपज क्षमता वाला प्रीमियम विकल्प.", "Best for farmers who can manage crop nutrition and timely protection.", "जो किसान पोषण और समय पर सुरक्षा कर सकते हैं, उनके लिए बेहतर."),
    ],
    fertilizer: [
      input("SSP + MOP", "Trusted Choice", "भरोसेमंद विकल्प", "Phosphorus, sulphur, and potash support", "फॉस्फोरस, सल्फर और पोटाश सहायता", "Basal at sowing", "बुवाई के समय", "SSP 250 kg/ha, MOP 40 kg/ha", "SSP 250 kg/ha, MOP 40 kg/ha", "Supports nodulation and pod filling.", "गांठ बनने और फली भरने में सहायता करता है.", "Soybean responds well to phosphorus and sulphur at sowing.", "सोयाबीन बुवाई के समय फॉस्फोरस और सल्फर से अच्छा जवाब देती है."),
      input("Rhizobium Culture", "Eco-Friendly", "पर्यावरण अनुकूल", "Nitrogen fixation", "नाइट्रोजन स्थिरीकरण", "Seed treatment", "बीज उपचार", "200 g per 10 kg seed", "10 kg बीज पर 200 g", "Improves natural nitrogen supply.", "प्राकृतिक नाइट्रोजन उपलब्धता सुधारता है.", "Rhizobium is a key biofertilizer for soybean roots.", "राइजोबियम सोयाबीन की जड़ों के लिए महत्वपूर्ण जैव उर्वरक है."),
      input("PSB Culture", "Eco-Friendly", "पर्यावरण अनुकूल", "Phosphorus availability", "फॉस्फोरस उपलब्धता", "Seed treatment", "बीज उपचार", "200 g per 10 kg seed", "10 kg बीज पर 200 g", "Helps plants use soil phosphorus better.", "पौधों को मिट्टी का फॉस्फोरस बेहतर उपयोग करने में मदद करता है.", "Pairs well with Rhizobium for eco-friendly soybean nutrition.", "सोयाबीन पोषण में राइजोबियम के साथ अच्छा जैविक विकल्प है."),
    ],
    pesticide: [
      spray("Chlorantraniliprole", "Best Match", "सबसे अच्छा मेल", "Defoliator and pod borer management", "पत्ती खाने वाली इल्ली और फली छेदक नियंत्रण", "Vegetative to flowering stage", "बढ़वार से फूल अवस्था", "Recommended when caterpillar pressure appears.", "इल्ली का दबाव दिखने पर उपयोगी.", "Protects foliage and pods when applied at the right threshold.", "सही समय पर प्रयोग करने से पत्तियों और फलियों की रक्षा होती है."),
      spray("Thiamethoxam", "Trusted Choice", "भरोसेमंद विकल्प", "Sucking pest control", "रस चूसक कीट नियंत्रण", "Early infestation", "शुरुआती प्रकोप", "Useful for whitefly and other sucking pests.", "सफेद मक्खी और अन्य रस चूसक कीटों में उपयोगी.", "Use only as per label and avoid unnecessary repeat sprays.", "लेबल के अनुसार ही प्रयोग करें और अनावश्यक दोहराव से बचें."),
    ],
  },
  gram: {
    label: "Gram",
    labelHi: "चना",
    image: "https://images.unsplash.com/photo-1596706030999-52e04f4a3bc7?auto=format&fit=crop&w=1200&q=80",
    seeds: [
      item("JG 11", "Best Match", "सबसे अच्छा मेल", "15-18 q/ha", "15-18 क्विंटल/हेक्टेयर", "₹70 - ₹80 / kg", "Dependable gram variety for central India.", "मध्य भारत के लिए भरोसेमंद चना किस्म.", "Good balance of yield and field adaptability.", "उपज और खेत की अनुकूलता का अच्छा संतुलन देती है."),
      item("JG 14", "High Yield", "अधिक उपज", "20-22 q/ha", "20-22 क्विंटल/हेक्टेयर", "₹90 - ₹105 / kg", "Improved option with larger grain potential.", "बड़े दाने की संभावना वाला सुधरा विकल्प.", "Useful where soil moisture and sowing window are favorable.", "जहां मिट्टी की नमी और बुवाई समय अच्छा हो, वहां उपयोगी है."),
      item("Kabuli Gram", "Premium", "प्रीमियम", "18-24 q/ha", "18-24 क्विंटल/हेक्टेयर", "₹140 - ₹160 / kg", "Premium market option for better price potential.", "बेहतर बाजार भाव की संभावना वाला प्रीमियम विकल्प.", "Good for farmers targeting high-value gram markets.", "ऊंचे भाव वाले चना बाजार को लक्ष्य करने वाले किसानों के लिए अच्छा."),
    ],
    fertilizer: [
      input("DAP + Sulphur", "Trusted Choice", "भरोसेमंद विकल्प", "Root growth and pulse nutrition", "जड़ बढ़वार और दलहन पोषण", "Basal at sowing", "बुवाई के समय", "DAP 100 kg/ha, sulphur 20 kg/ha", "DAP 100 kg/ha, सल्फर 20 kg/ha", "Supports early root growth and pod setting.", "शुरुआती जड़ बढ़वार और फली बनने में मदद करता है.", "Gram needs phosphorus early and benefits from sulphur.", "चना को शुरुआत में फॉस्फोरस चाहिए और सल्फर से लाभ मिलता है."),
      input("Rhizobium Culture", "Eco-Friendly", "पर्यावरण अनुकूल", "Biofertilizer nitrogen support", "जैविक नाइट्रोजन सहायता", "Seed treatment", "बीज उपचार", "200 g per 10 kg seed", "10 kg बीज पर 200 g", "Helps gram fix atmospheric nitrogen.", "चना को वायुमंडलीय नाइट्रोजन स्थिर करने में मदद करता है.", "A simple eco-friendly input for pulse crops.", "दलहनी फसलों के लिए सरल पर्यावरण अनुकूल इनपुट है."),
      input("PSB Culture", "Eco-Friendly", "पर्यावरण अनुकूल", "Phosphorus mobilization", "फॉस्फोरस उपलब्ध कराना", "Seed treatment", "बीज उपचार", "200 g per 10 kg seed", "10 kg बीज पर 200 g", "Improves phosphorus uptake from soil.", "मिट्टी से फॉस्फोरस लेने की क्षमता सुधारता है.", "Useful with gram because phosphorus drives root growth.", "चना में जड़ बढ़वार के लिए फॉस्फोरस जरूरी होता है, इसलिए उपयोगी है."),
    ],
    pesticide: [
      spray("Emamectin Benzoate", "Best Match", "सबसे अच्छा मेल", "Pod borer management", "फली छेदक नियंत्रण", "Flowering to pod formation", "फूल से फली बनने तक", "Used when pod borer pressure crosses threshold.", "फली छेदक का दबाव बढ़ने पर उपयोग किया जाता है.", "Gram yield depends heavily on protecting flowers and pods.", "चना की उपज फूल और फली की सुरक्षा पर बहुत निर्भर करती है."),
      spray("Spinosad", "Trusted Choice", "भरोसेमंद विकल्प", "Caterpillar control", "इल्ली नियंत्रण", "At early larval stage", "शुरुआती इल्ली अवस्था", "Helpful for targeted caterpillar management.", "लक्षित इल्ली नियंत्रण के लिए उपयोगी.", "Works best when applied early and as per label instruction.", "शुरुआत में और लेबल निर्देश के अनुसार प्रयोग करने पर बेहतर काम करता है."),
    ],
  },
};

function item(name, tag, tagHi, benefit, benefitHi, price, summary, summaryHi, why, whyHi) {
  return { name, tag, tagHi, benefit, benefitHi, price, summary, summaryHi, why, whyHi };
}

function input(name, tag, tagHi, purpose, purposeHi, stage, stageHi, dose, doseHi, summary, summaryHi, why, whyHi) {
  return { name, tag, tagHi, purpose, purposeHi, stage, stageHi, dose, doseHi, summary, summaryHi, why, whyHi };
}

function spray(name, tag, tagHi, use, useHi, stage, stageHi, summary, summaryHi, why, whyHi) {
  return { name, tag, tagHi, use, useHi, stage, stageHi, summary, summaryHi, why, whyHi };
}

const SECTION_META = {
  seeds: { icon: PackageCheck, tone: "text-[#4CAF50]", bg: "bg-green-50" },
  fertilizer: { icon: FlaskConical, tone: "text-blue-600", bg: "bg-blue-50" },
  pesticide: { icon: Bug, tone: "text-amber-600", bg: "bg-amber-50" },
};

function tagClasses(tag) {
  if (tag === "Eco-Friendly") return "bg-green-100 text-green-700 border-green-200";
  if (tag === "Budget Option") return "bg-blue-100 text-blue-700 border-blue-200";
  if (tag === "High Yield" || tag === "Premium") return "bg-amber-100 text-amber-700 border-amber-200";
  return "bg-[#4CAF50]/10 text-[#2E7D32] border-green-200";
}

function local(itemValue, language, key) {
  return language === "hi" ? itemValue[`${key}Hi`] || itemValue[key] : itemValue[key];
}

function RecommendationCard({ item, type, isOpen, onToggle, labels, language }) {
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-black text-gray-900">{item.name}</h3>
          <p className="mt-1 text-sm font-medium leading-6 text-gray-600">{local(item, language, "summary")}</p>
        </div>
        <span className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider ${tagClasses(item.tag)}`}>
          {local(item, language, "tag")}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        {type === "seeds" ? (
          <>
            <InfoPill label={labels.benefit} value={local(item, language, "benefit")} />
            <InfoPill label={labels.price} value={item.price} />
          </>
        ) : type === "fertilizer" ? (
          <>
            <InfoPill label={labels.purpose} value={local(item, language, "purpose")} />
            <InfoPill label={labels.useStage} value={local(item, language, "stage")} />
            <InfoPill label={labels.dose} value={local(item, language, "dose")} wide />
          </>
        ) : (
          <>
            <InfoPill label={labels.usedFor} value={local(item, language, "use")} />
            <InfoPill label={labels.applyWhen} value={local(item, language, "stage")} />
          </>
        )}
      </div>

      <button type="button" onClick={onToggle} className="mt-4 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 text-left text-sm font-bold text-gray-700 transition-colors hover:bg-green-50 hover:text-[#2E7D32]">
        {labels.why}
        <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <p className="mt-3 rounded-xl border border-green-100 bg-green-50/70 p-3 text-sm font-medium leading-6 text-gray-700">
          {local(item, language, "why")}
        </p>
      )}

      <button type="button" onClick={() => window.open(BUY_LINK, "_blank")} className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-[#4CAF50] px-4 py-3 text-sm font-black text-white shadow-sm transition-all hover:bg-[#43A047] hover:shadow-md">
        {labels.buy}
        <ExternalLink size={16} />
      </button>
    </div>
  );
}

function InfoPill({ label, value, wide = false }) {
  return (
    <div className={`rounded-xl border border-gray-100 bg-gray-50 p-3 ${wide ? "col-span-2" : ""}`}>
      <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">{label}</p>
      <p className="mt-1 text-sm font-bold leading-snug text-gray-900">{value}</p>
    </div>
  );
}

function Section({ id, items, openKey, setOpenKey, labels, language }) {
  const meta = SECTION_META[id];
  const Icon = meta.icon;

  return (
    <section className="space-y-5">
      <div className="flex items-center gap-3">
        <div className={`rounded-2xl ${meta.bg} p-3 ${meta.tone}`}>
          <Icon size={22} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900">{labels[id]}</h2>
          <p className="text-sm font-medium text-gray-500">{labels[`${id}Desc`]}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => {
          const key = `${id}-${item.name}`;
          return (
            <RecommendationCard
              key={key}
              item={item}
              type={id}
              isOpen={openKey === key}
              onToggle={() => setOpenKey(openKey === key ? "" : key)}
              labels={labels}
              language={language}
            />
          );
        })}
      </div>
    </section>
  );
}

export default function SeedAdvisorPage() {
  const { t, language } = useAppContext();
  const labels = uiText[language] || uiText.en;
  const [selectedCrop, setSelectedCrop] = useState("wheat");
  const [openKey, setOpenKey] = useState("");
  const crop = FARM_ADVISOR_DATA[selectedCrop];
  const cropName = language === "hi" ? crop.labelHi : crop.label;

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-12">
      <div className="space-y-4 pt-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-green-100 bg-white px-4 py-2 text-xs font-black uppercase tracking-wider text-[#2E7D32] shadow-sm">
          <ShieldCheck size={14} />
          {labels.trust}
        </div>
        <h1 className="text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
          {labels.titleA}{" "}
          <span className="bg-gradient-to-r from-[#4CAF50] to-teal-500 bg-clip-text text-transparent">
            {t("seedAdvisor.titleB")}
          </span>
        </h1>
        <p className="mx-auto max-w-3xl text-lg font-medium text-gray-600">{labels.subtitle}</p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="p-6 md:p-8">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-black text-gray-900">
              <Sparkles className="text-yellow-500" />
              {labels.selectCrop}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {Object.entries(FARM_ADVISOR_DATA).map(([key, itemData]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setSelectedCrop(key);
                    setOpenKey("");
                  }}
                  className={`flex items-center justify-between rounded-2xl border p-4 text-left transition-all ${
                    selectedCrop === key ? "border-[#4CAF50] bg-green-50 shadow-sm" : "border-gray-100 bg-gray-50 hover:border-green-200 hover:bg-white"
                  }`}
                >
                  <span>
                    <span className="block text-base font-black text-gray-900">{language === "hi" ? itemData.labelHi : itemData.label}</span>
                    <span className="text-sm font-semibold text-gray-500">{language === "hi" ? itemData.label : itemData.labelHi}</span>
                  </span>
                  <Leaf className={selectedCrop === key ? "text-[#4CAF50]" : "text-gray-300"} size={20} />
                </button>
              ))}
            </div>
          </div>

          <div className="relative min-h-[18rem] overflow-hidden bg-gray-900 p-8 text-white">
            <img src={crop.image} alt={cropName} className="absolute inset-0 h-full w-full object-cover opacity-45" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-900/60 to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-end">
              <p className="mb-2 text-sm font-black uppercase tracking-wider text-green-200">{labels.plan}</p>
              <h2 className="text-4xl font-black md:text-5xl">
                {cropName} <span className="text-2xl font-semibold text-gray-300">({language === "hi" ? crop.label : crop.labelHi})</span>
              </h2>
              <p className="mt-3 max-w-xl text-sm font-medium leading-6 text-gray-100">{labels.planNote}</p>
            </div>
          </div>
        </div>
      </div>

      <Section id="seeds" items={crop.seeds} openKey={openKey} setOpenKey={setOpenKey} labels={labels} language={language} />
      <Section id="fertilizer" items={crop.fertilizer} openKey={openKey} setOpenKey={setOpenKey} labels={labels} language={language} />
      <Section id="pesticide" items={crop.pesticide} openKey={openKey} setOpenKey={setOpenKey} labels={labels} language={language} />
    </div>
  );
}
