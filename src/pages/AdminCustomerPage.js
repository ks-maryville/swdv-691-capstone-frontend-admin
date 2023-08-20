import {useEffect, useState} from "react";
import {useCustomerContext, UserCustomerContext} from "../context/CustomerContext";
import {CustomerTable} from "../components/tables/customerTable/CustomerTable";
import {OrderTable} from "../components/tables/orderTable/OrderTable";
import {AppointmentTable} from "../components/tables/appointmentTable/AppointmentTable";
import {useOrderContext} from "../context/OrderContext";
import {useAppointmentContext} from "../context/AppointmentContext";

export const AdminCustomerPage = () => {
    const [firstName, setfirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");

    const {customerSearch, getAllCustomers, selectedCustomer} = useCustomerContext();
    const {selectedOrder, clearOrders} = useOrderContext();
    const {clearAppointments} = useAppointmentContext();

    useEffect(()=>{
        getAllCustomers();
    },[])

    const handleSubmit = () => {
        let strArray = [];
        if (firstName !== "") strArray.push(`firstName=${firstName}`);
        if (lastName !== "") strArray.push(`lastName=${lastName}`);
        if (phoneNumber !== "") strArray.push(`phoneNumber=${phoneNumber}`);
        if (email !== "") strArray.push(`email=${email}`);

        customerSearch(strArray);
        clearOrders();
        clearAppointments();

    }
    return (
        <div className="customersPage">
            <input type="text" placeholder={"first name"} onChange={(e) => setfirstName(e.target.value)}/>
            <input type="text" placeholder={"last name"} onChange={(e) => setLastName(e.target.value)}/>
            <input type="text" placeholder={"phone number"} onChange={(e) => setPhoneNumber(e.target.value)}/>
            <input type="text" placeholder={"email"} onChange={(e) => setEmail(e.target.value)}/>
            <button onClick={() => handleSubmit()}>SEARCH</button>
            <CustomerTable customerPrimary className="customerTable" />
            <OrderTable  className={"orderTable"} profileID={selectedCustomer && selectedCustomer.profileID} customerName={selectedCustomer && selectedCustomer.firstName}/>
            <AppointmentTable  className={"appointmentTable"} profileID={selectedOrder && selectedOrder.orderID} invoiceNumber={selectedOrder && selectedOrder.invoiceNumber}/>


            <div className="ordersTable"></div>
            <div className="appointmentsTable"></div>
        </div>
    )
}