import './App.css';
import {BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes, useNavigate} from "react-router-dom";
import {Component, useEffect, useState} from "react";
import {useAuthContext} from "./context/AuthContext";
import moment from "moment";
import {LoginPage} from "./pages/LoginPage";
import {GlobalLayout} from "./layouts/GlobalLayout";
import {LoginLayout} from "./layouts/LoginLayout";
import {Protected} from "./Protected";
import {DashboardLayout} from "./layouts/DashboardLayout";
import {Dashboard} from "./pages/Dashboard";
import {AdminCustomerPage} from "./pages/AdminCustomerPage";



class AdminOrderPage extends Component {
    render() {
        return null;
    }
}

class AdminAppointmentsPage extends Component {
    render() {
        return null;
    }
}


class Unauthorized extends Component {
    render() {
        return null;
    }
}

function App() {
    const {authenticated, logout, refresh} = useAuthContext();

    useEffect(() => {

    }, []);


    return (

        <Routes>


            <Route path={"/"} element={<GlobalLayout/>}>
                <Route path={"/"} element={<LoginLayout/>}>
                    <Route path={"/"} element={<LoginPage/>}/>
                </Route>

                {/*PROTECTED ROUTES - ONLY ADMINS MAY ACCESS*/}
                <Route element={<Protected/>}>
                    <Route path={"dashboard"} element={<Dashboard/>}/>
                    <Route path={"customers"} element={<AdminCustomerPage/>}></Route>
                    <Route path={"orders"} element={<AdminOrderPage/>}/>
                    <Route path={"appointments"} element={<AdminAppointmentsPage/>}/>
                </Route>


                {/*ROUTE WHEN AN UNAUTHORIZED USER LOGS IN - USER WITH 'USER' ROLE*/}
                <Route path={"unauthorized"} element={<Unauthorized/>}/>
            </Route>


            {/*/!*CUSTOMER PORTAL*!/*/}
            {/*<Route path={"/customer"} element={<GlobalLayout/>}>*/}
            {/*    <Route index element={<CustomerHomePage/>}/>*/}
            {/*    <Route path={"profile"} element={<ProfilePage/>}/>*/}
            {/*    <Route path={"scheduler"} element={<SchedulePage/>}/>*/}
            {/*</Route>*/}
        </Routes>


    );
}

export default App;
