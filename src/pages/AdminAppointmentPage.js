import {useEffect, useState} from "react";
import {useCustomerContext, UserCustomerContext} from "../context/CustomerContext";
import {CustomerTable} from "../components/tables/customerTable/CustomerTable";
import {OrderTable} from "../components/tables/orderTable/OrderTable";
import {AppointmentTable} from "../components/tables/appointmentTable/AppointmentTable";
import {useOrderContext} from "../context/OrderContext";
import {useAppointmentContext} from "../context/AppointmentContext";
import {locations} from '../locations';

export const AdminAppointmentPage = () => {
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState("");
    const [minCreationDate, setMinCreationDate] = useState("");
    const [maxCreationDate, setMaxCreationDate] = useState("");
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");

    const {customerSearch, getAllCustomers, selectedCustomer, clearCustomers} = useCustomerContext();
    const {selectedOrder, clearOrders, orderSearch, getAllOrders} = useOrderContext();
    const {clearAppointments, getAllAppointments, appointmentSearch} = useAppointmentContext();

    useEffect(() => {
        getAllAppointments();
    }, [])

    const handleSubmit = () => {
        let strArray = [];
        if (location !== "") strArray.push(`location=${location}`);
        if (status !== "") strArray.push(`status=${status}`);
        if (minDate !== "") strArray.push(`minDate=${minDate}`);
        if (maxDate !== "") strArray.push(`email=${maxDate}`);
        if (minCreationDate !== "") strArray.push(`minCreationDate=${minCreationDate}`);
        if (maxCreationDate !== "") strArray.push(`maxCreationDate=${maxCreationDate}`);

        appointmentSearch(strArray);
        clearOrders();
        clearCustomers();

        /*
        *
        * Upon submitting
        *   clear customers
        *   clear appointments
        *
        * */
    }

    const setSelectedUI = ()=>{

    }
    return (
        <div className="ordersPage">
            APPOINTMENT PAGE
            <select name="location" id="" onChange={(e)=>setLocation(e.target.value)}>
                <option value="">Location</option>
                {
                    locations.map(location => {
                        return <option value={location}>{location}</option>
                    })
                }
            </select>
            <input type="text" placeholder={"status"} onChange={(e) => setStatus(e.target.value)}/>
            <input type="text" placeholder={"minDate (yyyy-MM-dd)"} onChange={(e) => setMinDate(e.target.value)}/>
            <input type="text" placeholder={"maxDate (yyyy-MM-dd)"} onChange={(e) => setMaxDate(e.target.value)}/>
            <input type="text" placeholder={"minCreationDate (yyyy-MM-dd)"} onChange={(e) => setMinCreationDate(e.target.value)}/>
            <input type="text" placeholder={"maxCreationDate (yyyy-MM-dd)"} onChange={(e) => setMaxCreationDate(e.target.value)}/>
            <button onClick={() => handleSubmit()}>SEARCH</button>


            <AppointmentTable appointmentPrimary className={"appointmentTable"}
                              profileID={selectedOrder && selectedOrder.orderID}
                              invoiceNumber={selectedOrder && selectedOrder.invoiceNumber}/>
            <OrderTable className={"orderTable"} profileID={selectedCustomer && selectedCustomer.profileID}
                        customerName={selectedCustomer && selectedCustomer.firstName}/>
            <CustomerTable className="customerTable"/>


            <div className="ordersTable"></div>
            <div className="appointmentsTable"></div>
        </div>
    )
}