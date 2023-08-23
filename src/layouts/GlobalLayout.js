import {useEffect, useState} from "react";
import {useAuthContext} from "../context/AuthContext";
import {Outlet, useNavigate} from "react-router-dom";

export function GlobalLayout() {

    return (
        <main className={"app"}>
            "HELLO"
            <Outlet/>
        </main>
    )

}