import { supabase } from "@/lib/supabase";
import type { Appointment } from "@/types";
import Link from "next/link";

async function getAppointments(): Promise<Appointment[]> {
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .order("scheduled_at", { ascending: true });

  if (error) throw new Error(`Failed to fetch appointments: ${error.message}`);
  return (data ?? []) as Appointment[];
}

const statusStyles: Record<
  Appointment["status"],
  { border: string; label: string }
> = {
  pending: { border: "border-l-pending", label: "Pending" },
  confirmed: { border: "border-l-signal", label: "Confirmed" },
  cancelled: { border: "border-l-cancelled", label: "Cancelled" },
};

export default async function AppointmentsPage() {
  const appointments = await getAppointments();

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold">
          Appointments
        </h1>
        <Link
          href="/appointments/new"
          className="bg-signal text-white text-sm font-medium px-4 py-2 rounded-md hover:opacity-90 transition"
        >
          + New
        </Link>
      </div>

      {appointments.length === 0 ? (
        <p className="text-ink-soft">
          No appointments yet. Create your first one.
        </p>
      ) : (
        <ul className="space-y-2">
          {appointments.map((a) => {
            const s = statusStyles[a.status];
            return (
              <li key={a.id}>
                <Link
                  href={`/appointments/${a.id}`}
                  className={`flex items-center justify-between bg-surface border-l-4 ${s.border} rounded-r-md px-4 py-3 hover:shadow-sm transition`}
                >
                  <div className="flex items-center gap-3">
                    {a.status === "pending" && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pending opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-pending"></span>
                      </span>
                    )}
                    <span className="font-medium">{a.client_name}</span>
                  </div>
                  <span className="font-[family-name:var(--font-data)] text-sm text-ink-soft">
                    {new Date(a.scheduled_at).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
