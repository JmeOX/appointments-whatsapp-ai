import { NextResponse } from "next/server";

interface Appointment {
    id: string;
    status: string;
    clientName: string;
}

const mockAppointments: Appointment[] = [
    { id: "1", clientName: "Maria Lopez", status: "pending" },
    { id: "2", clientName: "Carlos Ruiz", status: "confirmed" },
]

export async function GET(id?: string): Promise<NextResponse<Appointment[] | Appointment>> {
    if (id) {
        const appointment = mockAppointments.find((appointment) => appointment.id == id);
        if (appointment) {
            return NextResponse.json(appointment);
        }
    }
    return NextResponse.json(mockAppointments);
}


export async function POST(request: Request): Promise<NextResponse<Appointment>> {
    const body = await request.json();
    const newAppointment = {
        id: String(mockAppointments.length + 1),
        clientName: body.clientName,
        status: "pending",
      };
    mockAppointments.push(newAppointment);
    return NextResponse.json(newAppointment, { status: 201 });
}