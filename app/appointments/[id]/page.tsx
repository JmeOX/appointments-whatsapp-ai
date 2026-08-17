export default async function AppointmentPage({ params }:{ params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main>
      <h1>Appointment</h1>
      <p>Appointment ID: {id}</p>
    </main>
  )
}