import { useState } from "react";
import { Check, Download } from "lucide-react";
import QRPattern from "../components/QRPattern";
import type { RegistrationForm } from "../types";

const EMPTY_FORM: RegistrationForm = { first: "", last: "", org: "", sub: "", role: "", email: "", phone: "" };

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  plain?: boolean;
}

function Field({ label, value, onChange, placeholder, required, type = "text", plain }: FieldProps) {
  return (
    <div>
      <label className="text-[11px] tracking-wide text-slate-400">
        {label.toUpperCase()} {required && <span className="text-rose-400">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full mt-1 border border-slate-200 rounded-lg px-3 py-2 text-sm ${
          plain ? "bg-white" : "bg-slate-50"
        } focus:outline-none focus:ring-2 focus:ring-navy/20 placeholder:text-slate-300`}
      />
    </div>
  );
}

export default function RegisterView() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<RegistrationForm>(EMPTY_FORM);
  const [agree, setAgree] = useState(false);

  if (submitted) {
    return (
      <div className="max-w-xl">
        <div className="rounded-2xl bg-gradient-to-br from-navy to-navy-light p-6 text-white relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/5" />
          <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center mb-3">
            <Check size={18} />
          </div>
          <div className="text-[11px] tracking-wide text-white/60">REGISTRATION COMPLETE</div>
          <div className="text-xl font-semibold mt-1">You're registered, {form.first || "there"}!</div>
          <div className="text-sm text-white/70">{form.org || "your organisation"}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 mt-4 p-6 flex flex-col items-center">
          <div className="text-[11px] tracking-wide text-slate-400 mb-3">YOUR ENTRY PASS</div>
          <div className="p-3 border border-slate-200 rounded-xl">
            <QRPattern seed={form.first.length + form.last.length + 3} />
          </div>
          <div className="text-xs text-slate-400 mt-3">
            OAK-2026-{String(Math.abs(form.first.length * 137 + 400)).slice(0, 4)}-XKPH
          </div>
          <div className="text-xs text-slate-400">Present at event entrance for check-in</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 mt-4 p-6 space-y-3">
          <div className="text-[11px] tracking-wide text-slate-400 mb-1">REGISTRATION DETAILS</div>
          {[
            ["Name", `${form.first} ${form.last}`.trim() || "—"],
            ["Organisation", form.org || "—"],
            ["Role", form.role || "—"],
            ["Email", form.email || "—"],
            ["Event Dates", "9–11 March 2026"],
            ["Location", "Harare, Zimbabwe"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between text-sm py-1 border-b border-slate-50 last:border-0">
              <span className="text-slate-400">{k}</span>
              <span className="text-slate-700 font-medium">{v}</span>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 bg-navy text-white rounded-xl py-3 text-sm font-medium flex items-center justify-center gap-2 hover:bg-navy-light">
          <Download size={15} /> Download QR Code
        </button>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm(EMPTY_FORM);
            setAgree(false);
          }}
          className="w-full mt-2 text-center text-sm text-slate-400 hover:text-slate-600 py-1"
        >
          Register another attendee
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <div className="rounded-2xl bg-gradient-to-br from-navy to-navy-light p-6 text-white relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-white/5" />
        <div className="text-xl font-semibold">Partner Convening 2026</div>
        <div className="text-sm text-white/60 mt-0.5">Harare · 9–11 March 2026</div>
      </div>

      <div className="grid grid-cols-3 gap-3 -mt-6 relative px-1">
        {[
          ["110+", "Attendees"],
          ["24", "Sessions"],
          ["38", "Partners"],
        ].map(([n, l]) => (
          <div key={l} className="bg-white rounded-xl border border-slate-200 shadow-sm py-3 text-center">
            <div className="text-lg font-semibold text-slate-800">{n}</div>
            <div className="text-[11px] text-slate-400">{l}</div>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (agree) setSubmitted(true);
        }}
        className="bg-white rounded-2xl border border-slate-200 mt-4 p-6 space-y-4"
      >
        <div className="font-semibold text-slate-800">Registration Form</div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="First Name" required value={form.first} onChange={(v) => setForm({ ...form, first: v })} placeholder="Maria" />
          <Field label="Last Name" required value={form.last} onChange={(v) => setForm({ ...form, last: v })} placeholder="Schmidt" />
        </div>
        <Field label="Organisation" required value={form.org} onChange={(v) => setForm({ ...form, org: v })} placeholder="Your organisation name" />
        <Field label="Sub-partner / Programme Area" value={form.sub} onChange={(v) => setForm({ ...form, sub: v })} placeholder="Optional" />
        <div>
          <label className="text-[11px] tracking-wide text-slate-400">ROLE / CAPACITY *</label>
          <select
            required
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value as RegistrationForm["role"] })}
            className="w-full mt-1 border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-navy/20"
          >
            <option value="">Select your role</option>
            <option>Partner</option>
            <option>OAK Staff</option>
            <option>Coordination Team</option>
            <option>Presenter</option>
            <option>Observer</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Email Address" required type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@organisation.org" />
          <Field label="Phone Number" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+263 xx xxx xxxx" />
        </div>

        <div className="bg-slate-50 rounded-xl p-4 space-y-3">
          <div className="text-[11px] tracking-wide text-slate-400">REQUIREMENTS</div>
          <Field label="Dietary Requirements" value="" onChange={() => {}} placeholder="e.g. Vegetarian, Halal, Gluten-free" plain />
          <Field label="Accessibility Requirements" value="" onChange={() => {}} placeholder="e.g. Wheelchair access, hearing loop" plain />
          <Field label="Travel & Accommodation" value="" onChange={() => {}} placeholder="e.g. Flight from London, hotel needed" plain />
        </div>

        <label className="flex items-start gap-2 text-xs text-slate-500">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5" />
          I agree to OAK Foundation's privacy policy and consent to my registration data being used for event coordination.
        </label>

        <button
          type="submit"
          disabled={!agree}
          className="w-full bg-navy text-white rounded-xl py-3 text-sm font-medium disabled:opacity-40 hover:bg-navy-light transition-colors"
        >
          Register
        </button>
        <div className="text-center text-[11px] text-slate-300">
          Your data is secured and handled by OAK Foundation in accordance with GDPR.
        </div>
      </form>
    </div>
  );
}
