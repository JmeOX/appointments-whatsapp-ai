import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock de Supabase: simulamos las respuestas de la DB sin conectar a una real
vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(() => Promise.resolve({ error: null })),
    })),
  },
}));

// Mock de las funciones de Next.js que no pueden correr fuera del servidor real
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

import { createAppointment } from "./appointments";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

describe("createAppointment", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("revalidates the appointments path after creating", async () => {
    const formData = new FormData();
    formData.set("clientName", "Ana Torres");
    formData.set("clientPhone", "+573001234567");
    formData.set("scheduledAt", "2026-08-20T15:00");
    formData.set("type", "virtual");

    await createAppointment(formData);

    expect(revalidatePath).toHaveBeenCalledWith("/appointments");
  });

  it("redirects to the appointments list after creating", async () => {
    const formData = new FormData();
    formData.set("clientName", "Ana Torres");
    formData.set("clientPhone", "+573001234567");
    formData.set("scheduledAt", "2026-08-20T15:00");
    formData.set("type", "virtual");

    await createAppointment(formData);

    expect(redirect).toHaveBeenCalledWith("/appointments");
  });
});
