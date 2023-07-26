export type OrderData = {
    [key: string]: any;
    order_id: number;
    invoice_number: string;
    status: "pending" | "arrived" | "delivered";
    location: string;
    date_created: Date;
}

export type OrderDataArray = OrderData[];
