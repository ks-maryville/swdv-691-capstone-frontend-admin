import {useTable} from 'react-table';
import {COLUMNS} from "./columns";
import {useEffect, useMemo, useState} from "react";
import {uuid} from "uuidv4";
import {useOrderContext} from "../../../context/OrderContext";
import {useAppointmentContext} from "../../../context/AppointmentContext";
import {useCustomerContext} from "../../../context/CustomerContext";
import {CreateOrderModal} from "../../Order/CreateOrderModal";
import {UpdateOrderModal} from "../../Order/UpdateOrderModal";
import {create} from "axios";

export const OrderTable = ({orderPrimary}) => {
    const {orders, setSelected, selectedOrder, clearSelected} = useOrderContext();
    const {getAppointmentsByOrderID, clearAppointments} = useAppointmentContext();
    const {getCustomerByID, selectedCustomer} = useCustomerContext();


    const [isSelected, setIsSelected] = useState(false);
    const [selectedElement, setSelectedElement] = useState(null);

    const [createOpen, setCreateOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);

    const columns = useMemo(() => COLUMNS, []);

    const data = useMemo(() => orders, [orders]);


    const table = useTable({
        columns: columns,
        data: data
    })

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = table;

    const handleSelect = async (row) => {
        const {original, id} = row;

        if(isSelected && selectedElement === id){
            setIsSelected(false);
            setSelectedElement(null);
            clearSelected();
            clearAppointments();
        }else{
            setSelectedElement(id);
            setIsSelected(true);
            fetchOrder(original.orderID);
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

    const fetchOrder = async (orderID)=>{

        let selectOrder = await setSelected(orderID);
        if(selectOrder !== null || Object.keys(selectOrder).length > 0) {
            getAppointmentsByOrderID(orderID);

            if(orderPrimary) {
                getCustomerByID(selectOrder.profileID);
            }
        }
    }

    useEffect(() => {
        setSelectedElement(null);
        setIsSelected(false);
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
            <button onClick={JSON.stringify(selectedOrder) !== "{}" ? () => setUpdateOpen(!updateOpen) : null}>Update
            </button>

            {
                !orderPrimary && (
                    <button
                        onClick={() => setCreateOpen(JSON.stringify(selectedCustomer) !== "{}" ? !createOpen : createOpen)}>Create
                        Order
                    </button>
                )
            }

            {(JSON.stringify(selectedCustomer) !== "{}" && createOpen) && (
                <>
                    <div className="background" onClick={() => setCreateOpen(!createOpen)}>

                    </div>

                    <CreateOrderModal createOpen={createOpen} setCreateOpen={setCreateOpen}/>
                </>
            )}
            {JSON.stringify(selectedOrder) !== "{}" && updateOpen ? (
                <>
                    <div className="background" onClick={() => setUpdateOpen(!updateOpen)}>

                    </div>

                    <UpdateOrderModal updateOpen={updateOpen} setUpdateOpen={setUpdateOpen}/>

                </>
            ) : null }

        </div>

    )
}