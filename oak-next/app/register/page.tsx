"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  UserPlus,
  CalendarDays,
  Layers3,
  Globe,
  ChevronDown,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const roles = [
  { value: "partner", label: "Partner" },
  { value: "oak_staff", label: "OAK Staff" },
  { value: "coordination_team", label: "Coordination Team" },
  { value: "presenter", label: "Presenter" },
  { value: "observer", label: "Observer" },
];

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    organization: "",
    sub_partner_program_area: "",
    role: "",
    email: "",
    phone: "",
    dietary_requirements: "",
    accessibility_requirements: "",
    travel_requirements: "",
    accommodation_requirements: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");

    if (!agreed) {
      setMessage(
        "Please agree to the privacy policy and registration consent."
      );
      return;
    }

    if (!formData.role) {
      setMessage("Please select a role.");
      return;
    }

    setLoading(true);

    const registrationId = `OAK-${crypto.randomUUID()}`;

    const qrCodeId =
      formData.role === "partner"
        ? `QR-${crypto.randomUUID()}`
        : null;

    console.log("ROLE BEING SENT:", formData.role);

    const { data, error: registrationError } = await supabase
      .from("participants")
      .insert({
        ...formData,
        role: formData.role,
        registration_id: registrationId,
        qr_code_id: qrCodeId,
        registration_status: "registered",
        attendance_status: "not_attended",
      })
      .select()
      .single();

    if (registrationError) {
      console.error(
        "SUPABASE REGISTRATION ERROR:",
        registrationError
      );

      console.error(
        "ERROR MESSAGE:",
        registrationError.message
      );

      console.error(
        "ERROR DETAILS:",
        registrationError.details
      );

      console.error(
        "ERROR HINT:",
        registrationError.hint
      );

      setMessage(registrationError.message);
      setLoading(false);
      return;
    }

    if (data.role === "partner") {
      router.push(`/qr-code/${data.id}`);
      return;
    }

    if (data.role === "coordination_team") {
      router.push("/coordination");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#f4f6f9] text-[#111827]">
      <div className="flex min-h-screen">

        {/* =====================================================
            SIDEBAR
        ====================================================== */}
        <aside className="hidden w-[205px] flex-shrink-0 border-r border-[#e5e7eb] bg-white md:flex md:flex-col">

          {/* Logo */}
          <div className="border-b border-[#e5e7eb] px-6 py-5">
            <div className="flex flex-col">
              <div className="font-serif text-[27px] leading-none tracking-[-1px] text-[#17345f]">
                OAK
              </div>

              <div className="mt-1 text-[9px] font-medium tracking-[0.5px] text-[#64748b]">
                FOUNDATION
              </div>

              <div className="mt-4 text-[10px] font-bold tracking-[1.1px] text-[#64748b]">
                PARTNER CONVENING 2026
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="px-4 pt-3">
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-[15px] bg-[#193764] px-4 py-3 text-left text-[12px] font-semibold text-white shadow-[0_6px_14px_rgba(25,55,100,0.20)]"
            >
              <UserPlus size={16} strokeWidth={1.8} />
              Register
            </button>
          </div>

          {/* Bottom location */}
          <div className="mt-auto border-t border-[#e5e7eb] px-5 py-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#f1f5f9]">
                <Globe size={13} className="text-[#94a3b8]" />
              </div>

              <div>
                <p className="text-[9px] font-semibold text-[#334155]">
                  Harare, Zimbabwe
                </p>

                <p className="mt-0.5 text-[8px] text-[#94a3b8]">
                  9–11 March 2026
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}
        <section className="flex-1 px-4 py-7 sm:px-8 lg:px-12">

          <div className="mx-auto w-full max-w-[480px]">

            {/* Event Header */}
            <div className="relative overflow-hidden rounded-[18px] bg-[#193764] px-5 py-6 text-white shadow-[0_7px_18px_rgba(25,55,100,0.14)] sm:px-6">

              {/* subtle background glow */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/10 blur-2xl" />

              <div className="relative">
                <h1 className="max-w-[280px] text-[24px] font-extrabold leading-[1.2] tracking-[-0.5px] sm:text-[25px]">
                  Partner
                  <br />
                  Convening 2026
                </h1>

                <p className="mt-2 text-[11px] text-white/50">
                  Geneva · 9–11 March 2026
                </p>
              </div>
            </div>

            {/* =================================================
                STAT CARDS
            ================================================== */}
            <div className="mt-4 grid grid-cols-3 gap-2">

              <div className="rounded-[14px] bg-white px-4 py-4 shadow-[0_4px_12px_rgba(15,23,42,0.05)]">
                <div className="flex items-center gap-2">
                  <UserPlus
                    size={13}
                    strokeWidth={1.7}
                    className="text-[#94a3b8]"
                  />
                  <span className="text-[17px] font-bold">
                    110+
                  </span>
                </div>

                <p className="mt-1 text-[9px] text-[#94a3b8]">
                  Attendees
                </p>
              </div>

              <div className="rounded-[14px] bg-white px-4 py-4 shadow-[0_4px_12px_rgba(15,23,42,0.05)]">
                <div className="flex items-center gap-2">
                  <CalendarDays
                    size={13}
                    strokeWidth={1.7}
                    className="text-[#94a3b8]"
                  />
                  <span className="text-[17px] font-bold">
                    24
                  </span>
                </div>

                <p className="mt-1 text-[9px] text-[#94a3b8]">
                  Sessions
                </p>
              </div>

              <div className="rounded-[14px] bg-white px-4 py-4 shadow-[0_4px_12px_rgba(15,23,42,0.05)]">
                <div className="flex items-center gap-2">
                  <Layers3
                    size={13}
                    strokeWidth={1.7}
                    className="text-[#94a3b8]"
                  />
                  <span className="text-[17px] font-bold">
                    38
                  </span>
                </div>

                <p className="mt-1 text-[9px] text-[#94a3b8]">
                  Partners
                </p>
              </div>

            </div>

            {/* =================================================
                REGISTRATION CARD
            ================================================== */}
            <div className="mt-4 rounded-[18px] bg-white p-5 shadow-[0_5px_18px_rgba(15,23,42,0.07)] sm:p-6">

              <h2 className="text-[16px] font-bold tracking-[-0.2px]">
                Registration Form
              </h2>

              {message && (
                <div className="mt-4 rounded-[10px] bg-red-50 px-3 py-3 text-[11px] leading-5 text-red-600">
                  {message}
                </div>
              )}

              <form
                onSubmit={handleRegister}
                className="mt-5 space-y-4"
              >

                {/* First + Last Name */}
                <div className="grid grid-cols-2 gap-2">

                  <div>
                    <label className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.3px] text-[#64748b]">
                      First Name <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                      placeholder="Maria"
                      className="h-[42px] w-full rounded-[9px] border border-transparent bg-[#edf2f8] px-3 text-[12px] text-[#334155] outline-none transition focus:border-[#193764] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.3px] text-[#64748b]">
                      Last Name <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                      placeholder="Schmidt"
                      className="h-[42px] w-full rounded-[9px] border border-transparent bg-[#edf2f8] px-3 text-[12px] text-[#334155] outline-none transition focus:border-[#193764] focus:bg-white"
                    />
                  </div>

                </div>

                {/* Organization */}
                <div>
                  <label className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.3px] text-[#64748b]">
                    Organization <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                    placeholder="Your organisation name"
                    className="h-[42px] w-full rounded-[9px] border border-transparent bg-[#edf2f8] px-3 text-[12px] text-[#334155] outline-none transition focus:border-[#193764] focus:bg-white"
                  />
                </div>

                {/* Sub Partner */}
                <div>
                  <label className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.3px] text-[#64748b]">
                    Sub-Partner / Programme Area
                  </label>

                  <input
                    type="text"
                    name="sub_partner_program_area"
                    value={formData.sub_partner_program_area}
                    onChange={handleChange}
                    placeholder="Optional"
                    className="h-[42px] w-full rounded-[9px] border border-transparent bg-[#edf2f8] px-3 text-[12px] text-[#334155] outline-none transition focus:border-[#193764] focus:bg-white"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.3px] text-[#64748b]">
                    Role / Capacity <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="h-[42px] w-full appearance-none rounded-[9px] border border-transparent bg-[#edf2f8] px-3 pr-10 text-[12px] text-[#334155] outline-none transition focus:border-[#193764] focus:bg-white"
                    >
                      <option value="">
                        Select your role
                      </option>

                      {roles.map((role) => (
                        <option
                          key={role.value}
                          value={role.value}
                        >
                          {role.label}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={17}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.3px] text-[#64748b]">
                    Email Address <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@organisation.org"
                    className="h-[42px] w-full rounded-[9px] border border-transparent bg-[#edf2f8] px-3 text-[12px] text-[#334155] outline-none transition focus:border-[#193764] focus:bg-white"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.3px] text-[#64748b]">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+41 xx xxx xx xx"
                    className="h-[42px] w-full rounded-[9px] border border-transparent bg-[#edf2f8] px-3 text-[12px] text-[#334155] outline-none transition focus:border-[#193764] focus:bg-white"
                  />
                </div>

                {/* =================================================
                    REQUIREMENTS BOX
                ================================================== */}
                <div className="rounded-[12px] border border-[#dbe1e8] bg-[#edf1f6] p-3">

                  <p className="mb-4 text-[8px] font-bold uppercase tracking-[0.8px] text-[#64748b]">
                    Requirements
                  </p>

                  {/* Dietary */}
                  <div>
                    <label className="mb-1 block text-[9px] font-bold uppercase tracking-[0.3px] text-[#64748b]">
                      Dietary Requirements
                    </label>

                    <input
                      type="text"
                      name="dietary_requirements"
                      value={formData.dietary_requirements}
                      onChange={handleChange}
                      placeholder="e.g. Vegetarian, Halal, Gluten-free"
                      className="h-[39px] w-full rounded-[8px] border-none bg-transparent px-3 text-[11px] text-[#64748b] outline-none placeholder:text-[#94a3b8]"
                    />
                  </div>

                  {/* Accessibility */}
                  <div className="mt-3">
                    <label className="mb-1 block text-[9px] font-bold uppercase tracking-[0.3px] text-[#64748b]">
                      Accessibility Requirements
                    </label>

                    <input
                      type="text"
                      name="accessibility_requirements"
                      value={formData.accessibility_requirements}
                      onChange={handleChange}
                      placeholder="e.g. Wheelchair access, hearing loop"
                      className="h-[39px] w-full rounded-[8px] border-none bg-transparent px-3 text-[11px] text-[#64748b] outline-none placeholder:text-[#94a3b8]"
                    />
                  </div>

                  {/* Travel */}
                  <div className="mt-3">
                    <label className="mb-1 block text-[9px] font-bold uppercase tracking-[0.3px] text-[#64748b]">
                      Travel & Accommodation
                    </label>

                    <input
                      type="text"
                      name="travel_requirements"
                      value={formData.travel_requirements}
                      onChange={handleChange}
                      placeholder="e.g. Flight from London, hotel needed"
                      className="h-[39px] w-full rounded-[8px] border-none bg-transparent px-3 text-[11px] text-[#64748b] outline-none placeholder:text-[#94a3b8]"
                    />
                  </div>

                </div>

                {/* =================================================
                    CONSENT
                ================================================== */}
                <label className="flex cursor-pointer items-start gap-3 rounded-[11px] border border-[#dbe1e8] bg-white px-3 py-3">

                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) =>
                      setAgreed(e.target.checked)
                    }
                    className="mt-0.5 h-4 w-4 rounded border-[#cbd5e1] accent-[#193764]"
                  />

                  <span className="text-[10px] leading-[1.55] text-[#334155]">
                    I agree to OAK Foundation&apos;s{" "}
                    <a
                      href="#"
                      className="underline underline-offset-2"
                    >
                      privacy policy
                    </a>{" "}
                    and consent to my registration data being used
                    for event coordination.
                  </span>

                </label>

                {/* =================================================
                    REGISTER BUTTON
                ================================================== */}
                <button
                  type="submit"
                  disabled={loading}
                  className="h-[46px] w-full rounded-[10px] bg-[#193764] px-4 text-[12px] font-bold text-white shadow-[0_5px_12px_rgba(25,55,100,0.18)] transition hover:bg-[#142e55] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Registering..."
                    : "Register & Generate QR Code"}
                </button>

              </form>
            </div>

            {/* Footer */}
            <p className="mt-5 text-center text-[8px] text-[#94a3b8]">
              Your data is secured and handled by OAK Foundation in
              accordance with GDPR.
            </p>

          </div>
        </section>
      </div>
    </main>
  );
}