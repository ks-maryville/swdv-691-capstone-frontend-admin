import {useEffect, useState} from "react";
import {useCustomerContext, UserCustomerContext} from "../context/CustomerContext";
import {CustomerTable} from "../components/tables/customerTable/CustomerTable";
import {OrderTable} from "../components/tables/orderTable/OrderTable";
import {AppointmentTable} from "../components/tables/appointmentTable/AppointmentTable";
import {useOrderContext} from "../context/OrderContext";
import {useAppointmentContext} from "../context/AppointmentContext";
import {locations} from '../locations';
import {Link} from "react-router-dom";

export const AdminAppointmentPage = () => {
    const PRIMARY_TABLE = "appointment"
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState("");
    const [minCreationDate, setMinCreationDate] = useState("");
    const [maxCreationDate, setMaxCreationDate] = useState("");
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");

    const {customerSearch, getAllCustomers, selectedCustomer, clearCustomers,clearSelectedCustomer} = useCustomerContext();
    const {selectedOrder, clearOrders, orderSearch, getAllOrders, clearSelectedOrder} = useOrderContext();
    const {clearAppointments, getAllAppointments, appointmentSearch, clearSelectedAppointment} = useAppointmentContext();

    useEffect(() => {
        getAllAppointments();
        clearCustomers();
        clearAppointments();
        clearOrders();
        clearSelectedCustomer();
        clearSelectedAppointment();
        clearSelectedOrder();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
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

    const setSelectedUI = () => {


    }
    return (
        <div className="ordersPage">

            <form action="">
                <select name="location" id="" onChange={(e) => setLocation(e.target.value)}>
                    <option value="">Location</option>
                    {
                        locations.map(location => {
                            return <option value={location}>{location}</option>
                        })
                    }
                </select>
                <select name="" id="" onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Status</option>
                    <option value="pending">pending</option>
                    <option value="delivered">delivered</option>
                    <option value="cancelled">cancelled</option>
                </select>
                {/*<input type="text" placeholder={"minDate (yyyy-MM-dd)"} onChange={(e) => setMinDate(e.target.value)}/>*/}
                {/*<input type="text" placeholder={"maxDate (yyyy-MM-dd)"} onChange={(e) => setMaxDate(e.target.value)}/>*/}
                {/*<input type="text" placeholder={"minCreationDate (yyyy-MM-dd)"} onChange={(e) => setMinCreationDate(e.target.value)}/>*/}
                {/*<input type="text" placeholder={"maxCreationDate (yyyy-MM-dd)"} onChange={(e) => setMaxCreationDate(e.target.value)}/>*/}
                <input type={"submit"} onClick={(e) => handleSubmit(e)} value={"SEARCH"}/>
            </form>



            <AppointmentTable appointmentPrimary className={"appointmentTable"}
                              profileID={selectedOrder && selectedOrder.orderID}
                              invoiceNumber={selectedOrder && selectedOrder.invoiceNumber}
                              primaryTable={PRIMARY_TABLE}
            />
            <OrderTable className={"orderTable"} profileID={selectedCustomer && selectedCustomer.profileID}
                        customerName={selectedCustomer && selectedCustomer.firstName} primaryTable={PRIMARY_TABLE}/>
            <CustomerTable className="customerTable" primaryTable={PRIMARY_TABLE}/>
        </div>
    )
}