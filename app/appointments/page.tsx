import Link from "next/link";
import { appointmentsStore } from "./data";

export default  async function AppointmentsPage() {
  return (
    <main>
      <h1>Appointments</h1>
      <ul>
        {appointmentsStore.map((appointment) => (
          <li key={appointment.id}>{appointment.clientName}</li>
          ))} 
      </ul>
      <Link href="/appointments/new" >+ New Appointment</Link>
      </main>
    );
}