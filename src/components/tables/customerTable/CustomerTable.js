import {useTable} from 'react-table';
import {COLUMNS} from "./columns";
import {useCustomerContext} from "../../../context/CustomerContext";
import {useEffect, useMemo, useState} from "react";
import {uuid} from "uuidv4";
import {OrderTable} from "../orderTable/OrderTable";
import {useOrderContext} from "../../../context/OrderContext";

import {AppointmentTable} from "../appointmentTable/AppointmentTable";
import {useAppointmentContext} from "../../../context/AppointmentContext";
import {create} from "axios";
import {CreateCustomerModal} from "../../Customer/CreateCustomerModal";
import {UpdateCustomerModal} from "../../Customer/UpdateCustomerModal";
import './styles.css'
export const CustomerTable = ({customerPrimary}) => {

    const {customers, selectedCustomer, setSelectedCustomer, clearSelectedCustomer} = useCustomerContext();
    const {getOrdersByProfileID, selectedOrder, clearOrders} = useOrderContext();
    const {clearAppointments} = useAppointmentContext();

    const [isSelected, setIsSelected] = useState(null);
    const [selectedElement, setSelectedElement] = useState(null);

    const [createOpen, setCreateOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [updateConditionsNotMet, setUpdateConditionsNotMet] = useState(false);

    const formattedData = [];

    if (customers !== null) {

        customers.forEach(customer => {
            let newCustomerObject = {
                profileID: customer.profileID,
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.user.email,
                address1: customer.address1,
                address2: customer.address2,
                city: customer.city,
                state: customer.state,
                zipCode: customer.zipCode,
                phoneNumber: customer.phoneNumber,
                phoneType: customer.phoneType
            }

            formattedData.push(newCustomerObject);
        })
    }


    const columns = useMemo(() => COLUMNS, []);

    const data = useMemo(() => formattedData, [formattedData]);


    const table = useTable({
        columns: columns,
        data: data
    })

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = table;

    const handleSelect = async (e, row) => {
        const {original, id} = row;

        if (isSelected && selectedElement === id) {
            setIsSelected(false);
            setSelectedElement(null);
            clearSelectedCustomer();
        } else {
            setSelectedElement(id);
            setIsSelected(true);
            fetchCustomer(original.profileID);
        }


        /*
        *
        * if the customer table is primary
        *       get orders by the profile id of the selected customer
        *
        * if the customer is NOT primary
        *       simply set the selected customer and nothing else.
        * */
    }

    const fetchCustomer = async (profileID) => {
        let selectCustomer = await setSelectedCustomer(profileID);
        if (selectCustomer === true) {

            if (customerPrimary) {
                clearAppointments();
                clearOrders();
                getOrdersByProfileID(profileID);
            }
        }
    }

    const openUpdateCheck = ()=>{
        console.log("open update check")
        if(JSON.stringify(selectedCustomer) !== "{}"){
            setUpdateOpen(!updateOpen);
        }else{
            console.log("conditions not met")
            setUpdateConditionsNotMet(!updateConditionsNotMet);

        }
        // setTimeout(()=>{
        //     console.log("settimeout")
        //     setUpdateConditionsNotMet(!updateConditionsNotMet)
        // }, 2000);
    }

    useEffect(() => {
        setSelectedElement(null);
        setIsSelected(null);
    }, [customers]);

    useEffect(() => {
        if(updateConditionsNotMet){
            setTimeout(()=>{
                setUpdateConditionsNotMet((!updateConditionsNotMet))
            },4000)
        }
    }, [ updateConditionsNotMet]);



    return (
        <div className={"customerTable"}>
            <h2>{customerPrimary ? `Customers` : 'Associated Customer'}</h2>
            <table {...getTableProps}>
                <thead>
                {

                    headerGroups.map((headerGroup) => {
                        // console.log(headerGroup)
                        return (
                            <tr {...headerGroup.getHeaderProps}>
                                {
                                    headerGroup.headers.map(column => {
                                        // console.log(column);
                                        return (
                                            <th {...column.getHeaderProps}
                                                key={column.Header}>{column.render('Header')}</th>
                                        )
                                    })
                                }
                                <th></th>

                            </tr>
                        )
                    })
                }
                </thead>

                <tbody {...getTableBodyProps}>

                {
                    rows.map((row) => {
                        // console.log(row)
                        prepareRow(row);
                        return (
                            <tr className={isSelected && selectedElement === row.id ? "selected" : null}{...row.getRowProps()}
                                key={row.original.email}
                                onClick={(e) => handleSelect(e, row)}>
                                {
                                    row.cells.map((cell) => {
                                        // console.log(cell)
                                        return <td {...cell.getCellProps()}
                                                   key={cell.row.original.id}>{cell.render('Cell')}</td>
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
                customerPrimary && (
                    <button onClick={() => setCreateOpen(!createOpen)}>New Customer</button>
                )
            }
            {updateConditionsNotMet && <p style={{color: "red"}}>Must select a customer to update</p>}
            {createOpen && (
                <>
                    <div className={"background"} onClick={() => setCreateOpen(!createOpen)}></div>

                    <CreateCustomerModal createOpen={createOpen} setCreateOpen={setCreateOpen}/>
                </>
            )
            }
            {JSON.stringify(selectedCustomer) !== "{}" && updateOpen ? (
                <>
                    <div className={"background"} onClick={() => setUpdateOpen(!updateOpen)}></div>

                    <UpdateCustomerModal updateOpen={updateOpen} setUpdateOpen={setUpdateOpen}/>
                </>
            ) : null
            }

        </div>

    )
}