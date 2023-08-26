import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAuthContext} from "../../context/AuthContext";
import './navStyles.css';

export const Nav = () => {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const {logout, refresh, authenticated} = useAuthContext();
    const location = useLocation();
    console.log(location.pathname)
    const handleLogout = () => {
        logout();
        navigate("/");
    }
    return (
        <nav>
            {location.pathname !== "/dashboard" &&
                <Link className={`backToDashboard`} to={"/dashboard"}>BACK TO DASHBOARD</Link>}
            <Link className={`${location.pathname === "/customers" ? "currentPage" : null}`} to={"/customers"}>Customers</Link>
            <Link className={`${location.pathname === "/orders" ? "currentPage" : null}`} to={"/orders"}>Orders</Link>
            <Link className={`${location.pathname === "/appointments" ? "currentPage" : null}`} to={"/appointments"}>Appointments</Link>
            <button onClick={() => handleLogout()}>Logout</button>
        </nav>
    )
}