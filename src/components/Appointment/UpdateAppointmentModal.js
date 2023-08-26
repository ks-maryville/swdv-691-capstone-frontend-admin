import {useEffect, useState} from "react";
import {useCustomerContext} from "../../context/CustomerContext";
import {useOrderContext} from "../../context/OrderContext";
import {useAppointmentContext} from "../../context/AppointmentContext";
import {times, toUTC} from "../../Helper/time";
import {locations} from "../../locations";

export const UpdateAppointmentModal = ({updateOpen, setUpdateOpen}) => {
    const {createOrder, message, selectedOrder} = useOrderContext();
    const {selectedCustomer} = useCustomerContext();
    const {
        selectedAppointment,
        scheduleAppointment,
        updateAppointment,
        checkAvailable,
        unavailableDates
    } = useAppointmentContext();

    const [date, setDate] = useState(JSON.stringify(selectedAppointment) !== "{}" && (selectedAppointment.appointmentDate.slice(0, 10)));
    const [time, setTime] = useState(JSON.stringify(selectedAppointment) !== "{}" && (selectedAppointment.appointmentDate.slice(-5)));
    const [status, setStatus] = useState(selectedAppointment.status);
    const [notes, setNotes] = useState(selectedAppointment.notes);

    const [location, setLocation] = useState("");
    const [locationSelected, setLocationSelected] = useState(false);
    const [dateSelected, setDateSelected] = useState(false);
    const [availableTimes, setAvailableTimes] = useState([]);
    console.log(date);
    console.log(time);
    const handleSubmit = () => {

        const appointmentObj = {
            appointmentID: selectedAppointment.appointmentID,
            orderID: selectedOrder.orderID,
            profileID: selectedCustomer.profileID,
            appointmentDate: toUTC(date + " " + time),
            status: status,
            notes: notes,
        }


        updateAppointment(appointmentObj).then(response => {
            if (response === true) {
                setUpdateOpen(!updateOpen);
            }
        })

    }

    const mapTimes = () => times.map((time) => {
        console.log("times should be mapped");
        let dateTime = date + " " + time;
        console.log(unavailableDates.includes(dateTime));
        if (unavailableDates.includes(dateTime)) {
            console.log("unavailable");
            return <option value={time} disabled>{time}</option>
        }
        return <option value={time}>{time}</option>
    })

    const handleDate = (e) => {
        setDateSelected(true);
        setDate(e.target.value);
    }

    const handleTime = (e) => {
        setTime(e.target.value);
    }

    useEffect(() => {
        console.log("UPDATE MODAL DATE", date);
        checkAvailable(date, selectedOrder.location)
        console.log("UPDATE MODAL TIME", time);
    }, [date, time]);

    return (

        // <div className={"background"} onClick={() => setCreateOpen()}>

        <div className={"wrapper"}>


            <div className={"left"}>

                <div>
                    <label htmlFor="">Date</label>
                    <input type="date" value={date} onChange={(e) => handleDate(e)}/>
                </div>

                <div>
                    <label htmlFor="">Time</label>
                    <select value={time} onChange={(e) => handleTime(e)}>
                        <option value="">{time}</option>
                        {
                            mapTimes()
                        }
                    </select></div>
                <div>
                    <label htmlFor="">Status</label>
                    <select name="" id="" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="pending">pending</option>
                        <option value="delivered">delivered</option>
                        <option value="cancelled">cancelled</option>
                    </select></div>
                <div>
                    <label htmlFor="">Notes</label>
                    <input type="text" name="" id="" value={notes} placeholder={"notes"}
                           onChange={(e) => setNotes(e.target.value)}/>
                </div>
            </div>
            <button onClick={(e) => setUpdateOpen(!updateOpen)}>Cancel</button>
            <button onClick={() => handleSubmit()}>Submit</button>
            <div className={"right error"}>
                {Object.keys("message").length > 0 && message.date ? message.date.map(item => <p
                    style={{color: "red"}}>{item}</p>) : null}
                {Object.keys("message").length > 0 && message.status ? message.status.map(item => <p
                    style={{color: "red"}}>{item}</p>) : null}
                {Object.keys("message").length > 0 && message.notes ? message.notes.map(item => <p
                    style={{color: "red"}}>{item}</p>) : null}
            </div>
        </div>


    )
}