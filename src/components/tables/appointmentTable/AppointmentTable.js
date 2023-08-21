import {useTable} from 'react-table';
import {COLUMNS} from "./columns";
import {useCustomerContext} from "../../../context/CustomerContext";
import {useMemo} from "react";
import {uuid} from "uuidv4";
import {useOrderContext} from "../../../context/OrderContext";
import {useAppointmentContext} from "../../../context/AppointmentContext";

export const AppointmentTable = ({appointmentPrimary, invoiceNumber}) => {
    const {appointments, setSelected} = useAppointmentContext();
    const {getOrderByID} = useOrderContext();
    const {getCustomerByID} = useCustomerContext();

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => appointments, [appointments]);

    const table = useTable({
        columns: columns,
        data: data
    })

    const handleSelect = async (appointmentID) => {
        let selectAppointment = await setSelected(appointmentID);
        if (selectAppointment === true) {

            if (appointmentPrimary) {
                getOrderByID(selectAppointment.orderID);
                getCustomerByID(selectAppointment.profileID);
            }

        }

        /*
        *
        *If the appointment table is primary
        *       get all orders associated with the apointments
        *       get the customer associated with the appointment
        * */
    }
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
                        // console.log(row);
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={uuid + row} onClick={()=>handleSelect(row.original.appointmentID)}>
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
            <button>Schedule Appointment</button>
        </div>

    )
}