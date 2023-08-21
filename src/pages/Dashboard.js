import {Link, Outlet, useNavigate} from "react-router-dom";
import {useAuthContext} from "../context/AuthContext";
import moment from "moment";
import {useEffect, useState} from "react";

export function Dashboard() {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const {logout, refresh, authenticated} = useAuthContext();


    // const getAuthenticated = async () => {
    //     let auth = await authenticated;
    //     return auth;
    // }
    // getAuthenticated().then(response => {
    //     setLoggedIn(response);
    // })
    //
    // if (loggedIn === false) {
    //     console.log("NOT LOGGED IN")
    //     navigate("/")
    // }
    const handleLogout = ()=>{
        logout();
        navigate("/");
    }


    return (
        <div>
           <button onClick={()=>handleLogout()}>Logout</button>
            <Link to={"/customers"}>Customers</Link>
            <Link to={"/orders"}>Orders</Link>
        </div>
    )
}