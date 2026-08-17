import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-lg mx-auto px-6 py-24 text-center">
      <p className="font-[family-name:var(--font-data)] text-sm text-ink-soft mb-2">
        404
      </p>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-3">
        Appointment not found
      </h1>
      <p className="text-ink-soft mb-8">
        This appointment doesn't exist or may have been removed.
      </p>
      <Link
        href="/appointments"
        className="inline-block bg-signal text-white text-sm font-medium px-5 py-2.5 rounded-md hover:opacity-90 transition"
      >
        Back to appointments
      </Link>
    </main>
  );
}
