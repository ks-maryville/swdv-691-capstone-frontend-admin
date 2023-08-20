import {useLocation, Navigate, Outlet} from 'react-router-dom';
import {useAuthContext} from "./context/AuthContext";

export const Protected = ()=>{
    const {user, token} = useAuthContext();
    const location = useLocation();
    
    return (
        Object.keys(user).length && user.role === "ADMIN" ? <Outlet />
            : <Navigate to={"/"} state={{from: location}} replace/>
    )
}

