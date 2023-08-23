import {useState} from "react";
import {states} from "../../states";
import './styles.css';
import {useCustomerContext} from "../../context/CustomerContext";

export const UpdateCustomerModal = ({updateOpen, setUpdateOpen}) => {

    const {updateCustomer, message, selectedCustomer} = useCustomerContext();

    const profileID = selectedCustomer.profileID
    const [email, setEmail] = useState(selectedCustomer.email);
    const [firstName, setFirstName] = useState(selectedCustomer.firstName);
    const [middleInitial, setMiddleInitial] = useState(selectedCustomer.middleInitial);
    const [lastName, setLastName] = useState(selectedCustomer.lastName);
    const [phoneNumber, setPhoneNumber] = useState(selectedCustomer.phoneNumber);
    const [phoneType, setPhoneType] = useState(selectedCustomer.phoneType);
    const userID = selectedCustomer.userID;
    const [address1, setAddress1] = useState(selectedCustomer.address1)
    const [address2, setAddress2] = useState(selectedCustomer.address2)
    const [city, setCity] = useState(selectedCustomer.city);
    const [state, setState] = useState(selectedCustomer.state);
    const [zipCode, setZipCode] = useState(selectedCustomer.zipCode);
    const role = "USER";

    const handleSubmit = () => {

        const updateObject = {
            profileID: profileID,
            userID: userID,
            // email: email,
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


        updateCustomer(updateObject).then(response => {
            if (response === true) {
                setUpdateOpen(!updateOpen);
            }
        })

    }

    return (

        // <div className={"background"} onClick={() => setCreateOpen()}>

        <div className={"wrapper"}>


            <div className={"left"}>
                <div>
                    <input type="text" name="" id="" value={email} placeholder={"email"} onChange={(e) => setEmail(e.target.value)}/>
                </div>


                <div>
                    <input type="text" name="" id="" value={firstName} placeholder={"first name"}
                           onChange={(e) => setFirstName(e.target.value)}/>
                    <input type="text" name="" id="" value={middleInitial} placeholder={"middle initial"}
                           onChange={(e) => setMiddleInitial(e.target.value)}/>
                    <input type="text" name="" id="" value={lastName} placeholder={"last name"}
                           onChange={(e) => setLastName(e.target.value)}/>
                </div>


                <div>
                    <input type="text" placeholder={"phone number"} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                    <select name="" id=""  value={phoneType} onChange={(e) => setPhoneType(e.target.value)}>
                        <option value="">Phone Type</option>
                        <option value="MOBILE">MOBILE</option>
                        <option value="LANDLINE">LANDLINE</option>
                    </select>
                </div>

                <div>
                    <input type="text" placeholder={"address1"} value={address1} onChange={(e) => setAddress1(e.target.value)}/>
                    <input type="text" placeholder={"address2"} value={address2} onChange={(e) => setAddress2(e.target.value)}/>
                    <input type="text" placeholder={"city"} value={city} onChange={(e) => setCity(e.target.value)}/>
                    <select name="" id=""  value={state} onChange={(e) => setState(e.target.value)}>
                        <option value="">state</option>
                        {
                            states.map(state => {
                                return <option value={state}>{state}</option>
                            })
                        }
                    </select>
                </div>

                <input type="text" placeholder={"zip code"} value={zipCode} onChange={(e) => setZipCode(e.target.value)}/>

                <button>Cancel</button>
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