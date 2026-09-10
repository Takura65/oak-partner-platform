import type { DaySchedule, Partner, Resource, ScanPerson, SessionNote } from "../types";

export const TOTAL_EXPECTED = 110;

export const SCAN_QUEUE: ScanPerson[] = [
  { id: "OAK-2026-7842-XKPH", name: "Maria Schmidt", org: "Open Society Foundations", role: "Partner", session: "Opening Plenary", venue: "Main Hall A" },
  { id: "OAK-2026-1193-JMQA", name: "James Odhiambo", org: "OAK Foundation", role: "OAK Staff", session: "Opening Plenary", venue: "Main Hall A" },
  { id: "OAK-2026-3310-KDGE", name: "Awa Diallo", org: "Coordination Team", role: "Coordination Team", session: "Opening Plenary", venue: "Main Hall A" },
  { id: "OAK-2026-5592-FWBN", name: "Fatima Z. Benali", org: "MENA Rights Group", role: "Partner", session: "Partner Spotlight", venue: "Main Hall A" },
];

export const ROLE_STYLE: Record<string, string> = {
  Partner: "bg-slate-100 text-slate-700",
  "OAK Staff": "bg-emerald-50 text-emerald-700",
  "Coordination Team": "bg-amber-50 text-amber-700",
};

export const PARTNERS: Partner[] = [
  { code: "OSF", name: "Open Society Foundations", region: "Global", tags: ["Foundation", "Democracy", "Human Rights"], since: 2018, site: "opensocietyfoundations.org", contact: "Maria Schmidt", email: "m.schmidt@osf.org", about: "Open Society Foundations builds vibrant and tolerant democracies. OAK partnership covers digital rights and justice initiatives across Eastern Europe and Central Asia." },
  { code: "ACA", name: "Africa Climate Alliance", region: "Sub-Saharan Africa", tags: ["NGO", "Climate Justice", "Youth Advocacy"], since: 2022, site: "africaclimatealliance.org", contact: "Samuel Okafor", email: "s.okafor@africaclimatealliance.org", about: "Africa Climate Alliance mobilises youth-led climate justice movements. OAK partnership funds grassroots advocacy and policy capacity across the region." },
  { code: "NEC", name: "Nordic Evaluation Centre", region: "Northern Europe", tags: ["Research", "Evaluation", "Learning"], since: 2021, site: "nordicevaluation.org", contact: "Dr. Ingrid Holm", email: "i.holm@nordicevaluation.org", about: "Nordic Evaluation Centre builds shared measurement tools for long-term philanthropy. OAK partnership focuses on outcome tracking across the portfolio." },
  { code: "MRG", name: "MENA Rights Group", region: "Middle East & North Africa", tags: ["NGO", "Human Rights", "Documentation"], since: 2019, site: "menarights.org", contact: "Fatima Z. Benali", email: "f.benali@menarights.org", about: "MENA Rights Group documents and litigates human rights violations. OAK partnership supports rights-based programming and legal advocacy." },
  { code: "DFI", name: "Digital Frontiers Institute", region: "Global / East Africa", tags: ["Research", "Digital Rights", "Invested Founders"], since: 2020, site: "digitalfrontiers.org", contact: "Li Wei", email: "l.wei@digitalfrontiers.org", about: "Digital Frontiers Institute researches digital rights in restricted environments. OAK partnership backs open internet tools and secure messaging access." },
  { code: "GAL", name: "Global Advocacy Lab", region: "Global", tags: ["NGO", "Communications", "Campaigns"], since: 2023, site: "globaladvocacylab.org", contact: "Awa Diallo", email: "a.diallo@globaladvocacylab.org", about: "Global Advocacy Lab designs cross-border campaign strategy. OAK partnership strengthens shared communications infrastructure across the portfolio." },
  { code: "SP", name: "Sciences Po Paris", region: "Western Europe", tags: ["Academic", "Research", "Policy"], since: 2020, site: "sciencespo.fr", contact: "Prof. Amara Diallo", email: "a.diallo@sciencespo.fr", about: "Sciences Po Paris advances applied policy research. OAK partnership funds long-horizon philanthropy studies and fellow placements." },
  { code: "EFG", name: "Environmental Funders Group", region: "Global", tags: ["Network", "Environment", "Climate"], since: 2017, site: "envfunders.org", contact: "Jonas Weber", email: "j.weber@envfunders.org", about: "Environmental Funders Group coordinates pooled climate funding. OAK partnership aligns shared learning infrastructure across environmental grantees." },
];

export const SESSION_NOTES: SessionNote[] = [
  { name: "Maria Schmidt", org: "Open Society Foundations", day: "Day 1 · 09:40", note: "The rights-based approaches session surfaced strong interest in a shared learning platform. OSF will follow up with MENA Rights Group on joint programming opportunities in the Mediterranean region." },
  { name: "James Odhiambo", org: "OAK Foundation", day: "Day 1 · 11:15", note: "Digital Rights breakout: participants want a working group to share tools for operating in restricted digital environments. Interested orgs: Digital Frontiers, Access Now, EFF." },
  { name: "Awa Diallo", org: "Coordination Team", day: "Day 1 · 15:20", note: "Strategic communications workshop well rated. Rashitka's adaptive messaging framework is directly applicable across the portfolio. Requesting follow-up toolkit." },
  { name: "Prof. Amara Diallo", org: "Sciences Po Paris", day: "Day 1 · 17:05", note: "Plenary Q&A raised consensus: philanthropy needs to accept longer time horizons (10+ years) and better share learning. Key ask: OAK to publish failure cases alongside successes." },
];

