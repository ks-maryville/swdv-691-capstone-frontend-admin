import {useTable} from 'react-table';
import {COLUMNS} from "./columns";
import {useEffect, useMemo, useState} from "react";
import {uuid} from "uuidv4";
import {useOrderContext} from "../../../context/OrderContext";
import {useAppointmentContext} from "../../../context/AppointmentContext";
import {useCustomerContext} from "../../../context/CustomerContext";

export const OrderTable = ({customerPrimary, orderPrimary, appointmentPrimary, customerName}) => {

    const {orders, setSelected, selectedOrder} = useOrderContext();


    const {getAppointmentsByOrderID} = useAppointmentContext();

    const {getCustomerByID} = useCustomerContext();

    const [isSelected, setIsSelected] = useState(null);

    const [selectedElement, setSelectedElement] = useState(null);

    const columns = useMemo(() => COLUMNS, []);

    const data = useMemo(() => orders, [orders]);


    const table = useTable({
        columns: columns,
        data: data
    })

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = table;

    const handleSelect = async (row) => {
        const {original, id} = row;
        console.log(row);
        setSelectedElement(id);
        setIsSelected(true);


        let selectOrder = await setSelected(original.orderID);
        if (selectOrder !== null || Object.keys(selectOrder).length > 0) {
            getAppointmentsByOrderID(original.orderID);

            if (orderPrimary) {
                getCustomerByID(selectOrder.profileID);
            }
        }

        /*
        *
        * if the order table is primary
        *   get appointments using the selected order ID
        *   also get the customer associated with the the order
        *
        * if the appointment table is primary
        *   set the selected order
        * */


    }

    useEffect(() => {
        setSelectedElement(null);
        setIsSelected(null);
    }, [orders]);

    return (
        <div>
            <h2>{orderPrimary ? "Orders" : "Associated Orders"}</h2>
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
                            <tr className={isSelected && selectedElement === row.id ? "selected" : null} {...row.getRowProps()}
                                key={uuid + row} onClick={() => handleSelect(row)}>
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
            <button>Create Order</button>
        </div>

    )
}