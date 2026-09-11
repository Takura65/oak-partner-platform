export type NavId = "register" | "checkin" | "programme" | "partners" | "attendance";

export type Role = "Partner" | "OAK Staff" | "Coordination Team" | "Presenter" | "Observer";

export interface ScanPerson {
  id: string;
  name: string;
  org: string;
  role: Role;
  session: string;
  venue: string;
}

export interface CheckedInAttendee extends ScanPerson {
  checkedIn: true;
  time: string;
}

export type AttendeeMap = Record<string, CheckedInAttendee>;

export interface Partner {
  code: string;
  name: string;
  region: string;
  tags: string[];
  since: number;
  site: string;
  contact: string;
  email: string;
  about: string;
}

export interface SessionNote {
  name: string;
  org: string;
  day: string;
  note: string;
}

export interface ScheduleBreak {
  type: "break";
  label: string;
  time: string;
}

export interface ScheduleSession {
  type: "session";
  time: string;
  end: string;
  title: string;
  tag: "Plenary" | "Breakout" | "Workshop" | "Social";
  speaker: string;
  venue: string;
}

export type ScheduleBlock = ScheduleBreak | ScheduleSession;

export interface DaySchedule {
  date: string;
  featured: { title: string; time: string; speaker: string; venue: string };
  blocks: ScheduleBlock[];
}

export interface Resource {
  name: string;
  meta: string;
}

export interface RegistrationForm {
  first: string;
  last: string;
  org: string;
  sub: string;
  role: Role | "";
  email: string;
  phone: string;
  dietary: string;
  accessibility: string;
  travel: string;
}
