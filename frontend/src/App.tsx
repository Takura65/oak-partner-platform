import { useState } from "react";
import Sidebar from "./components/Sidebar";
import RegisterView from "./views/RegisterView";
import CheckInView from "./views/CheckInView";
import ProgrammeView from "./views/ProgrammeView";
import PartnersView from "./views/PartnersView";
import AttendanceView from "./views/AttendanceView";
import QRCodeView from "./views/QRCodeView";
import type { AttendeeMap, NavId, RegistrationForm, RegistrationRecord, Role, ScanPerson } from "./types";
import { registerParticipant } from "./lib/participants";

export default function App() {
  const [active, setActive] = useState<NavId>("register");
  const [registered, setRegistered] = useState(false);
  const [role, setRole] = useState<Role | null>(null);
  const [registration, setRegistration] = useState<RegistrationForm | null>(null);
  const [registrationRecord, setRegistrationRecord] = useState<RegistrationRecord | null>(null);
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
      <Sidebar active={active} setActive={setActive} registered={registered} role={role} />
      <div className="flex-1 overflow-y-auto p-8">
        <div className="w-full max-w-2xl mx-auto">
          {active === "register" && (
            <RegisterView
              onRegistered={async (details) => {
                const record = await registerParticipant(details);
                setRegistered(true);
                setRole(details.role as Role);
                setRegistration(details);
                setRegistrationRecord(record);
                setActive(details.role === "Partner" ? "qr-code" : details.role === "Coordination Team" ? "checkin" : "programme");
              }}
            />
          )}
          {active === "qr-code" && registration?.role === "Partner" && registrationRecord && (
            <QRCodeView registration={registration} record={registrationRecord} />
          )}
          {active === "checkin" && <CheckInView attendees={attendees} checkIn={checkIn} checkedInCount={checkedInCount} />}
          {active === "programme" && <ProgrammeView />}
          {active === "partners" && <PartnersView />}
          {active === "attendance" && (
            <AttendanceView attendees={attendees} checkedInCount={checkedInCount} setActive={setActive} />
          )}
        </div>
      </div>
    </div>
  );
}