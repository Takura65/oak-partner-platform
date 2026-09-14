import { useRef } from "react";
import { CheckCircle2, Download } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import type { RegistrationForm, RegistrationRecord } from "../types";

interface QRCodeViewProps {
  registration: RegistrationForm;
  record: RegistrationRecord;
}

export default function QRCodeView({ registration, record }: QRCodeViewProps) {
  const fullName = `${registration.first} ${registration.last}`.trim();
  const registrationId = record.registrationId;
  const qrRef = useRef<SVGSVGElement>(null);

  const downloadQr = () => {
    if (!qrRef.current) return;
    const svg = new XMLSerializer().serializeToString(qrRef.current);
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${registrationId}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-xl mx-auto pb-4">
      <div className="rounded-2xl bg-gradient-to-br from-navy to-navy-light p-5 text-white relative overflow-hidden shadow-sm">
        <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/5" />
        <div className="absolute right-5 -top-5 w-20 h-20 rounded-full bg-white/[0.03]" />
        <div className="relative flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
            <CheckCircle2 size={19} />
          </div>
          <div>
            <div className="text-[10px] tracking-[0.14em] text-white/60">REGISTRATION COMPLETE</div>
            <div className="text-xl font-semibold leading-tight mt-1">You're registered, {registration.first || "there"}!</div>
            <div className="text-sm text-white/60 mt-1">{registration.org || "your organisation"}</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 mt-3 p-5 flex flex-col items-center shadow-sm">
        <div className="text-[10px] tracking-[0.14em] text-slate-400 mb-3">YOUR ENTRY PASS</div>
        <div className="p-3 bg-slate-50 rounded-xl">
          <QRCodeSVG
            ref={qrRef}
            value={record.qrCodeId ?? record.registrationId}
            size={180}
            bgColor="#ffffff"
            fgColor="#0f1e3d"
            level="H"
          />
        </div>
        <div className="text-[10px] tracking-[0.16em] text-slate-400 mt-3">{registrationId}</div>
        <div className="text-[11px] text-slate-400 mt-1">Present at event entrance for check-in</div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 mt-3 p-5 shadow-sm">
        <div className="text-[10px] tracking-[0.14em] text-slate-400 mb-2">REGISTRATION DETAILS</div>
        {[
          ["Name", fullName],
          ["Organisation", registration.org],
          ["Role", registration.role],
          ["Email", registration.email],
          ["Event Dates", "9–11 November 2026"],
          ["Location", "Harare, Zimbabwe"],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4 py-2 border-b border-slate-100 last:border-0 text-xs">
            <span className="text-slate-400">{label}</span>
            <span className="text-slate-700 font-medium text-right truncate">{value || "—"}</span>
          </div>
        ))}
      </div>

      <button
        onClick={downloadQr}
        className="w-full mt-3 bg-navy text-white rounded-xl py-3 text-sm font-medium flex items-center justify-center gap-2 hover:bg-navy-light shadow-sm"
      >
        <Download size={15} /> Download QR Code
      </button>
      <div className="text-center text-xs text-slate-400 mt-2">Your QR code is ready to use at the event entrance.</div>
    </div>
  );
}