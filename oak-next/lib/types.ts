export type UserRole =
  | "partner"
  | "oak_staff"
  | "coordination_team"
  | "presenter"
  | "observer";

export const ROLE_LABELS: Record<UserRole, string> = {
  partner: "Partner",
  oak_staff: "OAK Staff",
  coordination_team: "Coordination Team",
  presenter: "Presenter",
  observer: "Observer",
};

export type Participant = {
  id?: string;
  registration_id: string;
  qr_code_id: string;
  first_name: string;
  last_name: string;
  email: string;
  organization: string;
  sub_partner?: string | null;
  role_capacity: string;
  phone_number?: string | null;
  dietary_requirements?: string | null;
  accessibility_requirements?: string | null;
  travel_accommodation?: string | null;
  agreed_to_terms?: boolean;
  registration_status: string;
  attendance_status: string;
  checked_in_at?: string | null;
  created_at?: string;
  updated_at?: string;
};
