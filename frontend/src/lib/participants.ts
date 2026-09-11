import { requireSupabase } from "./supabase";
import type { RegistrationForm, Role } from "../types";

const ROLE_VALUES: Record<Exclude<Role, "">, string> = {
  Partner: "partner",
  "OAK Staff": "oak_staff",
  "Coordination Team": "coordination_team",
  Presenter: "presenter",
  Observer: "observer",
};

export interface RegistrationResult {
  registrationId: string;
  qrCodeId: string | null;
}

function registrationId() {
  return `OAK-2026-${crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase()}`;
}

export async function registerParticipant(form: RegistrationForm): Promise<RegistrationResult> {
  const supabase = requireSupabase();
  const id = registrationId();
  const qrCodeId = form.role === "Partner" ? id : null;

  const { error } = await supabase.from("participants").insert({
    first_name: form.first,
    last_name: form.last,
    organization: form.org,
    sub_partner: form.sub || null,
    role: ROLE_VALUES[form.role as Exclude<Role, "">],
    email: form.email,
    phone: form.phone || null,
    dietary_requirements: form.dietary || null,
    accessibility_requirements: form.accessibility || null,
    travel_requirements: form.travel || null,
    accommodation_requirements: form.accommodation || null,
    registration_id: id,
    qr_code_id: qrCodeId,
    registration_status: "registered",
  });

  if (error) throw new Error(error.message);
  return { registrationId: id, qrCodeId };
}
