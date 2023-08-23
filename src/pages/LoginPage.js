import {useEffect, useState} from "react";
import {useAuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import moment from "moment/moment";
import './loginStyles.css';

export function LoginPage() {
    const navigate = useNavigate();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const {login, logout, token, authenticated, refresh, message, } = useAuthContext();

    const handleSubmit = () => {
        let loginObject = {
            email: email,
            password: password
        }
        login(loginObject);
    }
    const refreshCheck = () => {

        // let decoded;
        // if (localStorage.getItem("token") !== null && localStorage.getItem("token") !== undefined) {
        //     let localToken = localStorage.getItem("token");
        //
        //     let decoded = JSON.parse(atob(localToken.split('.')[1]));
        //
        //     let currentTime = moment(moment(new Date())._i);
        //
        //     let expiration = moment.unix(decoded.exp)._i;
        //
        //     console.log(currentTime >= expiration._i)

        // if the current time is beyond the expiration date of the jwt, remove the
        // token and redirect to the login page
        //     if (currentTime >= expiration) {
        //
        //         logout().then(response => {
        //
        //             if (response) {
        //
        //                 navigate('/')
        //
        //             }
        //
        //         })
        //
        //     } else {
        //
        //         refresh(decoded.sub).then(response => {
        //
        //             if (response) {
        //
        //                 navigate("/dashboard");
        //
        //             }
        //
        //         });
        //
        //     }
        // }
    }

    useEffect(() => {
        if(token !== null && token !== undefined && token !== ""){
            navigate("/dashboard");
        }
    }, [token]);


    return (
        <main className={"loginPage"}>
            <div className="loginWrapper">
                <h1 className={"h1"}>Admin Panel</h1>
                <h2 className={"header"}>John Doe Furniture Company</h2>
                <input className={"loginInput"} type="text" placeholder={"email"} onChange={(e) => setEmail(e.target.value)}/>
                <input className={"loginInput"} type="text" placeholder={"password"} onChange={(e) => setPassword(e.target.value)}/>
                <button className={"loginSubmit"} onClick={handleSubmit}>Login</button>
                {Object.keys(message).length > 0 && <p className={"loginError"}>{message.authentication[0]}</p>}
            </div>
        </main>
    )
}