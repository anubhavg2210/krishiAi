import { ShieldCheck } from "lucide-react";

export default function AntiScamBadge({ t = (key) => key }) {
  return (
    <div className="mt-4 rounded-xl bg-blue-50/50 p-4 border border-blue-100">
      <div className="flex items-start gap-3">
        <div className="rounded-full bg-blue-100 p-2 text-blue-600 mt-0.5">
          <ShieldCheck size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            {t("seedAdvisor.verified")}
            <span className="bg-green-100 text-green-700 text-[10px] uppercase px-2 py-0.5 rounded-full tracking-wider font-bold">
              {t("seedAdvisor.icar")}
            </span>
          </h4>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            {t("seedAdvisor.verifiedBody")}
          </p>
        </div>
      </div>
    </div>
  );
}
