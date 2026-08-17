export interface Appointment {
  id: string;
  client_name: string;
  client_phone: string;
  scheduled_at: string;
  type: "in_person" | "virtual";
  meeting_link: string | null;
  status: "pending" | "confirmed" | "cancelled";
  notes: string | null;
  created_at: string;
}
