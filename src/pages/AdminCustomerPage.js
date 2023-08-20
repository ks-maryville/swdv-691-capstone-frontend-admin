import {useState} from "react";
import {useCustomerContext, UserCustomerContext} from "../context/CustomerContext";

export const AdminCustomerPage = () => {
    const [firstName, setfirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");

    const {customerSearch} = useCustomerContext();


    const handleSubmit = () => {
        // const searchObj = {
        //     "firstName": firstName,
        //     "lastName": lastName,
        //     "phoneNumber": phoneNumber,
        //     "email": email
        // }
        let strArray = [];
        if (firstName !== "") strArray.push(`firstName=${firstName}`);
        if (lastName !== "") strArray.push(`lastName=${lastName}`);
        if (phoneNumber !== "") strArray.push(`phoneNumber=${phoneNumber}`);
        if (email !== "") strArray.push(`email=${email}`);

        customerSearch(strArray);
    }
    return (
        <div className="customersPage">
            <input type="text" placeholder={"first name"} onChange={(e) => setfirstName(e.target.value)}/>
            <input type="text" placeholder={"last name"} onChange={(e) => setLastName(e.target.value)}/>
            <input type="text" placeholder={"phone number"} onChange={(e) => setPhoneNumber(e.target.value)}/>
            <input type="text" placeholder={"email"} onChange={(e) => setEmail(e.target.value)}/>
            <button onClick={() => handleSubmit()}>SEARCH</button>
            <div className="customerTable">


            </div>
            <div className="ordersTable"></div>
            <div className="appointmentsTable"></div>
        </div>
    )
}