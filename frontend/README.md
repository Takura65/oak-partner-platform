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

## Supabase setup

Create a Supabase project, run `../oak-next/supabase/schema.sql` in the SQL Editor, then create `frontend/.env.local`:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Restart Vite after changing environment variables. Registration writes participant records to Supabase. The schema intentionally restricts participant reads and attendance changes to authenticated Coordination Team users, so check-in authentication must be added before production check-in is enabled.

## Project structure

```
src/
  App.tsx              # root component, view routing + shared attendee state
  types.ts              # shared TypeScript types
  utils.ts               # small helpers (e.g. initials)
  data/mock.ts            # mock partners, schedule, notes, resources
  components/
    Sidebar.tsx
  views/
    RegisterView.tsx
    CheckInView.tsx
    ProgrammeView.tsx
    PartnersView.tsx
    AttendanceView.tsx
```

Checking someone in on the Check-In screen updates the Attendance dashboard live — both read from the same `attendees` state lifted into `App.tsx`.

## Notes

- Partners, schedule, and sample scanner entries are still mocked in `src/data/mock.ts`.
- Partner registration IDs are persisted in Supabase and rendered as real, scannable QR codes.
- Styling uses Tailwind with a `navy` custom color (`#0f1e3d` / `#16295a`) defined in `tailwind.config.ts`.
