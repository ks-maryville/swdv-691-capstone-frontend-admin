import {randomUUID} from "crypto";
import {OrderData, OrderDataArray} from "@/types/orderTypes";
import {CustomerProfileArray} from "@/types/customerTypes";


export default function OrdersTable(profileData: CustomerProfileArray) {

    const getOrders = (): OrderDataArray => {
        let orders: OrderDataArray = [];
        profileData.data.forEach((profile) => {
            profile.orders.map((order: OrderData) => {
                orders.push(order);
            })
        })
        return orders;
    }


    const mapData = (orderObject: OrderData)=>{
        return Object.keys(orderObject).map((key: string) => {

                return <td key={orderObject.order_id + randomUUID()}>{orderObject[key].toString()}</td>


        })
    }
    const mappedOrder = getOrders().map((order: OrderData)=>{
        return (
            <tr key={order.order_id + randomUUID()}>{mapData(order)}</tr>
        )
    })


    return (
        <table>
            <tbody>
            <tr>
                <th>id</th>
                <th>invoice number</th>
                <th>status</th>
                <th>location</th>
                <th>date created</th>
            </tr>

            {mappedOrder}

            </tbody>
        </table>
    )
}
