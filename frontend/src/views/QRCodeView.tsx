import { Download } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import type { RegistrationForm } from "../types";
import type { RegistrationRecord } from "../types";

interface QRCodeViewProps {
  registration: RegistrationForm;
  record: RegistrationRecord;
}

export default function QRCodeView({ registration, record }: QRCodeViewProps) {
  const fullName = `${registration.first} ${registration.last}`.trim();
  const registrationId = record.registrationId;

  return (
    <div className="max-w-xl mx-auto">
      <div className="rounded-2xl bg-gradient-to-br from-navy to-navy-light p-6 text-white">
        <div className="text-[11px] tracking-wide text-white/60">PARTNER QR CODE</div>
        <div className="text-xl font-semibold mt-1">Your event entry pass</div>
        <div className="text-sm text-white/70 mt-1">OAK Foundation Event · 9–11 November 2026</div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 mt-4 p-6 flex flex-col items-center">
        <div className="text-sm font-semibold text-slate-800">{fullName}</div>
        <div className="text-xs text-slate-400 mt-1">{registration.org}</div>
        <div className="p-3 border border-slate-200 rounded-xl mt-5">
          <QRCodeSVG value={record.qrCodeId ?? record.registrationId} size={180} bgColor="#ffffff" fgColor="#0f1e3d" />
        </div>
        <div className="text-xs text-slate-500 font-medium mt-3">{registrationId}</div>
        <div className="text-xs text-slate-400 mt-1">Present this code at event entry</div>
      </div>

      <button className="w-full mt-4 bg-navy text-white rounded-xl py-3 text-sm font-medium flex items-center justify-center gap-2 hover:bg-navy-light">
        <Download size={15} /> Download QR Code
      </button>
    </div>
  );
}