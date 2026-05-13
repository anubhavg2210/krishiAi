/** Crop-wise knowledge for Farm Health (informational only; not product advice). */

const make = (en, hi) => ({ en, hi });

const ISSUE = (titleEn, descEn, titleHi, descHi) => ({
  en: { title: titleEn, desc: descEn },
  hi: { title: titleHi, desc: descHi },
});

const PEST = (nameEn, damageEn, idEn, ctrlEn, nameHi, damageHi, idHi, ctrlHi) => ({
  en: { name: nameEn, damage: damageEn, identify: idEn, control: ctrlEn },
  hi: { name: nameHi, damage: damageHi, identify: idHi, control: ctrlHi },
});

export const FARM_CROP_ORDER = ["rice", "wheat", "soybean", "gram", "maize"];

export const CROP_KNOWLEDGE = {
  rice: {
    issues: {
      diseases: [
        ISSUE(
          "Blast & sheath blight",
          "Spots on leaves or neck blast after humid spells; sheath rot makes panicles weak.",
          "ब्लास्ट व शीथ ब्लाइट",
          "नमी में पत्तों पर धब्बे या गले पर ब्लास्ट; शीथ रट से बालियां कमजोर।",
        ),
        ISSUE(
          "Bacterial leaf blight",
          "Water-soaked stripes along leaf edges that turn brown—often spreads in wind and rain.",
          "जीवाणु पत्ता झुलसा",
          "किनारे पर पानी जैसी धारियां, बाद में भूरी—हवा और बारिश में फैलता है।",
        ),
        ISSUE(
          "False smut / grain discoloration",
          "Orange or green spore balls on grains; quality drops if infection is heavy.",
          "फाल्स स्मट / दाने का रंग बदलना",
          "दानों पर नारंगी या हरा गोल दिखना; ज्यादा होने पर गुणवत्ता घटती है।",
        ),
      ],
      pests: [
        ISSUE(
          "Stem borer",
          "Dead heart in vegetative stage; white heads at grain fill.",
          "तना छेदक",
          "वृद्धि में डेड हार्ट; दाने भरते समय सफेद सिर।",
        ),
        ISSUE(
          "Brown planthopper",
          "Hopper burn patches; sooty mold from honeydew.",
          "भूरा प्लांटहॉपर",
          "हॉपर बर्न के धब्बे; शहद जैसे रस से काला फंगस।",
        ),
        ISSUE(
          "Leaf folder",
          "Leaves rolled longitudinally with feeding scars inside folds.",
          "पत्ता मोड़क",
          "पत्ते लंब में मुड़कर अंदर खुरचन के निशान।",
        ),
      ],
      weeds: [
        ISSUE(
          "Echinochloa / barnyard grass",
          "Grassy weeds that look like rice seedlings—compete for water early.",
          "सवा / बरन्यार्ड घास",
          "धान जैसी दिखने वाली घास—शुरू में पानी लेती है।",
        ),
        ISSUE(
          "Sedges & broadleaf weeds",
          "Triangular stems or broad leaves crowding transplanted rows.",
          "सेज व चौड़ी पत्ती के खरपतवार",
          "तिकोने तने या चौड़ी पत्तियां रोपण की लाइन में भीड़।",
        ),
      ],
      nutrients: [
        ISSUE(
          "Yellowing from N shortage",
          "Older leaves pale first; tillering weak if nitrogen is low.",
          "N की कमी से पीलापन",
          "पुराने पत्ते पहले पीले; नाइट्रोजन कम हो तो कल्ले कम।",
        ),
        ISSUE(
          "Zinc deficiency",
          "Brown blotchy patches on mid-leaf; common on alkaline soils.",
          "जिंक की कमी",
          "पत्ते के बीच भूरे धब्बे; क्षारीय मिट्टी में आम।",
        ),
      ],
    },
    weedKnowledge: make(
      {
        intro:
          "Weeds in puddled/transplanted rice steal light and nutrients and hide pests. Keep nurseries and main fields clean early.",
        tips: [
          "Level the field and use stale seedbed or recommended pre-emergence practice for your area.",
          "Hand-weed at 15–25 days after transplanting when water recedes slightly.",
          "Avoid carrying weed seeds between fields on tools or mud.",
        ],
      },
      {
        intro:
          "धान में खरपतवार रोशनी और पोषक छीनते हैं और कीड़े छिपाते हैं। नर्सरी और मुख्य खेत शुरू में साफ रखें।",
        tips: [
          "खेत समतल करें; स्थानीय सलाह से स्टेल सीडबेड या उपयुक्त प्रथाएं अपनाएं।",
          "रोपण के 15–25 दिन बाद पानी कम होने पर हाथ से निकालें।",
          "औजारों या कीचड़ से खरपतवार बीज दूसरे खेत न ले जाएं।",
        ],
      },
    ),
    pestsDetail: [
      PEST(
        "Stem borer",
        "Wilting central shoot; later empty grains.",
        "Look for frass at leaf base; dead heart pulls out easily.",
        "Destroy stubbles; synchronize planting; use light traps where advised.",
        "तना छेदक",
        "बीच की कोपल मुरझाना; बाद में खाली दाने।",
        "पत्ते के आधार पर मल देखें; डेड हार्ट आसानी से निकलता है।",
        "काठ/अवशेष नष्ट करें; रोपण एक साथ; सलाह पर प्रकाश जाल।",
      ),
      PEST(
        "Brown planthopper",
        "Circular patches that dry quickly (“hopper burn”).",
        "Adults jump when touched; honeydew makes leaves sticky.",
        "Avoid excess nitrogen; maintain water depth as per local guidance.",
        "भूरा प्लांटहॉपर",
        "गोल धब्बे जल्दी सूखते हैं।",
        "छूने पर कूदते हैं; पत्ते चिपचिपे।",
        "ज्यादा नाइट्रोजन न दें; पानी की गहराई स्थानीय सलाह अनुसार।",
      ),
    ],
    summaryDefault: make(
      { level: "needsAttention", line: "Rice needs steady water and clean rows in the first month—watch weeds and early pests daily." },
      { level: "needsAttention", line: "धान में पहले महीने पानी और साफ लाइन जरूरी—खरपतवार और शुरुआती कीड़े रोज देखें।" },
    ),
    nextDefault: make(
      [
        "Walk two diagonals across the field twice a week.",
        "Check leaf folds and lower canopy for hopper or egg masses.",
        "Note any patchy yellowing and compare with last week’s growth.",
      ],
      [
        "हफ्ते में दो बार खेत में तिरछी चाल से चलकर देखें।",
        "पत्ते मोड़ और निचली छत्र में हॉपर या अंडे देखें।",
        "पीले धब्बे लिखें और पिछले हफ्ते से तुलना करें।",
      ],
    ),
  },

  wheat: {
    issues: {
      diseases: [
        ISSUE(
          "Rusts (yellow/brown/black)",
          "Powdery pustules on leaves and stems; wind spreads spores fast in cool, moist mornings.",
          "रस्ट (पीला/भूरा/काला)",
          "पत्ते-तने पर चूर्ण जैसे फफूंद; ठंडी नम सुबह में जल्द फैलता है।",
        ),
        ISSUE(
          "Powdery mildew",
          "White dusty coating on upper leaves in dense, humid canopies.",
          "पाउडरी मिल्ड्यू",
          "घने नम छत्र में ऊपरी पत्तों पर सफेद धूल जैसा परत।",
        ),
        ISSUE(
          "Loose smut",
          "Black powder replaces grain heads—seed-borne risk next season.",
          "लूज स्मट",
          "काला चूर्ण बाली की जगह—अगले सीजन बीज से खतरा।",
        ),
      ],
      pests: [
        ISSUE(
          "Aphids",
          "Curled leaves and sticky honeydew; can transmit barley yellow dwarf.",
          "एफिड",
          "पत्ते मुड़े और चिपचिपा रस; वायरस फैल सकता है।",
        ),
        ISSUE(
          "Termites / pink stem borer (where present)",
          "Weak stems or dead tillers; check base of clumps.",
          "दीमक / गुलाबी तना छेदक",
          "कमजोर तना या मरे कल्ले; गुच्छे के आधार देखें।",
        ),
      ],
      weeds: [
        ISSUE(
          "Phalaris / wild oats",
          "Grassy weeds similar to wheat—hard to spot until heading.",
          "फैलेरिस / जंगली जई",
          "गेहूं जैसी घास—बाली आने तक पहचान मुश्किल।",
        ),
        ISSUE(
          "Broadleaf weeds (Chenopodium, etc.)",
          "Wide leaves shading lower tillers and holding moisture.",
          "चौड़ी पत्ती के खरपतवार",
          "चौड़ी पत्ती से निचले कल्लों पर छाया और नमी।",
        ),
      ],
      nutrients: [
        ISSUE(
          "Chlorosis from S or Fe stress",
          "Uniform pale new leaves while veins stay greener on some soils.",
          "S या Fe तनाव से पीलापन",
          "नई पत्तियां पीली, कभी नसें हरी रहतीं।",
        ),
        ISSUE(
          "Late N topdress timing",
          "Too late causes lodging; too early may wash with rain.",
          "देर से N टॉपड्रेस",
          "बहुत देर से गिराव; जल्दी बारिश से बह सकता है।",
        ),
      ],
    },
    weedKnowledge: make(
      {
        intro: "Wheat competes poorly with early grassy weeds. Clean fields before first node stage save yield.",
        tips: [
          "Scout 20–25 days after sowing when weeds are still small.",
          "Remove big patches by hand if few, to delay resistance pressure.",
          "Rotate with legumes where possible to break weed cycles.",
        ],
      },
      {
        intro: "गेहूं में शुरुआती घास खरपतवार से मुकाबला कमजोर। पहले नोड तक साफ खेत उपज बचाता है।",
        tips: [
          "बुवाई के 20–25 दिन बाद छोटे खरपतवार देखें।",
          "कम इलाके में हाथ से बड़े पैच हटाएं।",
          "जहां संभव दलहन से फसल चक्र बदलें।",
        ],
      },
    ),
    pestsDetail: [
      PEST(
        "Aphids",
        "Stunted growth and sticky leaves.",
        "Shake stems over paper—tiny moving specks.",
        "Encourage natural enemies; avoid unnecessary broad sprays.",
        "एफिड",
          "विकास रुकना और चिपचिपे पत्ते।",
        "तने हिलाकर कागज पर छोटे बिंदु देखें।",
        "प्राकृतिक शत्रु बचाएं; बिना जरूरत चौड़ा छिड़काव न करें।",
      ),
    ],
    summaryDefault: make(
      { level: "needsAttention", line: "Wheat rewards early scouting: rust and weeds move quickly in cool, damp canopies." },
      { level: "needsAttention", line: "गेहूं में जल्दी देखभाल जरूरी—ठंडे नम छत्र में रस्ट और खरपतवार तेजी से बढ़ते हैं।" },
    ),
    nextDefault: make(
      [
        "Check upper and lower leaf surfaces after dew in the morning.",
        "Mark any yellow or orange flecks and revisit in 3 days.",
        "Keep a simple notebook of patches for next season planning.",
      ],
      [
        "सुबह ओस के बाद पत्ते ऊपर-नीचे देखें।",
        "पीले या नारंगी धब्बे चिह्नित करें और 3 दिन बाद फिर देखें।",
        "अगले सीजन के लिए धब्बों की नोटबुक रखें।",
      ],
    ),
  },

  soybean: {
    issues: {
      diseases: [
        ISSUE(
          "Rust",
          "Small raised pustules on leaf underside—spreads with wind in humid weather.",
          "सोयाबीन रस्ट",
          "पत्ते के नीचे छोटे उभरे धब्बे—नम हवा में फैलता है।",
        ),
        ISSUE(
          "Charcoal rot / dry root rot",
          "Silver-gray streaks on stem; wilting in pod-fill even with moisture.",
          "चारकोल रोट",
          "तने पर चांदी-सलेट धारियां; नमी होने पर भी मुरझाना।",
        ),
      ],
      pests: [
        ISSUE(
          "Pod borer complex",
          "Holes in pods with shriveled beans inside.",
          "फली छेदक समूह",
          "फली में छेद और अंदर सिकुड़े दाने।",
        ),
        ISSUE(
          "Whitefly / jassids",
          "Leaf curl, honeydew, and sooty mold on upper leaves.",
          "व्हाइटफ्लाई / तेजसिंह",
          "पत्ता मोड़, शहद जैसा रस, ऊपर काला फंगस।",
        ),
      ],
      weeds: [
        ISSUE(
          "Parthenium & broadleaf pressure",
          "Aggressive early weeds that shade slow early growth.",
          "गाजर घास व चौड़ी पत्ती",
          "शुरू में छाया; सोयाबीन की धीमी वृद्धि।",
        ),
      ],
      nutrients: [
        ISSUE(
          "Nodulation failure",
          "Pale plants with few nodules—often dry seedbed or wrong inoculant handling.",
          "गांठ बनना कम",
          "पीले पौधे, गांठ कम—सुखी बेड या इनोक्युलेंट गलत।",
        ),
        ISSUE(
          "Mo deficiency",
          "Necrotic spots between veins on older leaves in acidic sands.",
          "मोलीब्डेनम की कमी",
          "पुराने पत्तों पर नसों के बीच मृत धब्बे।",
        ),
      ],
    },
    weedKnowledge: make(
      {
        intro: "Soybean stays short early—broadleaf weeds can overtop rows in two weeks if ignored.",
        tips: [
          "Clear field margins that harbor Parthenium seeds.",
          "Time first weeding before weeds shade the first trifoliate.",
          "Avoid deep tillage that dries nodulation zone.",
        ],
      },
      {
        intro: "सोयाबीन शुरू में छोटी—ध्यान न दें तो खरपतवार दो हफ्ते में लाइन ढक लेते हैं।",
        tips: [
          "किनारे की गाजर घास साफ रखें।",
          "पहली तिहरी पत्ती से पहले निराई का समय तय करें।",
          "गहरी जुताई से गांठ वाला जोन सुखे नहीं।",
        ],
      },
    ),
    pestsDetail: [
      PEST(
        "Pod borer",
        "Damaged pods and webbing on clusters.",
        "Tap branches—small larvae may drop on sheet.",
        "Remove crop residues; destroy heavily infested ends of plot.",
        "फली छेदक",
        "क्षतिग्रस्त फली और जाला।",
        "शाख हिलाकर लार्वा कागज पर।",
        "अवशेष नष्ट करें; ज्यादा प्रभावित हिस्सा अलग करें।",
      ),
    ],
    summaryDefault: make(
      { level: "needsAttention", line: "Soybean health hinges on early weed control and pod-stage insect checks." },
      { level: "needsAttention", line: "सोयाबीन में शुरुआती खरपतवार और फली अवस्था में कीड़ा जरूरी है।" },
    ),
    nextDefault: make(
      [
        "Count pods with holes in 10 random plants weekly after flowering.",
        "Flip leaves to check rust pustules before spraying decisions.",
        "Walk field edges where whiteflies often start.",
      ],
      [
        "फूल के बाद हर हफ्ते 10 पौधों में छेद वाली फली गिनें।",
        "छिड़काव से पहले पत्ता पलटकर रस्ट देखें।",
        "किनारे पर व्हाइटफ्लाई शुरू होती है—वहां चलें।",
      ],
    ),
  },

  gram: {
    issues: {
      diseases: [
        ISSUE(
          "Wilt / dry root rot complex",
          "Sudden yellowing and one-sided wilting; vascular browning inside stem.",
          "मुरझा रोग / सूखा जड़ सड़न",
          "अचानक पीलापन और एकतरफा मुरझाना; तने में भूरा।",
        ),
        ISSUE(
          "Ascochyta blight",
          "Spots on leaves, stems, and pods in cool, wet spells.",
          "अस्कोकाइटा ब्लाइट",
          "ठंडी नमी में पत्ता, तना और फली पर धब्बे।",
        ),
      ],
      pests: [
        ISSUE(
          "Pod borer",
          "Entry holes with frass on pods; shriveled grains.",
          "फली छेदक",
          "फली पर छेद और मल; सिकुड़े दाने।",
        ),
        ISSUE(
          "Cutworm / Heliothis (where present)",
          "Chewed pods and larvae inside flowers or buds.",
          "कटवर्म / हेलिओथिस",
          "चबाई फली; फूल में लार्वा।",
        ),
      ],
      weeds: [
        ISSUE(
          "Orobanche / broomrape (localized)",
          "Parasitic weed attaching to roots—yellow stems above ground.",
          "ओरोबैंच / ब्रूमरेप",
          "जड़ पर परजीवी—जमीन पर पीला तना।",
        ),
        ISSUE(
          "Broadleaf weeds in slow stands",
          "Wide leaves blocking light when plant population is thin.",
          "धीमी उगाई में चौड़ी पत्ती",
          "पौधे कम हों तो चौड़ी पत्ती रोशनी रोकती है।",
        ),
      ],
      nutrients: [
        ISSUE(
          "Rhizobium nodulation check",
          "Few pink nodules mean less nitrogen fixation.",
          "राइजोबियम गांठ जांच",
          "कम गुलाबी गांठ = कम नाइट्रोजन स्थिरीकरण।",
        ),
        ISSUE(
          "Boron on flowers/pods",
          "Flower drop or empty pods on sandy soils with low B.",
          "फूल/फली पर बोरॉन",
          "रेतली मिट्टी में फूल गिरना या खाली फली।",
        ),
      ],
    },
    weedKnowledge: make(
      {
        intro: "Chickpea is slow to canopy—early weeds decide final yield unless managed in time.",
        tips: [
          "Hand-weed before first branching if machine access is poor.",
          "Avoid dragging soil from infested fields on boots or tires.",
          "Watch low spots where moisture favors parasitic weeds.",
        ],
      },
      {
        intro: "चना छत्र धीरे बनता है—शुरुआती खरपतवार समय पर नहीं हटे तो उपज तय करते हैं।",
        tips: [
          "मशीन कम हो तो पहली शाखा से पहले हाथ से निकालें।",
          "संक्रमित खेत की मिट्टी जूते-टायर से न लाएं।",
          "नीचे जगह देखें जहां परजीवी खरपतवार को नमी मिलती है।",
        ],
      },
    ),
    pestsDetail: [
      PEST(
        "Pod borer",
        "Holes with dark frass; beans discolored.",
        "Shake pods gently—larvae sometimes visible at hole.",
        "Collect dropped pods; plough soon after harvest to bury pupae.",
        "फली छेदक",
        "छेद और काला मल; दाने बदरंग।",
        "फली हल्की हिलाएं—छेद पर लार्वा दिख सकता है।",
        "गिरी फली इकट्ठी करें; कटाई के बाद जुताई से प्यूपा दबाएं।",
      ),
    ],
    summaryDefault: make(
      { level: "needsAttention", line: "Gram needs clean early rows and careful pod checks as weather turns warm." },
      { level: "needsAttention", line: "चने में शुरुआती साफ लाइन और गर्मी आने पर फली की जांच जरूरी।" },
    ),
    nextDefault: make(
      [
        "Dig 3 plants and count healthy pink nodules at flowering.",
        "Sample 20 pods for fresh holes each week in pod-fill.",
        "Note wilting direction—same side of field may mean soil-borne issue.",
      ],
      [
        "फूल पर 3 पौधे खोदकर गुलाबी गांठ गिनें।",
        "फली भरते समय हर हफ्ते 20 फली में ताजा छेद देखें।",
        "मुरझाना एक तरफ हो तो मिट्टी जनित समस्या सोचें।",
      ],
    ),
  },

  maize: {
    issues: {
      diseases: [
        ISSUE(
          "Turcicum leaf blight",
          "Long elliptical lesions on leaves starting lower canopy.",
          "टर्सिकम पत्ता झुलसा",
          "नीचे से लंबे दीर्घवृत्तीय धब्बे।",
        ),
        ISSUE(
          "Post-flowering stalk rots",
          "Lodging near maturity; internal stalk discoloration.",
          "फूल के बाद तना सड़न",
          "पकने के पास गिराव; तने में रंग बदलना।",
        ),
      ],
      pests: [
        ISSUE(
          "Fall armyworm",
          "Ragged whorl feeding and sawdust-like frass in funnel.",
          "फॉल आर्मीवर्म",
          "व्हॉर्ल में चबाई और कण जैसा मल।",
        ),
        ISSUE(
          "Stem borer",
          "Dead heart in young maize; bore holes on stem.",
          "तना छेदक",
          "छोटे मक्के में डेड हार्ट; तने पर छेद।",
        ),
      ],
      weeds: [
        ISSUE(
          "Nutgrass / Cyperus",
          "Underground tubers regrow if cut only at top.",
          "नटग्रास / साइपरस",
          "जमीन में कंद—ऊपर काटने से फिर उगता है।",
        ),
        ISSUE(
          "Broadleaf weeds before knee-high",
          "Fast growers shading slow juvenile maize.",
          "घुटने से पहले चौड़ी पत्ती",
          "तेज उगने वाले छाया बनाते हैं।",
        ),
      ],
      nutrients: [
        ISSUE(
          "N striping / sulfur lack",
          "Yellow striping on midrib in rapid growth after rain.",
          "N धारियां / सल्फर कमी",
          "तेज वृद्धि में नस के साथ पीली धारियां।",
        ),
        ISSUE(
          "Zinc on calcareous soils",
          "White banding on young leaves in cold soils.",
          "चूना मिट्टी पर जिंक",
          "ठंडी मिट्टी में नई पत्तों पर सफेद पट्टी।",
        ),
      ],
    },
    weedKnowledge: make(
      {
        intro: "Maize grows fast after knee-high—control weeds before they shade the whorl.",
        tips: [
          "Inter-row cultivation while soil is slightly dry to kill small weeds.",
          "Remove nutgrass clumps with tubers when few, to slow spread.",
          "Keep headlands clean to reduce seed rain into the field.",
        ],
      },
      {
        intro: "मक्का घुटने के बाद तेज बढ़ती है—व्हॉर्ल से पहले खरपतवार हटाएं।",
        tips: [
          "मिट्टी थोड़ी सुखी हो तो लाइन के बीच जुताई।",
          "कंद वाला नटग्रास कम हो तो गुच्छा निकालें।",
          "सिरा साफ रखें ताकि बीज खेत में न गिरें।",
        ],
      },
    ),
    pestsDetail: [
      PEST(
        "Fall armyworm",
        "Window-paned leaves in whorl stage.",
        "Open whorl and look for larvae and wet frass.",
        "Scout every 3 days in peak season; destroy egg masses if seen.",
        "फॉल आर्मीवर्म",
        "व्हॉर्ल में खिड़की जैसी चबाई।",
        "व्हॉर्ल खोलकर लार्वा और गीला मल देखें।",
        "चरम मौसम में 3 दिन में जांच; अंडे समूह नष्ट करें।",
      ),
    ],
    summaryDefault: make(
      { level: "needsAttention", line: "Maize risk peaks in whorl stage for armyworm and early weed competition." },
      { level: "needsAttention", line: "मक्के में व्हॉर्ल अवस्था में आर्मीवर्म और शुरुआती खरपतवार सबसे ज्यादा खतरा।" },
    ),
    nextDefault: make(
      [
        "Open 5 random whorls twice a week during vegetative stage.",
        "Measure weed height vs crop—if weeds reach half crop height, act.",
        "Check stalk strength 2 weeks before expected harvest.",
      ],
      [
        "वृद्धि में हफ्ते में दो बार 5 व्हॉर्ल खोलें।",
        "खरपतवार की ऊंचाई फसल की आधी हो तो कदम उठाएं।",
        "कटाई से दो हफ्ते पहले तना मजबूती देखें।",
      ],
    ),
  },
};

