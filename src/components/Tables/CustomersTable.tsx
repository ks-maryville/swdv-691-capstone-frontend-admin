import {CustomerProfileData, CustomerProfileArray} from "@/types/customerTypes";
import {randomUUID} from "crypto";
import * as querystring from "querystring";


export default function CustomersTable(profileData: CustomerProfileArray) {
    const mapData = (customerObject: CustomerProfileData)=>{
        return Object.keys(customerObject).map((key: string) => {
            if (key !== "addresses" && key !== "orders" && key !== "appointments") {
                return <td key={customerObject.profile_id + randomUUID()}>{customerObject[key]}</td>

            }
        })
    }
    const mappedCustomer = profileData.data.map((customer)=>{
        return (
            <tr key={customer.profile_id + randomUUID()}>{mapData(customer)}</tr>
        )
    })


    return (
        <table>
            <tbody>
            <tr>
                <th>id</th>
                <th>first name</th>
                <th>middle initial</th>
                <th>last name</th>
                <th>primary address</th>
                <th>email</th>
            </tr>

                {mappedCustomer}

            </tbody>
        </table>
    )
}
