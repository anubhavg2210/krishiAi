import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Leaf, ShieldCheck, UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

function DetailList({ title, items, accentClass }) {
  if (!items?.length) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <h4 className={`mb-3 text-sm font-bold uppercase tracking-[0.18em] ${accentClass}`}>{title}</h4>
      <div className="space-y-2">
        {items.map((item) => (
          <p key={item} className="text-sm leading-6 text-slate-700">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function DiseasePage() {
  const { t } = useAppContext();
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      setError(t("disease.invalidImage"));
      return;
    }

    setFile(selectedFile);
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError(t("disease.uploadFirst"));
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
        throw new Error(data?.detail || t("disease.failed"));
      }

      setResult(data);
    } catch (fetchError) {
      setResult(null);
      setError(fetchError.message || t("disease.genericError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl pb-12">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#1a4a38]">{t("disease.title")}</h1>
        <p className="mt-2 max-w-3xl text-lg text-slate-500">
          {t("disease.subtitle")}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[2rem] border border-[#d9eed4] bg-white/90 p-6 shadow-[0_18px_60px_rgba(26,74,56,0.08)] backdrop-blur">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-2xl bg-[#d9eed4] p-3 text-[#1a4a38]">
              <UploadCloud size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{t("disease.uploadTitle")}</h2>
              <p className="text-sm text-slate-500">{t("disease.uploadHelp")}</p>
            </div>
          </div>

          <label className="block cursor-pointer rounded-[1.75rem] border-2 border-dashed border-[#b3d7af] bg-[#eef7ec]/60 p-6 text-center transition hover:border-[#4CAF50] hover:bg-[#eef7ec]">
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            <p className="text-sm font-semibold text-[#1a4a38]">{t("disease.browse")}</p>
            <p className="mt-1 text-xs text-slate-500">{t("disease.fileTypes")}</p>
          </label>

          {previewUrl && (
            <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-slate-100 bg-slate-50 p-3">
              <img
                src={previewUrl}
                alt="Selected crop"
                className="h-72 w-full rounded-[1rem] object-cover"
              />
              <p className="mt-3 text-sm font-medium text-slate-600">{t("disease.selected")} {file?.name}</p>
            </div>
          )}

          {error && (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1a4a38] px-4 py-4 text-base font-bold text-white transition hover:bg-[#133629] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Leaf size={18} />
            {loading ? t("disease.analyzing") : t("disease.analyze")}
          </button>
        </section>

        <section className="rounded-[2rem] border border-[#d9eed4] bg-white/90 p-6 shadow-[0_18px_60px_rgba(26,74,56,0.08)] backdrop-blur">
          {!result ? (
            <div className="flex h-full min-h-[28rem] flex-col items-center justify-center rounded-[1.75rem] border border-[#d9eed4] bg-[#eef7ec]/50 px-6 text-center">
              <div className="rounded-full bg-[#d9eed4] p-4 text-[#1a4a38]">
                <ShieldCheck size={28} />
              </div>
              <h3 className="mt-4 text-2xl font-bold text-slate-900">{t("disease.resultTitle")}</h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                {t("disease.resultHelp")}
              </p>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              <div className="rounded-[1.75rem] border border-[#b3d7af] bg-[#eef7ec] p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1a4a38]">{t("disease.detected")}</p>
                    <h2 className="mt-2 text-3xl font-extrabold text-slate-900">{result.disease}</h2>
                    <p className="mt-2 text-sm text-slate-600">{t("disease.crop")}: {result.crop || t("disease.generalCrop")}</p>
                  </div>

                  <div className="rounded-2xl border border-[#b3d7af] bg-white px-4 py-3 text-center shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{t("disease.confidence")}</p>
                    <p className="mt-1 text-2xl font-extrabold text-[#1a4a38]">
                      {(result.confidence * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                  <div className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-slate-600">
                    <CheckCircle2 size={16} className="text-[#4CAF50]" />
                    {t("disease.weatherContext")}
                  </div>
                  <p className="text-sm text-slate-700">{t("disease.condition")}: {result.weather}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{result.weatherNote}</p>
                </div>

                <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-4 shadow-sm">
                  <div className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-amber-700">
                    <AlertCircle size={16} />
                    {t("disease.note")}
                  </div>
                  <p className="text-sm leading-6 text-slate-700">{result.note}</p>
                </div>
              </div>

              <DetailList title={t("disease.symptoms")} items={result.symptoms} accentClass="text-slate-600" />
              <DetailList title={t("disease.treatment")} items={result.treatment} accentClass="text-[#1a4a38]" />
              <DetailList title={t("disease.prevention")} items={result.prevention} accentClass="text-blue-700" />
            </motion.div>
          )}
        </section>
      </div>
    </div>
  );
}
