import {useTable} from 'react-table';
import {COLUMNS} from "./columns";
import {useCustomerContext} from "../../../context/CustomerContext";
import {useEffect, useMemo} from "react";
import {uuid} from "uuidv4";
import {OrderTable} from "../orderTable/OrderTable";
import {useOrderContext} from "../../../context/OrderContext";
import '../tableStyles.css';
import {AppointmentTable} from "../appointmentTable/AppointmentTable";
export const CustomerTable = ({customerPrimary}) => {
    console.log(customerPrimary);
    const {customers, selectedCustomer, setSelected} = useCustomerContext();
    const {getOrdersByProfileID, selectedOrder} = useOrderContext();
    const formattedData = [];
    if (customers !== null) {
        console.log("CUSTOMERS IS NOT NULL", customers);
        customers.forEach(customer => {
            let newCustomerObject = {
                profileID: customer.profileID,
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.user.email,
                phoneNumber: customer.phoneNumber !== null && customer.phoneNumber.number,
                date_created: customer.date_created,
                date_updated: customer.date_created
            }
            if (customer.address !== null) {
                newCustomerObject.address = `${customer.address.address1} ${customer.address.address2} ${customer.address.city} , ${customer.address.state} ${customer.address.zipCode}`
            }
            formattedData.push(newCustomerObject);
        })
    }
    console.log(formattedData);
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => formattedData, [formattedData]);

    const table = useTable({
        columns: columns,
        data: data
    })

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = table;

    const handleSelect = async (profileID) => {
        let selectCustomer = await setSelected(profileID);
        if (selectCustomer === true) {
            getOrdersByProfileID(profileID);
        }
    }
    useEffect(() => {

    }, []);
    return (
        <div>
            <h2>{customerPrimary  ? `Customers` : 'Associated Customer'}</h2>
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
                            <tr {...row.getRowProps()} key={uuid + row}
                                onClick={(e) => handleSelect(row.original.profileID)}>
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
            <button>New Customer</button>

        </div>

    )
}