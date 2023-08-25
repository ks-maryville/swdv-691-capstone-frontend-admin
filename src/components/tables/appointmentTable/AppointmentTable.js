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

export const AppointmentTable = ({appointmentPrimary, invoiceNumber}) => {
    const {appointments, setSelected, selectedAppointment, clearSelected} = useAppointmentContext();
    const {selectedOrder} = useOrderContext();
    const {getOrderByID} = useOrderContext();

    const {getCustomerByID} = useCustomerContext();

    const [isSelected, setIsSelected] = useState(false);
    const [selectedElement, setSelectedElement] = useState(null);

    const [createOpen, setCreateOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);

    const columns = useMemo(() => COLUMNS, []);

    const data = useMemo(() => appointments, [appointments]);

    const table = useTable({
        columns: columns,
        data: data
    })

    const handleSelect = async ( row) => {
        const {original, id} = row;

        // store which element is selected
        // toggle element selected
        // setSelectedElement(id);
        // setIsSelected(true);

        if(isSelected && selectedElement === id){
            setIsSelected(false);
            setSelectedElement(null);
            clearSelected();
        }else {
            setSelectedElement(id);
            setIsSelected(true);
            fetchAppointment(original.appointmentID);
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

    const fetchAppointment = async (appointmentID)=>{
        let selectAppointment = await setSelected(appointmentID);
        if(selectAppointment === true){

            if(appointmentPrimary){
                getOrderByID(selectedAppointment.orderID);
                getCustomerByID(selectedAppointment.profileID);
            }
        }
    }

    useEffect(() => {
        setSelectedElement(null);
        setIsSelected(null);
    }, [appointments]);

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = table;

    return (
        <div>
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
                                onClick={(e) => handleSelect(row)} >
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
            <button>Update</button>
            <button onClick={()=>setCreateOpen(JSON.stringify(selectedOrder) !== "{}" ? !createOpen : createOpen)}>Schedule Appointment</button>
            {(JSON.stringify(selectedOrder) !== "{}" && createOpen) && (
                <>
                    <div className="background" onClick={() => setCreateOpen(!createOpen)}>

                    </div>

                    <ScheduleAppointmentModal createOpen={createOpen} setCreateOpen={setCreateOpen}/>
                </>
            )}
        </div>

    )
}