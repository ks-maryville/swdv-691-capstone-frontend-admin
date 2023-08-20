import {useTable} from 'react-table';
import {COLUMNS} from "./columns";
import {useMemo} from "react";
import {uuid} from "uuidv4";
import {useOrderContext} from "../../../context/OrderContext";
import {useAppointmentContext} from "../../../context/AppointmentContext";

export const OrderTable = ({customerPrimary, orderPrimary, AppointmentPrimary, customerName}) => {

    const {orders, setSelected, selectedOrder} = useOrderContext();
    console.log(orders);
    const {getAppointmentsByOrderID} = useAppointmentContext();

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => orders, [orders]);

    const table = useTable({
        columns: columns,
        data: data
    })

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = table;

    const handleSelect = async (orderID) => {
        let selectedOrder = await setSelected(orderID);
        if (selectedOrder === true) {
            getAppointmentsByOrderID(orderID);
        }
    }


    return (
        <div>
            <h2>{orderPrimary ? "Orders" : "Associated Orders" }</h2>
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
                        console.log(row);
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={uuid + row} onClick={()=>handleSelect(row.original.orderID)}>
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