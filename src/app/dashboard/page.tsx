import Link from "next/link";

export default function Dashboard(){
    return <div>
        <Link href={'/dashboard/customers'}>Customers</Link>
        <Link href={'/dashboard/orders'}>Orders</Link>
        <Link href={'/dashboard/appointments'}>Appointments</Link>
        </div>
};
