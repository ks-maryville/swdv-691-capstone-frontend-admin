import {useEffect, useState} from "react";
import {useCustomerContext, UserCustomerContext} from "../context/CustomerContext";
import {CustomerTable} from "../components/tables/customerTable/CustomerTable";
import {OrderTable} from "../components/tables/orderTable/OrderTable";
import {AppointmentTable} from "../components/tables/appointmentTable/AppointmentTable";
import {useOrderContext} from "../context/OrderContext";
import {useAppointmentContext} from "../context/AppointmentContext";

export const AdminOrderPage = () => {
    const [invoiceNumber, setInvoiceNumber] = useState("");
    const [status, setStatus] = useState("");
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");

    const {customerSearch, getAllCustomers, selectedCustomer, clearCustomers} = useCustomerContext();
    const {selectedOrder, clearOrders, orderSearch, getAllOrders} = useOrderContext();
    const {clearAppointments} = useAppointmentContext();

    useEffect(() => {
        getAllOrders();
    }, [])

    const handleSubmit = () => {
        let strArray = [];
        if (invoiceNumber !== "") strArray.push(`invoiceNumber=${invoiceNumber}`);
        if (status !== "") strArray.push(`status=${status}`);
        if (minDate !== "") strArray.push(`minDate=${minDate}`);
        if (maxDate !== "") strArray.push(`email=${maxDate}`);

        orderSearch(strArray);
        clearAppointments();
        clearCustomers();

        /*
        *
        * Upon submitting
        *   clear customers
        *   clear appointments
        *
        * */
    }

    return (
        <div className="ordersPage">
            ORDER PAGE
            <input type="text" placeholder={"invoiceNumber"} onChange={(e) => setInvoiceNumber(e.target.value)}/>
            <input type="text" placeholder={"status"} onChange={(e) => setStatus(e.target.value)}/>
            <input type="text" placeholder={"minDate"} onChange={(e) => setMinDate(e.target.value)}/>
            <input type="text" placeholder={"maxDate"} onChange={(e) => setMaxDate(e.target.value)}/>
            <button onClick={() => handleSubmit()}>SEARCH</button>
            <OrderTable orderPrimary className={"orderTable"} profileID={selectedCustomer && selectedCustomer.profileID}
                        customerName={selectedCustomer && selectedCustomer.firstName}/>

            <AppointmentTable className={"appointmentTable"} profileID={selectedOrder && selectedOrder.orderID}
                              invoiceNumber={selectedOrder && selectedOrder.invoiceNumber}/>
            <CustomerTable className="customerTable"/>


            <div className="ordersTable"></div>
            <div className="appointmentsTable"></div>
        </div>
    )
}