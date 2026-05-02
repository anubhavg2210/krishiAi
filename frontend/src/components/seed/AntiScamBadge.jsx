import { ShieldCheck, AlertTriangle } from "lucide-react";

export default function AntiScamBadge() {
  return (
    <div className="mt-4 rounded-xl bg-blue-50/50 p-4 border border-blue-100">
      <div className="flex items-start gap-3">
        <div className="rounded-full bg-blue-100 p-2 text-blue-600 mt-0.5">
          <ShieldCheck size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            Verified Source
            <span className="bg-green-100 text-green-700 text-[10px] uppercase px-2 py-0.5 rounded-full tracking-wider font-bold">
              ICAR Data
            </span>
          </h4>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            This recommendation uses government agricultural data (ICAR) and market trends to guide farmers.
          </p>
        </div>
      </div>
    </div>
  );
}
