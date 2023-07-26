export type AppointmentData = {
    appointment_id: number;
    date_and_time: Date;
    status: "pending" | "delivered";
    notes: string;
    order_id: number;
}
