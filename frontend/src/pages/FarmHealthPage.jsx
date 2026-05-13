import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  BookOpen,
  Bug,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Leaf,
  Scan,
  Shield,
  Sparkles,
  Sprout,
  UploadCloud,
  Wind,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext";
import {
  FARM_CROP_ORDER,
  diagnosisSummaryLevel,
  getCropKnowledgePack,
  shortDiagnosisExplanation,
} from "../lib/farmCropKnowledge";

const ISSUE_TABS = [
  { id: "diseases", labelKey: "farmHealth.tabDiseases" },
  { id: "pests", labelKey: "farmHealth.tabPests" },
  { id: "weeds", labelKey: "farmHealth.tabWeeds" },
  { id: "nutrients", labelKey: "farmHealth.tabNutrients" },
];

export default function FarmHealthPage() {
  const { t, language } = useAppContext();
  const [selectedCrop, setSelectedCrop] = useState("wheat");
  const [issueTab, setIssueTab] = useState("diseases");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const knowledge = useMemo(
    () => getCropKnowledgePack(selectedCrop, language),
    [selectedCrop, language],
  );

  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return undefined;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    setResult(null);
    setError("");
    if (!selectedFile) {
      setFile(null);
      return;
    }
    if (!selectedFile.type.startsWith("image/")) {
      setFile(null);
      setError(t("farmHealth.invalidImage"));
      return;
    }
    setFile(selectedFile);
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError(t("farmHealth.uploadFirst"));
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    setError("");
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "https://krishiai-ynrm.onrender.com";
      const res = await fetch(`${apiUrl}/analyze`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.detail || t("farmHealth.failed"));
      }
      setResult(data);
    } catch (fetchError) {
      setResult(null);
      setError(fetchError.message || t("farmHealth.genericError"));
    } finally {
      setLoading(false);
    }
  };

  const diagLevel = diagnosisSummaryLevel(result);
  const summaryLevel = diagLevel || knowledge.summaryDefault.level;
  const summaryLine =
    diagLevel && result
      ? shortDiagnosisExplanation(result, language)
      : knowledge.summaryDefault.line;

  const nextSteps = useMemo(() => {
    const fromKnowledge = [...(knowledge.nextDefault || [])];
    if (!result) {
      return fromKnowledge.slice(0, 5);
    }
    const fromCare = [
      ...(Array.isArray(result.treatment) ? result.treatment.slice(0, 2) : []),
      ...(Array.isArray(result.prevention) ? result.prevention.slice(0, 1) : []),
    ].filter(Boolean);
    const merged = [...fromCare, ...fromKnowledge];
    const seen = new Set();
    const out = [];
    for (const line of merged) {
      if (!seen.has(line)) {
        seen.add(line);
        out.push(line);
      }
      if (out.length >= 5) break;
    }
    return out;
  }, [result, knowledge.nextDefault]);

  const issueItems = knowledge.issues[issueTab] || [];

  const levelUi = {
    healthy: {
      label: t("farmHealth.levelHealthy"),
      bar: "bg-emerald-500",
      ring: "border-emerald-200 bg-emerald-50/90",
    },
    needsAttention: {
      label: t("farmHealth.levelNeedsAttention"),
      bar: "bg-amber-500",
      ring: "border-amber-200 bg-amber-50/90",
    },
    highRisk: {
      label: t("farmHealth.levelHighRisk"),
      bar: "bg-red-500",
      ring: "border-red-200 bg-red-50/90",
    },
  };
  const lu = levelUi[summaryLevel] || levelUi.needsAttention;

  return (
    <div className="mx-auto w-full max-w-3xl pb-14 lg:max-w-5xl">
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1a4a38]/85">{t("farmHealth.kicker")}</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#1a4a38] sm:text-4xl">{t("farmHealth.title")}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">{t("farmHealth.subtitle")}</p>
        <p className="mt-3 rounded-2xl border border-slate-200/90 bg-white/70 px-3 py-2.5 text-xs text-slate-600 sm:text-sm">
          {t("farmHealth.advisorHint")}
        </p>
      </header>

      <div className="mb-5 flex flex-wrap gap-2">
        {[
          ["farmHealth.badgeAi", Sparkles],
          ["farmHealth.badgeProtection", Shield],
          ["farmHealth.badgeKnowledge", BookOpen],
          ["farmHealth.badgeAction", ClipboardList],
        ].map(([key, Icon]) => (
          <span
            key={key}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#b3d7af]/80 bg-[#eef7ec]/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#1a4a38] sm:px-3 sm:text-xs"
          >
            <Icon size={13} className="shrink-0 text-[#4CAF50]" aria-hidden />
            {t(key)}
          </span>
        ))}
      </div>

      {/* 1. Disease detection — upload only */}
      <section className="mb-8 rounded-[1.75rem] border border-[#d9eed4] bg-white/95 p-4 shadow-[0_14px_48px_rgba(26,74,56,0.07)] sm:p-6">
        <div className="mb-4 flex items-start gap-3">
          <div className="rounded-2xl bg-[#d9eed4] p-2.5 text-[#1a4a38]">
            <Scan size={22} aria-hidden />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">{t("farmHealth.sectionDisease")}</h2>
            <p className="text-xs text-slate-500 sm:text-sm">{t("farmHealth.sectionDiseaseHelp")}</p>
          </div>
        </div>

        <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-[#b3d7af] bg-[#eef7ec]/50 px-4 py-5 text-center transition hover:border-[#4CAF50] sm:py-6">
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          <UploadCloud className="mx-auto mb-1 text-[#1a4a38]" size={22} />
          <p className="text-sm font-semibold text-[#1a4a38]">{t("farmHealth.browse")}</p>
          <p className="mt-0.5 text-[11px] text-slate-500 sm:text-xs">{t("farmHealth.fileTypes")}</p>
        </label>

        {previewUrl && (
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 p-2">
            <img src={previewUrl} alt="" className="max-h-52 w-full rounded-lg object-contain sm:max-h-60" />
            <p className="mt-2 truncate text-xs text-slate-600">
              {t("farmHealth.selected")} {file?.name}
            </p>
          </div>
        )}

        {error && (
          <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 sm:text-sm">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleAnalyze}
          disabled={loading}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1a4a38] py-3.5 text-sm font-bold text-white transition hover:bg-[#133629] disabled:opacity-60 sm:text-base"
        >
          <Leaf size={18} aria-hidden />
          {loading ? t("farmHealth.analyzing") : t("farmHealth.analyze")}
        </button>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key="diag"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 space-y-4 rounded-2xl border border-[#b3d7af] bg-[#eef7ec]/80 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1a4a38] sm:text-xs">
                    {t("farmHealth.detected")}
                  </p>
                  <p className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">{result.disease}</p>
                  <p className="mt-1 text-xs text-slate-600">
                    {t("farmHealth.confidence")}: {(Number(result.confidence) * 100).toFixed(0)}%
                  </p>
                </div>
                <div className="rounded-xl border border-[#b3d7af] bg-white px-3 py-2 text-center shadow-sm">
                  <p className="text-[10px] font-bold uppercase text-slate-500">{t("farmHealth.aiLabel")}</p>
                  <p className="text-lg font-extrabold text-[#1a4a38]">{(Number(result.confidence) * 100).toFixed(0)}%</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-800">
                {shortDiagnosisExplanation(result, language)}
              </p>
              <details className="rounded-xl border border-white/60 bg-white/60 text-sm">
                <summary className="cursor-pointer px-3 py-2 font-semibold text-[#1a4a38]">
                  {t("farmHealth.moreDetail")}
                </summary>
                <div className="space-y-3 border-t border-slate-100 px-3 py-3 text-slate-700">
                  {Array.isArray(result.symptoms) && result.symptoms.length > 0 && (
                    <ul className="list-inside list-disc space-y-1 text-xs sm:text-sm">
                      {result.symptoms.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  )}
                  {result.weather && (
                    <p className="text-xs text-slate-600">
                      {t("farmHealth.condition")}: {result.weather}
                    </p>
                  )}
                  {result.note && (
                    <p className="flex gap-2 text-xs text-amber-900">
                      <AlertCircle className="mt-0.5 shrink-0" size={14} />
                      {result.note}
                    </p>
                  )}
                </div>
              </details>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 2. Crop list */}
      <section className="mb-8">
        <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
          <Sprout className="text-[#4CAF50]" size={20} aria-hidden />
          {t("farmHealth.sectionCrops")}
        </h2>
        <p className="mb-3 text-xs text-slate-500 sm:text-sm">{t("farmHealth.sectionCropsHelp")}</p>
        <div className="-mx-1 flex gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-thin">
          {FARM_CROP_ORDER.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setSelectedCrop(id);
                setIssueTab("diseases");
              }}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition ${
                selectedCrop === id
                  ? "border-[#1a4a38] bg-[#1a4a38] text-white shadow-md"
                  : "border-slate-200 bg-white text-slate-700 hover:border-[#4CAF50]"
              }`}
            >
              {t(`farmHealth.chip_${id}`)}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Related issues */}
      <section className="mb-8 rounded-[1.75rem] border border-slate-100 bg-white/95 p-4 shadow-sm sm:p-5">
        <h2 className="mb-1 text-base font-bold text-slate-900">{t("farmHealth.sectionIssues")}</h2>
        <p className="mb-3 text-xs text-slate-500">{t("farmHealth.sectionIssuesHelp")}</p>
        <div className="mb-3 flex gap-1.5 overflow-x-auto pb-1">
          {ISSUE_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setIssueTab(tab.id)}
              className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold sm:text-sm ${
                issueTab === tab.id ? "bg-[#eef7ec] text-[#1a4a38] ring-1 ring-[#b3d7af]" : "bg-slate-50 text-slate-600"
              }`}
            >
              {t(tab.labelKey)}
            </button>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {issueItems.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3 shadow-sm"
            >
              <p className="text-sm font-bold text-slate-900">{item.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Weed knowledge */}
      <section className="mb-8 rounded-[1.75rem] border border-teal-100 bg-gradient-to-br from-teal-50/80 to-white p-4 sm:p-5">
        <h2 className="mb-2 flex items-center gap-2 text-base font-bold text-slate-900">
          <Wind className="text-teal-600" size={20} aria-hidden />
          {t("farmHealth.sectionWeed")}
        </h2>
        <p className="mb-3 text-sm leading-relaxed text-slate-700">{knowledge.weedKnowledge.intro}</p>
        <ul className="space-y-2">
          {knowledge.weedKnowledge.tips.map((tip) => (
            <li key={tip} className="flex gap-2 text-xs text-slate-700 sm:text-sm">
              <ChevronRight className="mt-0.5 shrink-0 text-teal-500" size={16} aria-hidden />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 5. Pest knowledge */}
      <section className="mb-8">
        <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
          <Bug className="text-amber-600" size={20} aria-hidden />
          {t("farmHealth.sectionPest")}
        </h2>
        <div className="space-y-3">
          {knowledge.pestsDetail.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl border border-amber-100/80 bg-white/95 p-4 shadow-sm"
            >
              <p className="text-sm font-bold text-amber-900">{p.name}</p>
              <p className="mt-1 text-xs text-slate-700 sm:text-sm">
                <span className="font-semibold text-slate-800">{t("farmHealth.pestDamage")} </span>
                {p.damage}
              </p>
              <p className="mt-1 text-xs text-slate-600 sm:text-sm">
                <span className="font-semibold">{t("farmHealth.pestIdentify")} </span>
                {p.identify}
              </p>
              <p className="mt-1 text-xs text-slate-600 sm:text-sm">
                <span className="font-semibold">{t("farmHealth.pestControl")} </span>
                {p.control}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Crop health summary */}
      <section className={`mb-8 rounded-[1.75rem] border p-4 sm:p-5 ${lu.ring}`}>
        <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
          <Shield className="text-[#1a4a38]" size={20} aria-hidden />
          {t("farmHealth.sectionSummary")}
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-sm font-extrabold text-slate-900 shadow-sm">
            <span className={`h-2.5 w-2.5 rounded-full ${lu.bar}`} aria-hidden />
            {lu.label}
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-800">{summaryLine}</p>
        {result && (
          <p className="mt-2 text-xs text-slate-500">{t("farmHealth.summaryUsesPhoto")}</p>
        )}
      </section>

      {/* 7. Next steps */}
      <section className="rounded-[1.75rem] border border-[#d9eed4] bg-white/95 p-4 sm:p-5">
        <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
          <CheckCircle2 className="text-[#4CAF50]" size={20} aria-hidden />
          {t("farmHealth.sectionNext")}
        </h2>
        <ul className="space-y-2.5">
          {nextSteps.map((step) => (
            <li key={step} className="flex gap-2 text-sm text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4CAF50]" aria-hidden />
              {step}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-slate-500">{t("farmHealth.footerNote")}</p>
      </section>
    </div>
  );
}
