import {useCustomerContext} from "../../context/CustomerContext";
import {useState} from "react";
import {states} from "../../states";
import {useOrderContext} from "../../context/OrderContext";
import {locations} from "../../locations";
export const CreateOrderModal = ({createOpen, setCreateOpen})=>{
    const {createOrder ,message} = useOrderContext();
    const {selectedCustomer} = useCustomerContext();

    const [invoiceNumber, setInvoiceNumber] = useState("");
    const [status, setStatus] = useState("pending");
    const [location, setLocation] = useState("");


    const handleSubmit = () => {

        const orderObject = {
            invoiceNumber: invoiceNumber,
            status: status,
            location: location,
            profileID: selectedCustomer.profileID,
        }


        createOrder(orderObject).then(response=>{
            if(response === true){
                setCreateOpen(!createOpen);
            }
        })

    }

    return (

        // <div className={"background"} onClick={() => setCreateOpen()}>

        <div className={"wrapper"}>


            <div className={"left"}>

                <div>
                    <input type="text" name="" id="" placeholder={"invoice number"}
                           onChange={(e) => setInvoiceNumber(e.target.value)}/>
                    <select name="" id="" onChange={(e)=>setStatus(e.target.value)} disabled>
                        <option value="pending">pending</option>
                        <option value="arrived">arrived</option>
                        <option value="delivered">delivered</option>
                    </select>
                    <select name="" id="" onChange={(e)=>setLocation(e.target.value)}>
                        <option value="">Location</option>
                        {
                            locations.map(location=>{
                                return <option value={location}>{location}</option>
                            })
                        }
                    </select>
                </div>
                <button>Cancel</button>
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