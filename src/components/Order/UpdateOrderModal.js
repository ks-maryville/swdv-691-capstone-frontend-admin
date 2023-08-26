import {useCustomerContext} from "../../context/CustomerContext";
import {useState} from "react";
import {states} from "../../states";
import {useOrderContext} from "../../context/OrderContext";
import {locations} from "../../locations";
export const UpdateOrderModal = ({updateOpen, setUpdateOpen})=>{
    const {createOrder ,message, updateOrder, selectedOrder, updateStatus} = useOrderContext();
    const {selectedCustomer} = useCustomerContext();

    const [invoiceNumber, setInvoiceNumber] = useState(selectedOrder.invoiceNumber);
    const [status, setStatus] = useState(selectedOrder.status);
    const [location, setLocation] = useState(selectedOrder.location);


    const handleSubmit = () => {

        const orderObject = {
            orderID: selectedOrder.orderID,
            invoiceNumber: invoiceNumber,
            status: status,
            location: location,
            profileID: selectedCustomer.profileID,
        }


        updateOrder(orderObject).then(response=>{
            if(response === true){
                setUpdateOpen(!updateOpen);
            }
        })

        if(status !== selectedOrder.status){
            updateStatus(selectedOrder.orderID, status)
        }
    }

    return (

        // <div className={"background"} onClick={() => setCreateOpen()}>

        <div className={"wrapper"}>


            <div className={"left"}>

                <div>
                    <div>
                        <label htmlFor="">Invoice # </label>
                        <input type="text" name="" id="" placeholder={"invoice number"} value={invoiceNumber}
                               onChange={(e) => setInvoiceNumber(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="">Status</label>
                        <select name="" id="" onChange={(e)=>setStatus(e.target.value)} value={status} >
                            <option value="pending">pending</option>
                            <option value="arrived">arrived</option>
                            <option value="delivered">delivered</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="">Location</label>
                        <select name="" id="" value={location} onChange={(e)=>setLocation(e.target.value)}>
                            <option value="">Location</option>
                            {
                                locations.map(location=>{
                                    return <option value={location}>{location}</option>
                                })
                            }
                        </select>
                    </div>

                </div>
                <button onClick={(e)=>setUpdateOpen(!updateOpen)}>Cancel</button>
                <button onClick={() => handleSubmit()}>Submit</button>

            </div>
            <div className={"right error"}>
                {Object.keys("message").length > 0 && message.invoiceNumber ? message.invoiceNumber.map(item=> <p style={{color: "red"}}>{item}</p>): null}
                {Object.keys("message").length > 0 && message.status ? message.status.map(item=> <p style={{color: "red"}}>{item}</p>): null}
                {Object.keys("message").length > 0 && message.location ? message.location.map(item=> <p style={{color: "red"}}>{item}</p>): null}
            </div>
        </div>


    )
}