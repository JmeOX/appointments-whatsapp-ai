import Counter from "./counter";

async function getMockAppointment() {
  return {
    clientName: 'John Doe',
    scheduleAt: '2026-08-16T10:00:00Z',
  }
}

export default async function Home() {
  const appointment = await getMockAppointment();
  return (
    <div>
      <h1>Next Appointment</h1>
      <p>{appointment.clientName}</p>
      <p>{appointment.scheduleAt}</p>

    <Counter/>
    </div>
  )
}