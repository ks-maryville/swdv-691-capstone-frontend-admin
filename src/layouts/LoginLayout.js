import {Outlet} from "react-router-dom";
import "./loginLayoutStyles.css";
export function LoginLayout(){
    return (
        <div className={"loginLayout"}>
            <Outlet/>
        </div>
    )
}