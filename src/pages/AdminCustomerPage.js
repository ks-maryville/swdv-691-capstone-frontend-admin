import {useEffect, useState} from "react";
import {useCustomerContext, UserCustomerContext} from "../context/CustomerContext";
import {CustomerTable} from "../components/tables/customerTable/CustomerTable";
import {OrderTable} from "../components/tables/orderTable/OrderTable";
import {AppointmentTable} from "../components/tables/appointmentTable/AppointmentTable";
import {useOrderContext} from "../context/OrderContext";
import {useAppointmentContext} from "../context/AppointmentContext";
import {useLocation} from "react-router-dom";

export const AdminCustomerPage = () => {
    const PRIMARY_TABLE="customer";
    const [firstName, setfirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");

    const {customerSearch, getAllCustomers, selectedCustomer, clearSelectedCustomer} = useCustomerContext();
    const {selectedOrder, clearOrders, clearSelectedOrder} = useOrderContext();
    const {clearAppointments, clearSelectedAppointment} = useAppointmentContext();

    useEffect(()=>{

        getAllCustomers();
        clearOrders();
        clearAppointments();
        clearSelectedAppointment();
        clearSelectedOrder();
        clearSelectedCustomer();
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
        <div className={`customersPage`}>
            <div className={"searchWrapper"}>
                <input type="text" placeholder={"first name"} onChange={(e) => setfirstName(e.target.value)}/>
                <input type="text" placeholder={"last name"} onChange={(e) => setLastName(e.target.value)}/>
                <input type="text" placeholder={"phone number"} onChange={(e) => setPhoneNumber(e.target.value)}/>
                <input type="text" placeholder={"email"} onChange={(e) => setEmail(e.target.value)}/>
                <button onClick={() => handleSubmit()}>SEARCH</button>
            </div>

            <CustomerTable customerPrimary className="customerTable"  primaryTable={PRIMARY_TABLE}/>
            <OrderTable  className={"orderTable"} profileID={selectedCustomer && selectedCustomer.profileID} customerName={selectedCustomer && selectedCustomer.firstName} primaryTable={PRIMARY_TABLE}/>
            <AppointmentTable  className={"appointmentTable"} profileID={selectedOrder && selectedOrder.orderID} invoiceNumber={selectedOrder && selectedOrder.invoiceNumber} primaryTable={PRIMARY_TABLE}/>
        </div>
    )
}