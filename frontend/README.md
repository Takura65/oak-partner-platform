# OAK Partner Attendance Platform

A TypeScript + React + Tailwind prototype of the OAK Foundation Partner Convening 2026 attendance app: registration with a generated QR pass, a check-in scanner (with simulated scans, manual code entry, and success/fail states), a day-by-day programme with session notes and resources, a searchable partner directory, and a live attendance dashboard.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  App.tsx              # root component, view routing + shared attendee state
  types.ts              # shared TypeScript types
  utils.ts               # small helpers (e.g. initials)
  data/mock.ts            # mock partners, schedule, notes, resources
  components/
    Sidebar.tsx
    QRPattern.tsx          # generated QR-style pattern, no external QR lib needed
  views/
    RegisterView.tsx
    CheckInView.tsx
    ProgrammeView.tsx
    PartnersView.tsx
    AttendanceView.tsx
```

Checking someone in on the Check-In screen updates the Attendance dashboard live — both read from the same `attendees` state lifted into `App.tsx`.

## Notes

- All data (partners, schedule, attendees) is mocked in `src/data/mock.ts` — swap in real API calls when ready.
- The QR codes are a generated visual pattern (`QRPattern.tsx`), not scannable — swap in a library like `qrcode` if you need real codes.
- Styling uses Tailwind with a `navy` custom color (`#0f1e3d` / `#16295a`) defined in `tailwind.config.ts`.
