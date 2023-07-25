"use client";
import Image from 'next/image'
import React, {ChangeEvent, useState} from "react";

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    interface IAuth {
        email: string;
        password: string;
    }
    interface IRegister extends IAuth {
        verify: string;
    }

    let authObj: IAuth = {
        email: email,
        password: password
    }
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>,obj: IAuth): void => {
        e.preventDefault();
        console.log(obj);
    }
    return <main>
        <h3>John Doe Furniture Company</h3>
        <h1>Admin Portal</h1>
        <form>
            <input type="text" placeholder={"Email"} onChange={(e) => setEmail(e.target.value)}/>
            <input type="text" placeholder={"Password"} onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={(e) => handleSubmit(e,authObj)}>Login</button>
        </form>
    </main>
};
