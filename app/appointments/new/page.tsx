import { appointmentsStore } from "../data";
import { revalidatePath } from "next/cache";

async function createAppointment(formData: FormData) {
  "use server";

  const clientName = formData.get("clientName") as string;

  appointmentsStore.push({
    id: String(appointmentsStore.length + 1),
    clientName,
  });

  revalidatePath("/appointments");
}
export default function NewAppointmentPage() {
  return (
    <main>
      <h1>New Appointment</h1>
      <form action={createAppointment}>
        <input type="text" name="clientName" placeholder="Client name" required />
        <button type="submit">Create</button>
      </form>
    </main>
  );
}