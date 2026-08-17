import { supabase } from "@/lib/supabase";
import { updateAppointmentStatus } from "@/actions/appointments";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Appointment } from "@/types";

async function getAppointment(id: string): Promise<Appointment | null> {
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data as Appointment;
}

const statusColor: Record<Appointment["status"], string> = {  pending: "text-pending",
  confirmed: "text-signal",
  cancelled: "text-cancelled",
};

export default async function AppointmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const appointment = await getAppointment(id);

  if (!appointment) notFound();

  return (
    <main className="max-w-lg mx-auto px-6 py-12">
      <Link
        href="/appointments"
        className="text-sm text-ink-soft hover:text-ink transition"
      >
        ← Back
      </Link>

      <div className="bg-surface rounded-lg p-6 mt-4">
        <div className="flex items-start justify-between mb-6">
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            {appointment.client_name}
          </h1>
          <span
            className={`text-sm font-medium ${statusColor[appointment.status]}`}
          >
            {appointment.status}
          </span>
        </div>

        <dl className="space-y-3 font-[family-name:var(--font-data)] text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-soft">Phone</dt>
            <dd>{appointment.client_phone}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-soft">When</dt>
            <dd>
              {new Date(appointment.scheduled_at).toLocaleString("en-US")}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-soft">Type</dt>
            <dd>{appointment.type}</dd>
          </div>
          {appointment.meeting_link && (
            <div className="flex justify-between">
              <dt className="text-ink-soft">Link</dt>
              <dd className="truncate max-w-[200px]">
                {appointment.meeting_link}
              </dd>
            </div>
          )}
        </dl>

        <form action={updateAppointmentStatus} className="flex gap-2 mt-6">
          <input type="hidden" name="id" value={appointment.id} />
          <button
            type="submit"
            name="status"
            value="confirmed"
            className="flex-1 bg-signal text-white text-sm font-medium py-2 rounded-md hover:opacity-90 transition"
          >
            Confirm
          </button>
          <button
            type="submit"
            name="status"
            value="cancelled"
            className="flex-1 bg-cancelled text-white text-sm font-medium py-2 rounded-md hover:opacity-90 transition"
          >
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
}
