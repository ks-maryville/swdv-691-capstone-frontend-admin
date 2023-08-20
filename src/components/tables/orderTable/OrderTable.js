import {useTable} from 'react-table';
import {COLUMNS} from "./columns";
import {useCustomerContext} from "../../../context/CustomerContext";
import {useMemo} from "react";
import {uuid} from "uuidv4";
import {useOrderContext} from "../../../context/OrderContext";

export const OrderTable = ({primary}) => {
    const {orders} = useOrderContext();
    // const formattedData = [];
    // if(customers !== null){
    //     console.log("CUSTOMERS IS NOT NULL", customers);
    //     customers.forEach(customer=>{
    //         let newCustomerObject = {
    //             profileID: customer.profileID,
    //             firstName: customer.firstName,
    //             lastName: customer.lastName,
    //             email: customer.user.email,
    //             phoneNumber: customer.phoneNumber !== null && customer.phoneNumber.number,
    //             date_created: customer.date_created,
    //             date_updated: customer.date_created
    //         }
    //         if(customer.address !== null){
    //             newCustomerObject.address = `${customer.address.address1} ${customer.address.address2} ${customer.address.city} , ${customer.address.state} ${customer.address.zipCode}`
    //         }
    //         formattedData.push(newCustomerObject);
    //     })
    // }
    // console.log(formattedData);
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => orders, [orders]);

    const table = useTable({
        columns: columns,
        data: data
    })

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = table;

    return (
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
                        <tr {...row.getRowProps()} key={uuid + row}>
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
    )
}