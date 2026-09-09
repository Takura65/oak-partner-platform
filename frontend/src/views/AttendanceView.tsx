import { Users, ScanLine, Clock } from "lucide-react";
import type { AttendeeMap, NavId } from "../types";
import { TOTAL_EXPECTED } from "../data/mock";
import { initials } from "../utils";

interface AttendanceViewProps {
  attendees: AttendeeMap;
  checkedInCount: number;
  setActive: (id: NavId) => void;
}

export default function AttendanceView({ attendees, checkedInCount, setActive }: AttendanceViewProps) {
  const list = Object.values(attendees).filter((a) => a.checkedIn);

  return (
    <div className="max-w-xl mx-auto">
      <div className="font-semibold text-lg text-slate-800">Attendance</div>
      <div className="text-sm text-slate-400 mb-4">Check-in tracking · 9–11 March 2026</div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        {list.length === 0 ? (
          <div className="flex flex-col items-center text-center py-4">
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-3">
              <Users size={20} className="text-slate-300" />
            </div>
            <div className="font-semibold text-slate-700">No check-ins yet</div>
            <div className="text-sm text-slate-400 mt-1 max-w-xs">
              Attendees will appear here once they have been scanned in at the event entrance.
            </div>
            <button
              onClick={() => setActive("checkin")}
              className="mt-4 bg-navy text-white rounded-xl px-5 py-2.5 text-sm font-medium flex items-center gap-2 hover:bg-navy-light"
            >
              <ScanLine size={15} /> Go to Check-In Scanner
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {list.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center text-xs font-medium">
                    {initials(p.name)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-700">{p.name}</div>
                    <div className="text-xs text-slate-400">{p.org}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-emerald-600">
                  <Clock size={12} /> {p.time}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 mt-4 p-5">
        <div className="text-[11px] tracking-wide text-slate-400 mb-3">EVENT OVERVIEW</div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-slate-50 rounded-xl py-3">
            <div className="text-xl font-semibold text-slate-800">{TOTAL_EXPECTED}</div>
            <div className="text-[11px] text-slate-400">Expected</div>
          </div>
          <div className="bg-slate-50 rounded-xl py-3">
            <div className="text-xl font-semibold text-slate-800">{checkedInCount}</div>
            <div className="text-[11px] text-slate-400">Checked In</div>
          </div>
          <div className="bg-slate-50 rounded-xl py-3">
            <div className="text-xl font-semibold text-slate-800">{TOTAL_EXPECTED - checkedInCount}</div>
            <div className="text-[11px] text-slate-400">Pending</div>
          </div>
        </div>
      </div>
    </div>
  );
}
