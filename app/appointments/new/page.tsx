import { createAppointment } from "@/actions/appointments";
import Link from "next/link";

export default function NewAppointmentPage() {
  return (
    <main className="max-w-lg mx-auto px-6 py-12">
      <Link
        href="/appointments"
        className="text-sm text-ink-soft hover:text-ink transition"
      >
        ← Back
      </Link>

      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold mt-4 mb-8">
        New Appointment
      </h1>

      <form action={createAppointment} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Client name
          </label>
          <input
            type="text"
            name="clientName"
            required
            className="w-full bg-surface border border-black/10 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-signal"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Phone</label>
          <input
            type="tel"
            name="clientPhone"
            placeholder="+573001234567"
            required
            className="w-full bg-surface border border-black/10 rounded-md px-3 py-2 font-[family-name:var(--font-data)] text-sm focus:outline-none focus:ring-2 focus:ring-signal"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">
            Date and time
          </label>
          <input
            type="datetime-local"
            name="scheduledAt"
            required
            className="w-full bg-surface border border-black/10 rounded-md px-3 py-2 font-[family-name:var(--font-data)] text-sm focus:outline-none focus:ring-2 focus:ring-signal"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Type</label>
          <select
            name="type"
            required
            className="w-full bg-surface border border-black/10 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-signal"
          >
            <option value="in_person">In person</option>
            <option value="virtual">Virtual</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">
            Meeting link (optional)
          </label>
          <input
            type="url"
            name="meetingLink"
            className="w-full bg-surface border border-black/10 rounded-md px-3 py-2 font-[family-name:var(--font-data)] text-sm focus:outline-none focus:ring-2 focus:ring-signal"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">
            Notes (optional)
          </label>
          <textarea
            name="notes"
            rows={3}
            className="w-full bg-surface border border-black/10 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-signal"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-signal text-white font-medium py-2.5 rounded-md hover:opacity-90 transition"
        >
          Create appointment
        </button>
      </form>
    </main>
  );
}