export const TAKEAWAYS: string[] = [
  "Philanthropy needs to accept 10+ year time horizons for systemic change",
  "Shared learning infrastructure is the most requested resource across the portfolio",
  "Digital rights must be integrated into all programme areas, not siloed",
  "Rights-based framing significantly improves grantee advocacy effectiveness",
  "Peer-led sessions are rated much higher than expert-led sessions (90% vs 70%)",
];

export const RESOURCES: Resource[] = [
  { name: "Opening Plenary Presentation", meta: "PDF · 2.7MB · Day 1" },
  { name: "OAK Portfolio Overview 2024–26", meta: "PDF · 5.9MB · Shared" },
  { name: "Action Planning Workbook", meta: "DOCX · 480KB · Day 3" },
  { name: "Partner Contact Directory", meta: "XLSX · 210KB · Shared" },
  { name: "Photo Gallery (High Res)", meta: "ZIP · 158MB · Rolling" },
];

export const SCHEDULE: Record<number, DaySchedule> = {
  1: {
    date: "9 Mar",
    featured: { title: "Opening Plenary: Pathways to Impact", time: "09:00 – 10:30", speaker: "Dr. Helena Moreau · OAK Foundation", venue: "Main Hall A" },
    blocks: [
      { type: "break", label: "Registration & Welcome Coffee", time: "08:00" },
      { type: "break", label: "Coffee Break", time: "10:30" },
      { type: "session", time: "10:50", end: "12:00", title: "Thematic Dialogue: Climate Justice & Grantmaking", tag: "Breakout", speaker: "Samuel Okafor · Africa Climate Alliance", venue: "Conference Room B2" },
      { type: "session", time: "10:50", end: "12:00", title: "Workshop: Measuring Long-term Change", tag: "Workshop", speaker: "Dr. Ingrid Holm · Nordic Evaluation Centre", venue: "Workshop Room C" },
      { type: "break", label: "Networking Lunch", time: "12:00" },
      { type: "session", time: "13:30", end: "14:30", title: "Partner Spotlight: Rights-Based Approaches", tag: "Plenary", speaker: "Fatima Zahra Benali · MENA Rights Group", venue: "Main Hall A" },
      { type: "session", time: "14:45", end: "16:00", title: "Digital Rights in Authoritarian Contexts", tag: "Breakout", speaker: "Li Wei · Digital Frontiers Institute", venue: "Conference Room B1" },
      { type: "session", time: "18:00", end: "20:00", title: "Welcome Reception & Dinner", tag: "Social", speaker: "", venue: "Rooftop Terrace" },
    ],
  },
  2: {
    date: "10 Mar",
    featured: { title: "Panel: Strategic Communications for Grantees", time: "09:00 – 10:15", speaker: "Rashitka Nair · OAK Foundation", venue: "Main Hall A" },
    blocks: [
      { type: "break", label: "Coffee Break", time: "10:15" },
      { type: "session", time: "10:30", end: "12:00", title: "Workshop: Adaptive Messaging Frameworks", tag: "Workshop", speaker: "Rashitka Nair · OAK Foundation", venue: "Workshop Room C" },
      { type: "break", label: "Networking Lunch", time: "12:30" },
      { type: "session", time: "14:00", end: "15:30", title: "Regional Breakouts: Portfolio Reviews", tag: "Breakout", speaker: "Programme Leads", venue: "Conference Rooms A–D" },
    ],
  },
  3: {
    date: "11 Mar",
    featured: { title: "Closing Plenary: Commitments & Next Steps", time: "09:30 – 11:00", speaker: "Dr. Helena Moreau · OAK Foundation", venue: "Main Hall A" },
    blocks: [
      { type: "break", label: "Coffee Break", time: "11:00" },
      { type: "session", time: "11:15", end: "12:30", title: "Action Planning Workshop", tag: "Workshop", speaker: "All Partners", venue: "Main Hall A" },
      { type: "break", label: "Farewell Lunch", time: "12:30" },
    ],
  },
};

export const TAG_COLOR: Record<string, string> = {
  Plenary: "bg-indigo-50 text-indigo-700",
  Breakout: "bg-amber-50 text-amber-700",
  Workshop: "bg-violet-50 text-violet-700",
  Social: "bg-rose-50 text-rose-700",
};

export const NAV: { id: "register" | "checkin" | "programme" | "partners" | "attendance"; label: string }[] = [
  { id: "register", label: "Register" },
  { id: "checkin", label: "Check In" },
  { id: "programme", label: "Programme" },
  { id: "partners", label: "Partners" },
  { id: "attendance", label: "Attendance" },
];
