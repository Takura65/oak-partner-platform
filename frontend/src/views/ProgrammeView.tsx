import { useState } from "react";
import { Users, MapPin, FileText, Plus, Download, Image as ImageIcon } from "lucide-react";
import type { SessionNote } from "../types";
import { SCHEDULE, SESSION_NOTES, TAG_COLOR, TAKEAWAYS, RESOURCES } from "../data/mock";
import { initials } from "../utils";

type Tab = "schedule" | "docs";

const GALLERY_GRADIENTS = [
  "from-slate-700 to-slate-900",
  "from-indigo-400 to-indigo-700",
  "from-amber-200 to-amber-400",
  "from-slate-300 to-slate-500",
  "from-orange-200 to-orange-400",
  "from-sky-300 to-sky-600",
];

export default function ProgrammeView() {
  const [tab, setTab] = useState<Tab>("schedule");
  const [day, setDay] = useState<1 | 2 | 3>(1);
  const [notes, setNotes] = useState<SessionNote[]>(SESSION_NOTES);
  const [draft, setDraft] = useState("");
  const d = SCHEDULE[day];

  const addNote = () => {
    if (!draft.trim()) return;
    setNotes([{ name: "You", org: "Attendee", day: `Day ${day} · Now`, note: draft.trim() }, ...notes]);
    setDraft("");
  };

  return (
    <div className="max-w-2xl">
      <div className="font-semibold text-lg text-slate-800">Programme</div>
      <div className="text-sm text-slate-400 mb-4">OAK Partner Convening 2026</div>

      <div className="flex gap-2 mb-5">
        {(["schedule", "docs"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium ${
              tab === t ? "bg-white border border-slate-200 shadow-sm text-slate-800" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {t === "schedule" ? "Schedule" : "Docs"}
          </button>
        ))}
      </div>

      {tab === "schedule" ? (
        <>
          <div className="flex gap-2 mb-4">
            {([1, 2, 3] as const).map((n) => (
              <button
                key={n}
                onClick={() => setDay(n)}
                className={`flex-1 rounded-xl border p-3 text-left ${
                  day === n ? "bg-navy border-navy text-white" : "bg-white border-slate-200 text-slate-500"
                }`}
              >
                <div className="text-[10px] tracking-wide opacity-70">{["MON", "TUE", "WED"][n - 1]}</div>
                <div className="font-semibold">Day {n}</div>
                <div className="text-[11px] opacity-70">{SCHEDULE[n].date}</div>
              </button>
            ))}
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-navy to-navy-light p-5 text-white mb-4">
            <div className="text-[11px] flex items-center gap-1 text-white/60">
              <span>★</span> FEATURED · {d.featured.time}
            </div>
            <div className="font-semibold mt-1">{d.featured.title}</div>
            <div className="text-sm text-white/70 mt-1 flex items-center gap-1">
              <Users size={13} /> {d.featured.speaker}
            </div>
            <div className="text-sm text-white/70 flex items-center gap-1">
              <MapPin size={13} /> {d.featured.venue}
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400 mb-3 px-1">
            {Object.entries(TAG_COLOR).map(([k, v]) => (
              <span key={k} className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${v.split(" ")[0]}`} />
                {k}
              </span>
            ))}
          </div>

          <div className="space-y-2">
            {d.blocks.map((b, i) =>
              b.type === "break" ? (
                <div key={i} className="flex items-center gap-3 text-xs text-slate-400 py-1">
                  <span className="font-medium">{b.time}</span>
                  <span className="flex-1 border-t border-dashed border-slate-200" />
                  <span>{b.label}</span>
                  <span className="flex-1 border-t border-dashed border-slate-200" />
                </div>
              ) : (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-3.5 flex items-start gap-3">
                  <div className="text-xs text-slate-400 w-12 pt-0.5">
                    <div className="font-semibold text-slate-600">{b.time}</div>
                    <div>–{b.end}</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-800">{b.title}</div>
                    {b.speaker && <div className="text-xs text-slate-400 mt-0.5">{b.speaker}</div>}
                    <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin size={11} /> {b.venue}
                    </div>
                  </div>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full whitespace-nowrap ${TAG_COLOR[b.tag]}`}>● {b.tag}</span>
                </div>
              )
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium text-slate-700 flex items-center gap-1.5">
              <FileText size={15} /> Session Notes
            </div>
            <button onClick={addNote} className="text-xs bg-navy text-white rounded-lg px-3 py-1.5 flex items-center gap-1">
              <Plus size={13} /> Add Note
            </button>
          </div>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addNote()}
            placeholder="Jot down a session note…"
            className="w-full mb-3 border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
          <div className="space-y-2 mb-6">
            {notes.map((n, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-navy text-white flex items-center justify-center text-[10px] font-medium">
                      {initials(n.name)}
                    </div>
                    <div>
                      <span className="text-sm font-medium text-slate-700">{n.name}</span>
                      <span className="text-xs text-slate-400"> · {n.org}</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-300">{n.day}</span>
                </div>
                <div className="text-sm text-slate-500 mt-2">{n.note}</div>
              </div>
            ))}
          </div>

          <div className="font-medium text-slate-700 flex items-center gap-1.5 mb-2">
            <ImageIcon size={15} /> Photo Gallery
          </div>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {GALLERY_GRADIENTS.map((g, i) => (
              <div key={i} className={`aspect-square rounded-lg bg-gradient-to-br ${g}`} />
            ))}
          </div>

          <div className="font-medium text-slate-700 mb-2">📍 Key Takeaways</div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 space-y-2.5">
            {TAKEAWAYS.map((t, i) => (
              <div key={i} className="flex gap-2.5 text-sm text-slate-600">
                <span className="w-4 h-4 rounded-full bg-navy text-white text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {t}
              </div>
            ))}
          </div>

          <div className="font-medium text-slate-700 mb-2">Resources</div>
          <div className="space-y-2">
            {RESOURCES.map((r) => (
              <div key={r.name} className="bg-white rounded-xl border border-slate-200 p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                    <FileText size={15} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-700">{r.name}</div>
                    <div className="text-[11px] text-slate-400">{r.meta}</div>
                  </div>
                </div>
                <Download size={15} className="text-slate-300" />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
