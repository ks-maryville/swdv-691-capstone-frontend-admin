import {useEffect, useState} from "react";
import {useAuthContext} from "../context/AuthContext";
import {Outlet, useNavigate} from "react-router-dom";

export function GlobalLayout() {
    const navigate = useNavigate();
    const {token, authenticated, login, logout} = useAuthContext();

    useEffect(() => {
        if(token !== null && token !== undefined && token !== ""){
            navigate("/dashboard");
        }
    }, [token]);
    return (
        <main className={"app"}>
            "HELLO"
            <Outlet/>
        </main>
    )

}