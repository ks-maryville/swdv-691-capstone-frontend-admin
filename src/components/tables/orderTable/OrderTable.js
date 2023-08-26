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
import './styles.css';
export const OrderTable = ({orderPrimary, primaryTable}) => {
    const {orders, setSelectedOrder, selectedOrder, clearSelectedOrder} = useOrderContext();
    const {getAppointmentsByOrderID, clearAppointments} = useAppointmentContext();
    const {getCustomerByID, selectedCustomer,setSelectedCustomer, clearCustomers} = useCustomerContext();


    const [isSelected, setIsSelected] = useState(false);
    const [selectedElement, setSelectedElement] = useState(null);

    const [createOpen, setCreateOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [createConditionsNotMet, setCreateConditionsNotMet] = useState(false);
    const [updateConditionsNotMet, setUpdateConditionsNotMet] = useState(false);


    const columns = useMemo(() => COLUMNS, []);

    const data = useMemo(() => orders, [orders]);


    const table = useTable({
        columns: columns,
        data: data
    })

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = table;

    const handleSelect =  (row) => {
        console.log("HANDLE SELECT IS BEING CALLED");
        const {original, id} = row;

        if (isSelected && selectedElement === id) {
            setIsSelected(false);
            setSelectedElement(null);
            clearSelectedOrder();
            clearAppointments();
        } else {
            setSelectedElement(id);
            setIsSelected(true);
            setSelectedOrder(original.orderID);

            fetchOrder(original.orderID);
        }

        if (orderPrimary) {
            getCustomerByID(original.profileID);
            setSelectedCustomer(original.profileID);
            clearCustomers();
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

    const fetchOrder = (orderID) => {

        console.log(selectedOrder.profileID);
        getAppointmentsByOrderID(orderID);
    }

    const openCreateCheck = ()=>{
        if(JSON.stringify(selectedCustomer) !== "{}"){
            setCreateOpen(!createOpen);
        }else{
            setCreateConditionsNotMet(!createConditionsNotMet);
        }
    }

    const openUpdateCheck = ()=>{
        if(JSON.stringify(selectedOrder) !== "{}"){
            setUpdateOpen(!updateOpen);
        }else{
            setUpdateConditionsNotMet(!updateConditionsNotMet);
        }
    }
    useEffect(() => {


        // setSelectedElement(null);
        // setIsSelected(false);

    }, [selectedOrder, orders]);

    useEffect(() => {
        if(createConditionsNotMet){
            setTimeout(()=>{
                setCreateConditionsNotMet(!createConditionsNotMet)
            },4000)
        }
    }, [ createConditionsNotMet]);

    useEffect(() => {
        if(updateConditionsNotMet){
            setTimeout(()=>{
                setUpdateConditionsNotMet(!updateConditionsNotMet)
            },4000)
        }
    }, [ updateConditionsNotMet]);


    return (
        <div className={"orderTable"}>
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
            <button onClick={()=>openUpdateCheck()}>Update
            </button>

            {
                (( primaryTable === "customer") && (
                    <button
                        onClick={() => openCreateCheck()}>Create
                        Order
                    </button>
                ))
            }

            {
                createConditionsNotMet && <p style={{color:"red"}}>Must select a customer to create order</p>
            }
            {
                updateConditionsNotMet && <p style={{color:"red"}}>Must select an order to update</p>
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
            ) : null}

        </div>

    )
}