import {useState} from "react";
import {states} from "../../states";
import './styles.css';
import {useCustomerContext} from "../../context/CustomerContext";

export const CreateCustomerModal = ({createOpen, setCreateOpen}) => {

    const {createCustomer, message} = useCustomerContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");

    const [firstName, setFirstName] = useState("");
    const [middleInitial, setMiddleInitial] = useState("");
    const [lastName, setLastName] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneType, setPhoneType] = useState("");

    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");

    // temporary error solution
    const [error, setError] = useState("");
    const role = "USER";

    const handleSubmit = () => {

        const registrationObject = {
            email: email,
            password: password,
            verifyPassword: verifyPassword,
            role: role,
            firstName: firstName,
            middleInitial: middleInitial,
            lastName: lastName,
            phoneNumber: phoneNumber,
            phoneType: phoneType,
            address1: address1,
            address2: address2,
            city: city,
            state: state,
            zipCode: zipCode
        }


        createCustomer(registrationObject).then(response => {
            if (response === true) {
                setCreateOpen(!createOpen);
            }
        })

    }

    return (

        // <div className={"background"} onClick={() => setCreateOpen()}>

        <div className={"wrapper"}>


            <div className={"left"}>
                <div>
                    <label htmlFor="">Email</label>
                    <input type="text" name="" id="" placeholder={"email"} onChange={(e) => setEmail(e.target.value)}/>
                </div>


                <div>
                    <label htmlFor="">Password</label>
                    <input type="text" name="" id="" placeholder={"password"}
                          onChange={(e) => setPassword(e.target.value)}/></div>
                <div>
                    <label htmlFor="">Verify Password</label>
                    <input type="text" name="" id="" placeholder={"verify password"}
                          onChange={(e) => setVerifyPassword(e.target.value)}/></div>


                <div>
                    <label htmlFor="">First Name</label>
                    <input type="text" name="" id="" placeholder={"first name"}
                           onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="">Middle Initial</label>
                    <input type="text" name="" id="" placeholder={"middle initial"}
                            onChange={(e) => setMiddleInitial(e.target.value)}/></div>
                <div><input type="text" name="" id="" placeholder={"last name"}
                            onChange={(e) => setLastName(e.target.value)}/></div>


                <div>
                    <label htmlFor="">Phone Number</label>
                    <input type="text" placeholder={"phone number"} onChange={(e) => setPhoneNumber(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="">Phone Type</label>
                    <select name="" id="" onChange={(e) => setPhoneType(e.target.value)}>
                    <option value="">Phone Type</option>
                    <option value="MOBILE">MOBILE</option>
                    <option value="LANDLINE">LANDLINE</option>
                </select></div>

                <div>
                    <label htmlFor="">Addres1</label>
                    <input type="text" placeholder={"address1"} onChange={(e) => setAddress1(e.target.value)}/></div>
                <div>
                    <label htmlFor="">Address2</label>
                    <input type="text" placeholder={"address2"} onChange={(e) => setAddress2(e.target.value)}/></div>
                <div>
                    <label htmlFor="">City</label>
                    <input type="text" placeholder={"city"} onChange={(e) => setCity(e.target.value)}/></div>
                <div>
                    <label htmlFor="">State</label>
                    <select name="" id="" onChange={(e) => setState(e.target.value)}>
                    <option value="">state</option>
                    {
                        states.map(state => {
                            return <option value={state}>{state}</option>
                        })
                    }
                </select></div>

                <div>
                    <label htmlFor="">Zip Code</label>
                    <input type="text" placeholder={"zip code"} onChange={(e) => setZipCode(e.target.value)}/>
                </div>

                <button onClick={(e) => setCreateOpen(!createOpen)}>Cancel</button>
                <button onClick={() => handleSubmit()}>Submit</button>
            </div>
            <div className={"right error"}>
                {Object.keys("message").length > 0 && message.email ? message.email.map(item => <p
                    style={{color: "red"}}>{item}</p>) : null}
                {Object.keys("message").length > 0 && message.password ? message.password.map(item => <p
                    style={{color: "red"}}>{item}</p>) : null}
                {Object.keys("message").length > 0 && message.verifyPassword ? message.verifyPassword.map(item => <p
                    style={{color: "red"}}>{item}</p>) : null}
                {Object.keys("message").length > 0 && message.firstName ? message.firstName.map(item => <p
                    style={{color: "red"}}>{item}</p>) : null}
                {Object.keys("message").length > 0 && message.lastName ? message.lastName.map(item => <p
                    style={{color: "red"}}>{item}</p>) : null}
                {Object.keys("message").length > 0 && message.phoneNumber ? message.phoneNumber.map(item => <p
                    style={{color: "red"}}>{item}</p>) : null}
                {Object.keys("message").length > 0 && message.phoneType ? message.phoneType.map(item => <p
                    style={{color: "red"}}>{item}</p>) : null}
                {Object.keys("message").length > 0 && message.address1 ? message.address1.map(item => <p
                    style={{color: "red"}}>{item}</p>) : null}
                {Object.keys("message").length > 0 && message.city ? message.city.map(item => <p
                    style={{color: "red"}}>{item}</p>) : null}
                {Object.keys("message").length > 0 && message.state ? message.state.map(item => <p
                    style={{color: "red"}}>{item}</p>) : null}
                {Object.keys("message").length > 0 && message.zipCode ? message.zipCode.map(item => <p
                    style={{color: "red"}}>{item}</p>) : null}
            </div>
        </div>


    )
}