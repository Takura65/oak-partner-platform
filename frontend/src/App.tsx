import { useState } from "react";
import Sidebar from "./components/Sidebar";
import RegisterView from "./views/RegisterView";
import CheckInView from "./views/CheckInView";
import ProgrammeView from "./views/ProgrammeView";
import PartnersView from "./views/PartnersView";
import AttendanceView from "./views/AttendanceView";
import type { AttendeeMap, NavId, ScanPerson } from "./types";

export default function App() {
  const [active, setActive] = useState<NavId>("register");
  const [attendees, setAttendees] = useState<AttendeeMap>({});

  const checkIn = (person: ScanPerson) => {
    setAttendees((prev) => ({
      ...prev,
      [person.id]: {
        ...person,
        checkedIn: true,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    }));
  };

  const checkedInCount = Object.values(attendees).filter((a) => a.checkedIn).length;

  return (
    <div className="h-screen w-full flex bg-[#f5f6f8] font-sans text-slate-800">
      <Sidebar active={active} setActive={setActive} />
      <div className="flex-1 overflow-y-auto p-8">
        {active === "register" && <RegisterView />}
        {active === "checkin" && <CheckInView attendees={attendees} checkIn={checkIn} checkedInCount={checkedInCount} />}
        {active === "programme" && <ProgrammeView />}
        {active === "partners" && <PartnersView />}
        {active === "attendance" && (
          <AttendanceView attendees={attendees} checkedInCount={checkedInCount} setActive={setActive} />
        )}
      </div>
    </div>
  );
}
