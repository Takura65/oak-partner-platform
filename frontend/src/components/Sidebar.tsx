import { UserPlus, ScanLine, Calendar, Globe, LayoutGrid } from "lucide-react";
import type { NavId } from "../types";
import { NAV } from "../data/mock";

const ICONS: Record<NavId, typeof UserPlus> = {
  register: UserPlus,
  checkin: ScanLine,
  programme: Calendar,
  partners: Globe,
  attendance: LayoutGrid,
};


interface SidebarProps {
  active: NavId;
  setActive: (id: NavId) => void;
  registered: boolean;
}

export default function Sidebar({ active, setActive, registered }: SidebarProps) {
  return (
    <div className="w-60 shrink-0 border-r border-slate-200 bg-white flex flex-col h-full">
      <div className="px-6 pt-6 pb-5 border-b border-slate-100">
        <div className="text-navy font-serif text-xl tracking-tight leading-none">OAK</div>
        <div className="text-[9px] tracking-[0.2em] text-slate-400 mt-0.5">FOUNDATION</div>
        <div className="text-[11px] font-medium text-slate-500 mt-3">PARTNER CONVENING 2026</div>
      </div>
      <nav className="flex-1 py-3 px-3 space-y-0.5">
        {NAV.filter((n) => (registered ? n.id !== "register" : n.id === "register")).map((n) => {
          const Icon = ICONS[n.id];
          const isActive = active === n.id;
          return (
            <button
              key={n.id}
              onClick={() => setActive(n.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive ? "bg-navy text-white" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`}
            >
              <Icon size={16} strokeWidth={2} />
              {n.label}
            </button>
          );
        })}
      </nav>
      <div className="px-4 py-4 border-t border-slate-100 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
          <Globe size={13} className="text-slate-400" />
        </div>
        <div className="leading-tight">
          <div className="text-xs font-medium text-slate-700">Harare, Zimbabwe</div>
          <div className="text-[11px] text-slate-400">9–11 March 2026</div>
        </div>
      </div>
    </div>
  );
}



