import React, {useState, createContext, useReducer, useContext, useEffect} from 'react';
import axios from "axios";
import {ACTIONS, authReducer} from "../reducers/AuthReducer";
import moment from "moment";
import {request} from "../axios";

const {STORE_TOKEN, REFRESH, REGISTER_USER, LOGIN_USER, LOGOUT_USER, AUTH_ERROR} = ACTIONS;
export const AuthContext = createContext('');

export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        authenticated: false,
        user: {},
        token: "",
        message: []
    })

    const client = process.env.REACT_APP_DEFAULT_CLIENT_URL;
    const server = process.env.REACT_APP_DEFAULT_SERVER_URL;
    const setToken = (token) => {
        console.log("set token here")
    }

    const register = async (obj) => {
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }

        const regRequest = await fetch(`${server}auth/register`, options)
        const regResponse = await regRequest.json();

        if (regResponse.success === false) {
            return dispatch({
                type: AUTH_ERROR,
                payload: regResponse.message
            })
        }

        dispatch({
            type: REGISTER_USER,
            payload: regResponse.data
        })

        return regResponse.data;
    }

    const login = async (data) => {
        console.log(client, server);

        // const options = {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(obj)
        // }
        // console.log(options.body);
        // fetch(`${server}auth/login`, options)
        //     .then(response => response.json())
        //     .then(response => {
        //
        //         if (response.success === false) {
        //             return dispatch({
        //                 type: AUTH_ERROR,
        //                 payload: response.message
        //             });
        //         }
        //
        //         //set jwt to local storage...FOR NOW
        //         localStorage.setItem("token", response.data.token);
        //         return dispatch({
        //             type: LOGIN_USER,
        //             payload: response
        //         });
        //     })
        //     .catch(err => console.log(err));
        let response = request().post(`/auth/login`, data);

        if (response?.success === false) {
            return dispatch({
                type: AUTH_ERROR,
                payload: await response.data.message
            })
        }
        return dispatch({
            type: LOGIN_USER,
            payload: await response
        })
    }

    const logout = async () => {
        localStorage.removeItem("token");
        dispatch({
            type: LOGOUT_USER,
            payload: null
        })
        return true;
    }

    const refresh = (email) => {
        let encoded = encodeURIComponent(`${email}`);
        console.log(encoded);
        fetch(`${server}auth/refresh?email=${encoded}`)
            .then(response => response.json())
            .then(response => {
                dispatch({
                    type: REFRESH,
                    payload: response
                });
                return true;
            })
            .catch(err => {
                return false;
            })

    }


    return (
        <AuthContext.Provider value={{
            ...state,
            register: register,
            login: login,
            logout: logout,
            refresh: refresh,
            setToken: setToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext);
}