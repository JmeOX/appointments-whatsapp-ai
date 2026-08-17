"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createAppointment(formData: FormData) {
  const clientName = formData.get("clientName") as string;
  const clientPhone = formData.get("clientPhone") as string;
  const scheduledAt = formData.get("scheduledAt") as string;
  const type = formData.get("type") as "in_person" | "virtual";
  const meetingLink = formData.get("meetingLink") as string;
  const notes = formData.get("notes") as string;

  const { error } = await supabase.from("appointments").insert({
    client_name: clientName,
    client_phone: clientPhone,
    scheduled_at: scheduledAt,
    type,
    meeting_link: meetingLink || null,
    notes: notes || null,
  });

  if (error) {
    throw new Error(`Failed to create appointment: ${error.message}`);
  }

  revalidatePath("/appointments");
  redirect("/appointments");
}

export async function updateAppointmentStatus(formData: FormData) {
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;

  const { error } = await supabase
    .from("appointments")
    .update({ status })
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to update appointment: ${error.message}`);
  }

  revalidatePath("/appointments");
  revalidatePath(`/appointments/${id}`);
  redirect("/appointments");
}
