import React, {useState, createContext, useReducer, useContext, useEffect} from 'react';
import axios from "axios";


import {request, requestWithToken} from "../axios";
import {ACTIONS, appointmentReducer} from "../reducers/AppointmentReducer";
import {useAuthContext} from "./AuthContext";

const {GET_APPOINTMENTS, SELECT_APPOINTMENT, SEARCH_ERROR,CLEAR_APPOINTMENTS} = ACTIONS;

export const AppointmentContext = createContext('');

export const AppointmentProvider = ({children}) => {
    const [state, dispatch] = useReducer(appointmentReducer, {
        appointments: [],
        selectedAppointment: {},
        message: []
    })
    const {token} = useAuthContext();
    const client = process.env.REACT_APP_DEFAULT_CLIENT_URL;
    const server = process.env.REACT_APP_DEFAULT_SERVER_URL;


    // const customerSearch = async (searchArr) => {
    //     let queryString = "";
    //     if (searchArr !== null && searchArr.length !== 0) {
    //         for (let i = 0; i < searchArr.length; i++) {
    //             console.log(searchArr[i]);
    //             if (i === 0) {
    //                 queryString = queryString + "?" + searchArr[i];
    //             } else {
    //                 queryString = queryString + "&" + searchArr[i];
    //             }
    //         }
    //     }
    //
    //
    //     console.log(queryString);
    //     let found = await requestWithToken(token).get(`/profile/search${queryString}`)
    //
    //     if (found.data.success === false) {
    //         return dispatch({
    //             type: SEARCH_ERROR,
    //             payload: found.data
    //         })
    //     }
    //     dispatch({
    //         type: GET_ALL_CUSTOMERS,
    //         payload: found.data
    //     })
    //     return true;
    // }
    const setSelected = async (orderID) =>{

        let found = await requestWithToken(token).get(`/order/${orderID}`);

        if(found.data.success === false){
            dispatch({
                type: SEARCH_ERROR,
                payload: found.data
            })
            return false;
        }
        dispatch({
            type: SELECT_APPOINTMENT,
            payload: found.data
        })
        return true;
    }
    const getAppointmentsByOrderID = async (orderID) => {
        let found = await requestWithToken(token).get(`/appointment/order/${orderID}`);

        if (found.data.success === false) {
            return dispatch({
                type: SEARCH_ERROR,
                payload: found.data
            })
        }

        dispatch({
            type: GET_APPOINTMENTS,
            payload: found.data
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
    const clearAppointments = ()=>{
        dispatch({
            type: CLEAR_APPOINTMENTS,
            payload: null
        })
    }

    return (
        <AppointmentContext.Provider value={{
            ...state,
            getAppointmentsByOrderID: getAppointmentsByOrderID,
            setSelected: setSelected,
            clearAppointments: clearAppointments
        }}>
            {children}
        </AppointmentContext.Provider>
    )
}

export const useAppointmentContext = () => {
    return useContext(AppointmentContext);
}