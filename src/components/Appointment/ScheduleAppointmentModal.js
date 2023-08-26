import {useEffect, useState} from "react";
import {useCustomerContext} from "../../context/CustomerContext";
import {useOrderContext} from "../../context/OrderContext";
import {useAppointmentContext} from "../../context/AppointmentContext";
import {times, toUTC} from "../../Helper/time";
import {locations} from "../../locations";

export const ScheduleAppointmentModal = ({createOpen, setCreateOpen}) => {
    const {createOrder, message, selectedOrder} = useOrderContext();
    const {selectedCustomer} = useCustomerContext();
    const {selectedAppointment, scheduleAppointment, checkAvailable, unavailableDates} = useAppointmentContext();

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [status, setStatus] = useState("pending");
    const [notes, setNotes] = useState("");

    const [location, setLocation] = useState("");
    const [locationSelected, setLocationSelected] = useState(false);
    const [dateSelected, setDateSelected] = useState(false);
    const [availableTimes, setAvailableTimes] = useState([]);
    console.log(date);

    const handleSubmit = () => {

        const appointmentObj = {
            orderID: selectedOrder.orderID,
            profileID: selectedCustomer.profileID,
            appointmentDate: toUTC(date + " " + time),
            status: status,
            notes: notes,
        }


        scheduleAppointment(appointmentObj).then(response => {
            if (response === true) {
                setCreateOpen(!createOpen);
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
        console.log(date);
        checkAvailable(date, selectedOrder.location)
        console.log(time);
    }, [date, time]);

    return (

        // <div className={"background"} onClick={() => setCreateOpen()}>

        <div className={"wrapper"}>


            <div className={"left"}>

                <div>
                    {/*<select name="" id="" onChange={(e) => {*/}
                    {/*    setLocation(e.target.value);*/}
                    {/*    setLocationSelected(true);*/}
                    {/*}}>*/}
                    {/*    <option value="">Location</option>*/}
                    {/*    {*/}
                    {/*        locations.map(location => {*/}
                    {/*            // console.log(location);*/}
                    {/*            return <option value={location}>{location}</option>*/}
                    {/*        })*/}
                    {/*    }*/}
                    {/*</select>*/}
                    <label htmlFor="">Date</label>
                    <input type="date"
                           onChange={(e) => handleDate(e)}/>
                </div>
                <div><label htmlFor="">Time</label>
                    <select onChange={(e) => handleTime(e)} disabled={dateSelected === false}>
                        <option value="">Time</option>
                        {
                            mapTimes()
                        }
                    </select></div>
                <div>
                    <label htmlFor="">Status</label>
                    <select name="" id="" onChange={(e) => setStatus(e.target.value)} disabled>
                        <option value="pending">pending</option>
                        <option value="delivered">delivered</option>
                        <option value="cancelled">cancelled</option>
                    </select></div>
                <div>
                    <label htmlFor="">Notes</label>
                    <input type="text" name="" id="" placeholder={"notes"}
                           onChange={(e) => setNotes(e.target.value)}/></div>
                <button onClick={(e) => setCreateOpen(!createOpen)}>Cancel</button>
                <button onClick={() => handleSubmit()}>Submit</button>
            </div>
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