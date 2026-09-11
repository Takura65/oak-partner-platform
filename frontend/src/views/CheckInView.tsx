import { useEffect, useRef, useState } from "react";
import { Check, X, RefreshCw, Phone } from "lucide-react";
import QrScanner from "qr-scanner";
import type { AttendeeMap, ScanPerson } from "../types";
import { ROLE_STYLE, SCAN_QUEUE, TOTAL_EXPECTED } from "../data/mock";
import { initials } from "../utils";

type Screen = "scan" | "success" | "fail";

interface CheckInViewProps {
  attendees: AttendeeMap;
  checkIn: (person: ScanPerson) => void;
  checkedInCount: number;
}

export default function CheckInView({ attendees, checkIn, checkedInCount }: CheckInViewProps) {
  const [screen, setScreen] = useState<Screen>("scan");
  const [current, setCurrent] = useState<ScanPerson | null>(null);
  const [manual, setManual] = useState("");
  const [cameraError, setCameraError] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);

  const doScan = (person: ScanPerson) => {
    scannerRef.current?.stop();
    checkIn(person);
    setCurrent(person);
    setScreen("success");
  };

  const doManual = () => {
    const found = SCAN_QUEUE.find((p) => p.id.toLowerCase() === manual.trim().toLowerCase());
    if (found) doScan(found);
    else setScreen("fail");
  };

  useEffect(() => {
    if (screen !== "scan" || !videoRef.current) return;

    const scanner = new QrScanner(
      videoRef.current,
      (result) => {
        const code = typeof result === "string" ? result : result.data;
        const found = SCAN_QUEUE.find((person) => person.id.toLowerCase() === code.trim().toLowerCase());
        if (found) doScan(found);
        else setScreen("fail");
      },
      { highlightScanRegion: false, highlightCodeOutline: false },
    );

    scannerRef.current = scanner;
    scanner.start().catch(() => {
      setCameraError("Camera access is unavailable. Use manual code entry below.");
    });

    return () => {
      scanner.stop();
      scanner.destroy();
      scannerRef.current = null;
    };
  }, [screen]);

  if (screen === "fail") {
    return (
      <div className="max-w-xl mx-auto">
        <div className="rounded-2xl bg-gradient-to-br from-rose-500 to-rose-400 p-5 text-white relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/10" />
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mb-2">
            <X size={18} />
          </div>
          <div className="text-[11px] tracking-wide text-white/70">CHECK-IN FAILED</div>
          <div className="text-lg font-semibold">QR Not Recognised</div>
          <div className="text-sm text-white/80">Code is invalid or unregistered</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 mt-4 p-5">
          <div className="text-sm font-medium text-slate-700 mb-2">⚠ Possible reasons</div>
          <ul className="space-y-1.5 text-sm text-slate-500">
            {[
              "QR code belongs to a different event",
              "Registration was not completed",
              "Code has been altered or corrupted",
              "Attendee registered under a different email",
            ].map((r) => (
              <li key={r} className="flex gap-2">
                <span className="text-rose-300">•</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => {
            setScreen("scan");
            setManual("");
          }}
          className="w-full mt-4 bg-navy text-white rounded-xl py-3 text-sm font-medium flex items-center justify-center gap-2 hover:bg-navy-light"
        >
          <RefreshCw size={15} /> Try Again
        </button>
        <button className="w-full mt-2 bg-white border border-slate-200 rounded-xl py-3 text-sm font-medium text-slate-600 flex items-center justify-center gap-2">
          <Phone size={15} /> Contact Coordination Team
        </button>
      </div>
    );
  }

  if (screen === "success" && current) {
    const pct = Math.round((checkedInCount / TOTAL_EXPECTED) * 100);
    return (
      <div className="max-w-xl mx-auto">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-400 p-5 text-white relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/10" />
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mb-2">
            <Check size={18} />
          </div>
          <div className="font-semibold">Checked In Successfully</div>
          <div className="text-sm text-white/80">
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} · 9 November 2026
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 mt-4 p-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-navy text-white flex items-center justify-center text-sm font-medium">
              {initials(current.name)}
            </div>
            <div>
              <div className="font-semibold text-slate-800">{current.name}</div>
              <div className="text-sm text-slate-400">{current.org}</div>
              <span className={`inline-block mt-1 text-[11px] px-2 py-0.5 rounded-full ${ROLE_STYLE[current.role]}`}>
                ● {current.role}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="text-[11px] text-slate-400">NEXT SESSION</div>
              <div className="text-sm font-medium text-slate-700">{current.session}</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="text-[11px] text-slate-400">VENUE</div>
              <div className="text-sm font-medium text-slate-700">{current.venue}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 mt-4 p-5">
          <div className="text-[11px] tracking-wide text-slate-400 mb-2">LIVE EVENT STATUS</div>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Opening Plenary starting at 09:30
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {checkedInCount} of {TOTAL_EXPECTED} attendees checked in · Main Hall A
          </div>
          <div className="h-1.5 rounded-full bg-slate-100 mt-2 overflow-hidden">
            <div className="h-full bg-navy" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <button onClick={() => setScreen("scan")} className="w-full mt-4 bg-navy text-white rounded-xl py-3 text-sm font-medium hover:bg-navy-light">
          Scan Next Attendee
        </button>
      </div>
    );
  }

  const remaining = SCAN_QUEUE.filter((p) => !attendees[p.id]?.checkedIn);

  return (
    <div className="max-w-xl mx-auto">
      <div className="font-semibold text-lg text-slate-800">Event Check-In</div>
      <div className="text-sm text-slate-400 mb-4">Scan an attendee QR code to check them in</div>

      <div className="bg-[#0c1730] rounded-2xl overflow-hidden h-56 relative flex items-center justify-center">
        <video ref={videoRef} className="w-56 h-44 object-cover rounded-xl" muted playsInline />
        <div className="absolute inset-x-0 bottom-3 text-center text-white/70 text-xs">
          Position QR code inside the camera area
        </div>
        <div className="absolute bottom-3 left-4 text-white/25 text-[11px] flex items-center gap-1.5">
          <RefreshCw size={12} /> Hold camera steady · Auto-scans in 1–2 seconds
        </div>
      </div>

      {cameraError && <div className="text-sm text-amber-600 mt-2 px-1">{cameraError}</div>}

      <div className="bg-white rounded-2xl border border-slate-200 mt-4 p-4">
        <div className="text-[11px] tracking-wide text-slate-400 mb-2 px-1">SIMULATE QR SCAN</div>
        <div className="space-y-1">
          {remaining.length === 0 && <div className="text-sm text-slate-400 px-2 py-3">All sample attendees checked in.</div>}
          {remaining.map((p) => (
            <button
              key={p.id}
              onClick={() => doScan(p)}
              className="w-full flex items-center justify-between px-2 py-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center text-xs font-medium">
                  {initials(p.name)}
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-slate-700">{p.name}</div>
                  <div className="text-[11px] text-slate-400">{p.id}</div>
                </div>
              </div>
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${ROLE_STYLE[p.role]}`}>● {p.role}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 mt-4 p-4">
        <div className="text-[11px] tracking-wide text-slate-400 mb-2 px-1">MANUAL CODE ENTRY</div>
        <div className="flex gap-2">
          <input
            value={manual}
            onChange={(e) => setManual(e.target.value)}
            placeholder="OAK-2026-XXXX-XXXX"
            className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-navy/20 placeholder:text-slate-300"
          />
          <button onClick={doManual} className="bg-navy text-white rounded-lg px-4 text-sm font-medium hover:bg-navy-light">
            Check
          </button>
        </div>
      </div>
    </div>
  );
}
