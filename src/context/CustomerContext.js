import React, {useState, createContext, useReducer, useContext, useEffect} from 'react';
import axios from "axios";


import {request, requestWithToken} from "../axios";
import {ACTIONS, customerReducer} from "../reducers/CustomerReducer";
import {useAuthContext} from "./AuthContext";

const {GET_ALL_CUSTOMERS, SEARCH_ERROR, SELECT_CUSTOMER} = ACTIONS;

export const CustomerContext = createContext('');

export const CustomerProvider = ({children}) => {
    const [state, dispatch] = useReducer(customerReducer, {
        customers: [],
        selectedCustomer: {},
        message: []
    })
    const {token} = useAuthContext();
    const client = process.env.REACT_APP_DEFAULT_CLIENT_URL;
    const server = process.env.REACT_APP_DEFAULT_SERVER_URL;


    // const login = async (data) => {
    //     console.log(client, server);
    //
    //     // const options = {
    //     //     method: "POST",
    //     //     headers: {
    //     //         'Content-Type': 'application/json'
    //     //     },
    //     //     body: JSON.stringify(obj)
    //     // }
    //     // console.log(options.body);
    //     // fetch(`${server}auth/login`, options)
    //     //     .then(response => response.json())
    //     //     .then(response => {
    //     //
    //     //         if (response.success === false) {
    //     //             return dispatch({
    //     //                 type: AUTH_ERROR,
    //     //                 payload: response.message
    //     //             });
    //     //         }
    //     //
    //     //         //set jwt to local storage...FOR NOW
    //     //         localStorage.setItem("token", response.data.token);
    //     //         return dispatch({
    //     //             type: LOGIN_USER,
    //     //             payload: response
    //     //         });
    //     //     })
    //     //     .catch(err => console.log(err));
    //     let response = request().post(`/auth/login`, data);
    //
    //     if (response?.success === false) {
    //         return dispatch({
    //             type: AUTH_ERROR,
    //             payload: await response.data.message
    //         })
    //     }
    //     return dispatch({
    //         type: LOGIN_USER,
    //         payload: await response
    //     })
    // }

    const customerSearch = async (searchArr) => {
        let queryString = "";
        if (searchArr !== null && searchArr.length !== 0) {
            for (let i = 0; i < searchArr.length; i++) {
                console.log(searchArr[i]);
                if (i === 0) {
                    queryString = queryString + "?" + searchArr[i];
                } else {
                    queryString = queryString + "&" + searchArr[i];
                }
            }
        }


        console.log(queryString);
        let found = await requestWithToken(token).get(`/profile/search${queryString}`)

        if (found.data.success === false) {
            dispatch({
                type: SEARCH_ERROR,
                payload: found.data
            })
        }
        dispatch({
            type: GET_ALL_CUSTOMERS,
            payload: found.data
        })
        return true;
    }

    // const refresh = (email) => {
    //     let encoded = encodeURIComponent(`${email}`);
    //     console.log(encoded);
    //     fetch(`${server}auth/refresh?email=${encoded}`)
    //         .then(response => response.json())
    //         .then(response => {
    //             dispatch({
    //                 type: REFRESH,
    //                 payload: response
    //             });
    //             return true;
    //         })
    //         .catch(err => {
    //             return false;
    //         })
    //
    // }


    return (
        <CustomerContext.Provider value={{
            ...state,
            customerSearch: customerSearch
        }}>
            {children}
        </CustomerContext.Provider>
    )
}

export const useCustomerContext = () => {
    return useContext(CustomerContext);
}