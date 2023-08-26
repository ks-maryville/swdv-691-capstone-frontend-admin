import {useLocation, Navigate, Outlet, useNavigate} from 'react-router-dom';
import {useAuthContext} from "./context/AuthContext";
import {Nav} from "./components/Nav/Nav";
import {useEffect} from "react";

export const Protected = () => {
    const {user, refresh, token} = useAuthContext();
    const location = useLocation();
    const navigate = useNavigate()
    console.log(user);

    useEffect(() => {
        // refresh();

    }, []);
    return (
        <div>
            <Nav/>

            <div className={"container"}>
                {(user !== null && JSON.stringify(user) !== "{}") && user.role === "ADMIN" ? <Outlet/>
                    : <Navigate to={"/"} state={{from: location}} replace/>}

            </div>

        </div>

    )
}