export function getCropKnowledgePack(cropId, lang) {
  const id = FARM_CROP_ORDER.includes(cropId) ? cropId : "wheat";
  const k = CROP_KNOWLEDGE[id];
  const L = lang === "hi" ? "hi" : "en";
  const pick = (node) => (typeof node === "object" && node !== null && (L in node) ? node[L] : node);

  const mapIssues = (arr) => (arr || []).map((item) => pick(item));

  return {
    cropId: id,
    issues: {
      diseases: mapIssues(k.issues.diseases),
      pests: mapIssues(k.issues.pests),
      weeds: mapIssues(k.issues.weeds),
      nutrients: mapIssues(k.issues.nutrients),
    },
    weedKnowledge: pick(k.weedKnowledge),
    pestsDetail: (k.pestsDetail || []).map((p) => pick(p)),
    summaryDefault: pick(k.summaryDefault),
    nextDefault: pick(k.nextDefault),
  };
}

/** Map API diagnosis to summary levels shown on the dashboard card. */
export function diagnosisSummaryLevel(result) {
  if (!result?.disease) return null;
  const d = String(result.disease).toLowerCase();
  if (d.includes("healthy")) return "healthy";
  if (d.includes("late") || d.includes("severe") || d.includes("rot")) return "highRisk";
  return "needsAttention";
}

export function shortDiagnosisExplanation(result, lang) {
  if (!result) return "";
  const sym = Array.isArray(result.symptoms) ? result.symptoms.filter(Boolean) : [];
  if (sym.length) {
    const line = sym.slice(0, 2).join(" ");
    return line;
  }
  if (lang === "hi") {
    return `फोटो के आधार पर पढ़ाई: ${result.disease}. स्थानीय केंद्र से पुष्टि कराएं।`;
  }
  return `From your photo, the readout points to: ${result.disease}. Confirm with a local expert if unsure.`;
}
