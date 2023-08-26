import {useTable} from 'react-table';
import {COLUMNS} from "./columns";
import {useCustomerContext} from "../../../context/CustomerContext";
import {useEffect, useMemo, useRef, useState} from "react";
import {uuid} from "uuidv4";
import {useOrderContext} from "../../../context/OrderContext";
import {useAppointmentContext} from "../../../context/AppointmentContext";
import {mccLogger} from "../../../customLogger";
import {CreateOrderModal} from "../../Order/CreateOrderModal";
import {ScheduleAppointmentModal} from "../../Appointment/ScheduleAppointmentModal";
import {UpdateAppointmentModal} from "../../Appointment/UpdateAppointmentModal";
import './styles.css';

export const AppointmentTable = ({appointmentPrimary, invoiceNumber, primaryTable}) => {
    const {
        appointments,
        setSelectedAppointment,
        selectedAppointment,
        clearSelectedAppointment
    } = useAppointmentContext();
    const {selectedOrder} = useOrderContext();
    const {getOrderByID} = useOrderContext();

    const {getCustomerByID} = useCustomerContext();

    const [isSelected, setIsSelected] = useState(false);
    const [selectedElement, setSelectedElement] = useState(null);

    const [createOpen, setCreateOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);


    const [createConditionsNotMet, setCreateConditionsNotMet] = useState(false);
    const [updateConditionsNotMet, setUpdateConditionsNotMet] = useState(false);

    const columns = useMemo(() => COLUMNS, []);

    const data = useMemo(() => appointments, [appointments]);

    const table = useTable({
        columns: columns,
        data: data
    })

    const handleSelect = async (row) => {
        const {original, id} = row;

        // store which element is selected
        // toggle element selected
        // setSelectedElement(id);
        // setIsSelected(true);

        if (isSelected && selectedElement === id) {
            setIsSelected(false);
            setSelectedElement(null);
            clearSelectedAppointment();
        } else {
            setSelectedElement(id);
            setIsSelected(true);
            setSelectedAppointment(original.appointmentID);
            fetchAppointment(original.appointmentID);
        }

        if (appointmentPrimary) {
            getOrderByID(original.orderID);
            getCustomerByID(original.profileID);
        }
        // fixed issue with selected appointment not available.
        // made selectAppointment return the found data as well as set it to appointment context so data
        // is made available immediately.
        // Working for now. Revisiting later as it could possibly cause unwanted side effects.
        // let selectAppointment = await setSelected(original.appointmentID);
        //
        //
        // if (selectAppointment !== null && Object.keys(selectAppointment).length > 0) {
        //
        //     if (appointmentPrimary) {
        //         getOrderByID(selectAppointment.orderID);
        //         getCustomerByID(selectAppointment.profileID);
        //     }
        //
        // }

        /*
        *
        *If the appointment table is primary
        *       get all orders associated with the apointments
        *       get the customer associated with the appointment
        * */
    }

    const fetchAppointment = async (appointmentID) => {


    }

    useEffect(() => {
        setSelectedElement(null);
        setIsSelected(null);
    }, [appointments]);

    useEffect(() => {
        if (createConditionsNotMet) {
            setTimeout(() => {
                setCreateConditionsNotMet(!createConditionsNotMet)
            }, 4000)
        }
    }, [createConditionsNotMet]);

    useEffect(() => {
        if (updateConditionsNotMet) {
            setTimeout(() => {
                setUpdateConditionsNotMet(!updateConditionsNotMet)
            }, 4000)
        }
    }, [updateConditionsNotMet]);

    const openCreateCheck = () => {
        if (JSON.stringify(selectedOrder) !== "{}") {
            setCreateOpen(!createOpen);
        } else {
            setCreateConditionsNotMet(!createConditionsNotMet);
        }
    }

    const openUpdateCheck = () => {
        if (JSON.stringify(selectedAppointment) !== "{}") {
            setUpdateOpen(!updateOpen);
        } else {
            setUpdateConditionsNotMet(!updateConditionsNotMet);
        }
    }


    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = table;

    return (
        <div className={"appointmentTable"}>
            <h2>{appointmentPrimary ? "Appointments" : "Associated Appointments"}</h2>
            <table {...getTableProps}>
                <thead>
                {
                    headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderProps}>
                            {
                                headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps}>{column.render('Header')}</th>
                                ))
                            }
                            <th></th>

                        </tr>
                    ))
                }
                </thead>

                <tbody {...getTableBodyProps}>

                {
                    rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr className={isSelected && selectedElement === row.id ? "selected" : null}{...row.getRowProps()}
                                key={uuid + row}
                                onClick={(e) => handleSelect(row)}>
                                {

                                    row.cells.map((cell) => {

                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })
                                }
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>


            <button
                onClick={() => openUpdateCheck()}>Update
            </button>

            {
                (primaryTable === "customer" || primaryTable === "order") && (
                    <button
                        onClick={() => openCreateCheck()}>Schedule
                        Appointment
                    </button>
                )
            }


            {
                createConditionsNotMet && <p style={{color: "red"}}>Must select an order to schedule an appointment</p>
            }
            {
                updateConditionsNotMet && <p style={{color: "red"}}>Must select an appointment to update</p>
            }
            {(JSON.stringify(selectedOrder) !== "{}" && createOpen) && (
                <>
                    <div className="background" onClick={() => setCreateOpen(!createOpen)}>

                    </div>

                    <ScheduleAppointmentModal createOpen={createOpen} setCreateOpen={setCreateOpen}/>
                </>
            )}
            {(JSON.stringify(selectedAppointment) !== "{}" && updateOpen) && (
                <>
                    <div className="background" onClick={() => setUpdateOpen(!updateOpen)}>

                    </div>
                    <UpdateAppointmentModal updateOpen={updateOpen} setUpdateOpen={setUpdateOpen}/>

                </>
            )}
        </div>

    )
}