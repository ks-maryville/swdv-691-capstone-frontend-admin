import {Link, Outlet, useNavigate} from "react-router-dom";
import {useAuthContext} from "../context/AuthContext";
import moment from "moment";
import {useEffect, useState} from "react";

export function Dashboard(props) {
    const {user} = useAuthContext();
    console.log(props.location);
    // const getAuthenticated = async () => {
    //     let auth = await authenticated;
    //     return auth;
    // }
    // getAuthenticated().then(response => {
    //     setLoggedIn(response);
    // })
    //
    // if (loggedIn === false) {
    //     navigate("/")
    // }

     const contentStyles = {
            backgroundColor: "white",
            border: "1px solid navy",
            borderRadius: "15px",
            display: "inline-block",
            height: "50px",
            padding: "3%",
            marginTop: "50px"
     }

    return (
        <div style={{textAlign: "center"}}>
        <h2 style={{textAlign: "center", fontWeight: "bold"}}>Welcome! {user.email}</h2>
        <Link className={"dashboardLinks"} style={contentStyles} to={"/customers"}>CUSTOMERS</Link>
        <Link className={"dashboardLinks"} style={contentStyles} to={"/orders"}>ORDERS</Link>
        <Link className={"dashboardLinks"} style={contentStyles} to={"/appointments"}>APPOINTMENTS</Link>
        </div>
    )
}