import React, {useState, createContext, useReducer, useContext, useEffect} from 'react';
import axios, {create} from "axios";


import {request, requestWithToken} from "../axios";
import {ACTIONS, customerReducer} from "../reducers/CustomerReducer";
import {useAuthContext} from "./AuthContext";
import {useOrderContext} from "./OrderContext";
import {useAppointmentContext} from "./AppointmentContext";

const {
    CREATE_CUSTOMER,
    GET_CUSTOMER_BY_ID,
    CLEAR_CUSTOMERS,
    GET_ASSOCIATED_ORDERS,
    GET_ALL_CUSTOMERS,
    ERROR,
    SELECT_CUSTOMER,
    UPDATE_CUSTOMER,
    CLEAR_SELECTED
} = ACTIONS;

export const CustomerContext = createContext('');

export const CustomerProvider = ({children}) => {
    const [state, dispatch] = useReducer(customerReducer, {
        customers: [],
        selectedCustomer: {},
        associatedOrders: [],
        associatedAppointments: [],
        message: [],
        userCreated: false
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

    // const createCustomer = (userObj, profileObj, phoneObj, addressObj) => {
    //
    //     const userCreate = async () => {
    //
    //         try{
    //             const createUser = await request().post('auth/register', userObj)
    //             return true;
    //         }catch(err){
    //
    //             // dispatch({
    //             //     type: SEARCH_ERROR,
    //             //     payload: createUser.data
    //             // })
    //             return false;
    //         }
    //     }
    //     if(userCreate() === false){
    //         console.log("user create failed");
    //     }
    // }

    const createCustomer = async (obj) => {
        try {
            const response = await request().post('auth/register', obj)
            dispatch({
                type: CREATE_CUSTOMER,
                payload: response.data
            })
            return true;
        } catch (err) {
            console.log("error from customer context");
            console.log(err)
            dispatch({
                type: ERROR,
                payload: err.response.data
            })
            return false;
        }
    }

    const updateCustomer = async (obj) => {
        try {
            const response = await requestWithToken(token).put(`profile/update/${obj.profileID}`, obj)
            dispatch({
                type: UPDATE_CUSTOMER,
                payload: response.data
            })
            return true;
        } catch (err) {
            dispatch({
                type: ERROR,
                payload: err.response.data
            })
            return false;
        }
    }

    const customerSearch = async (searchArr) => {
        let queryString = "";
        if (searchArr !== null && searchArr.length !== 0) {
            for (let i = 0; i < searchArr.length; i++) {

                if (i === 0) {
                    queryString = queryString + "?" + searchArr[i];
                } else {
                    queryString = queryString + "&" + searchArr[i];
                }
            }
        }

        let found = await requestWithToken(token).get(`/profile/search${queryString}`)

        if (found.data.success === false) {
            return dispatch({
                type: ERROR,
                payload: found.data
            })
        }


        dispatch({
            type: GET_ALL_CUSTOMERS,
            payload: found.data
        })
        return true;
    }

    const clearCustomers = () => {
        dispatch({
            type: CLEAR_CUSTOMERS,
            payload: null
        })
    }
    const setSelected = async (profileID) => {
        let found = await requestWithToken(token).get(`/profile/${profileID}`);

        if (found.data.success === false) {
            dispatch({
                type: ERROR,
                payload: found.data
            })
            return false;
        }
        dispatch({
            type: SELECT_CUSTOMER,
            payload: found.data
        })
        return true;
    }

    const getOrders = async (profileID) => {

        let found = await requestWithToken(token).get(`/order/profile/${profileID}`);

        if (found.data.success === false) {
            return dispatch({
                type: ERROR,
                payload: found.data
            })
        }

        dispatch({
            type: GET_ASSOCIATED_ORDERS,
            payload: found.data
        })
    }

    const getAllCustomers = async () => {
        let found = await requestWithToken(token).get(`/profile`);

        if (found.data.success === false) {
            return dispatch({
                type: ERROR,
                payload: found.data
            })
        }
        dispatch({
            type: GET_ALL_CUSTOMERS,
            payload: found.data
        })
    }

    const getCustomerByID = async (profileID) => {
        let found = await requestWithToken(token).get(`profile/${profileID}`);

        if (found.data.success === false) {
            return dispatch({
                type: ERROR,
                payload: found.data
            })
        }
        dispatch({
            type: GET_CUSTOMER_BY_ID,
            payload: found.data
        })
    }

    const clearSelected = () =>{
        dispatch({
            type: CLEAR_SELECTED,
            payload: null
        })
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
            customerSearch: customerSearch,
            setSelected: setSelected,
            clearSelected: clearSelected,
            getAllCustomers: getAllCustomers,
            clearCustomers: clearCustomers,
            getCustomerByID: getCustomerByID,
            createCustomer: createCustomer,
            updateCustomer: updateCustomer
        }}>
            {children}
        </CustomerContext.Provider>
    )
}

export const useCustomerContext = () => {
    return useContext(CustomerContext);
}