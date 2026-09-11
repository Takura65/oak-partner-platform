import { useState } from "react";
import { ArrowLeft, Download, Globe, ExternalLink, Mail, Search } from "lucide-react";
import type { Partner } from "../types";
import { PARTNERS } from "../data/mock";
import { initials } from "../utils";
import QRPattern from "../components/QRPattern";

function partnerQrSeed(partner: Partner) {
  return [...`${partner.code}-${partner.contact}`].reduce((seed, character) => seed + character.charCodeAt(0), 0);
}

export default function PartnersView() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Partner | null>(null);

  if (selected) {
    const p = selected;
    return (
      <div className="max-w-xl mx-auto">
        <button onClick={() => setSelected(null)} className="flex items-center gap-1.5 text-sm text-navy font-medium mb-4">
          <ArrowLeft size={15} /> Partner Directory
        </button>
        <div className="rounded-2xl bg-gradient-to-br from-navy to-navy-light p-5 text-white relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/5" />
          <div className="w-11 h-11 rounded-lg bg-white/15 flex items-center justify-center text-sm font-semibold mb-3">
            {p.code}
          </div>
          <div className="text-[11px] text-white/60">FOUNDATION · PARTNER SINCE {p.since}</div>
          <div className="text-lg font-semibold">{p.name}</div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {p.tags.map((t) => (
              <span key={t} className="text-[11px] bg-white/10 px-2 py-0.5 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 mt-4 p-5">
          <div className="text-[11px] tracking-wide text-slate-400 mb-2">ABOUT</div>
          <div className="text-sm text-slate-600 leading-relaxed">{p.about}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 mt-4 p-5">
          <div className="text-[11px] tracking-wide text-slate-400 mb-2">CONTACT AT CONVENING</div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center text-xs font-medium">
              {initials(p.contact)}
            </div>
            <div>
              <div className="text-sm font-medium text-slate-700">{p.contact}</div>
              <div className="text-xs text-slate-400">{p.email}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 mt-4 p-6 flex flex-col items-center">
          <div className="text-[11px] tracking-wide text-slate-400 mb-3">PARTNER ENTRY PASS</div>
          <div className="p-3 border border-slate-200 rounded-xl">
            <QRPattern seed={partnerQrSeed(p)} />
          </div>
          <div className="text-xs text-slate-500 font-medium mt-3">OAK-2026-{p.code}</div>
          <div className="text-xs text-slate-400 mt-1">Present at event entrance for check-in</div>
        </div>

        <button className="w-full mt-4 bg-navy text-white rounded-xl py-3 text-sm font-medium flex items-center justify-center gap-2 hover:bg-navy-light">
          <Download size={15} /> Download QR Code
        </button>

        <button className="w-full mt-4 bg-navy text-white rounded-xl py-3 text-sm font-medium flex items-center justify-between px-5 hover:bg-navy-light">
          <span className="flex items-center gap-2">
            <Globe size={15} /> Visit Website
          </span>
          <ExternalLink size={14} />
        </button>
        <button className="w-full mt-2 bg-white border border-slate-200 rounded-xl py-3 text-sm font-medium text-slate-600 flex items-center justify-between px-5">
          <span className="flex items-center gap-2">
            <Mail size={15} /> Send Message
          </span>
          <span>›</span>
        </button>
      </div>
    );
  }

  const filtered = PARTNERS.filter((p) => (p.name + p.tags.join(" ")).toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="max-w-xl mx-auto">
      <div className="font-semibold text-lg text-slate-800">Partner Directory</div>
      <div className="text-sm text-slate-400 mb-4">8 partner organisations</div>

      <div className="relative mb-4">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search organisations, focus areas…"
          className="w-full border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy/20"
        />
      </div>

      <div className="space-y-2">
        {filtered.map((p) => (
          <button
            key={p.code}
            onClick={() => setSelected(p)}
            className="w-full bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3 text-left hover:border-slate-300 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-navy text-white flex items-center justify-center text-xs font-semibold shrink-0">
              {p.code}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-slate-800">{p.name}</div>
              <div className="text-xs text-slate-400">{p.region}</div>
              <div className="flex gap-1.5 mt-1 flex-wrap">
                {p.tags.slice(0, 2).map((t) => (
                  <span key={t} className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <span className="text-slate-300"></span>
          </button>
        ))}
      </div>
    </div>
  );
}
