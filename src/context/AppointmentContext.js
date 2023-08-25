import React, {useState, createContext, useReducer, useContext, useEffect} from 'react';
import axios from "axios";


import {request, requestWithToken} from "../axios";
import {ACTIONS, appointmentReducer} from "../reducers/AppointmentReducer";
import {useAuthContext} from "./AuthContext";
import {toUTC} from "../Helper/time";

const {
    CLEAR_SELECTED,
    CREATE_APPOINTMENT,
    ERROR,
    GET_APPOINTMENTS,
    SELECT_APPOINTMENT,
    SEARCH_ERROR,
    CLEAR_APPOINTMENTS,
    GET_AVAILABLE
} = ACTIONS;

export const AppointmentContext = createContext('');

export const AppointmentProvider = ({children}) => {
    const [state, dispatch] = useReducer(appointmentReducer, {
        appointments: [],
        selectedAppointment: {},
        unavailableDates: [],
        message: []
    })
    const {token} = useAuthContext();


    const scheduleAppointment = async (appointmentObj) => {
        console.log("time going into function", appointmentObj.appointmentDate)

        // appointmentObj.appointmentDate = toUTC(appointmentObj.date);
        console.log("time after conversion",appointmentObj.appointmentDate);
        try {
            let created = await requestWithToken(token).post("appointment", appointmentObj);
            dispatch({
                type: CREATE_APPOINTMENT,
                payload: created.data
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

    const updateAppointment = async (appointmentObj) => {
        appointmentObj.date = toUTC(appointmentObj.date);

        try {
            let updated = await requestWithToken(token).put(`appointment/update/${appointmentObj.appointmentID}`, appointmentObj);
            dispatch({
                type: CREATE_APPOINTMENT,
                payload: updated.data
            })
        } catch (err) {
            dispatch({
                type: ERROR,
                payload: err.response.data
            })
            return false;
        }
    }

    const appointmentSearch = async (searchArr) => {
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


        try {
            let found = await requestWithToken(token).get(`/appointment/search${queryString}`)
            dispatch({
                type: GET_APPOINTMENTS,
                payload: found.data
            })
            return true;
        } catch (err) {
            dispatch({
                type: ERROR,
                payload: err.response.data
            });
            return false;
        }

    }

    const getDatesBetween = async (minDate, maxDate) => {
        let minDateUTC = toUTC(minDate).split(",").toSpliced(10, 1, "%").join("");
        let maxDateUTC = toUTC(maxDate).split(",").toSpliced(10, 1, "%").join("");

        try {
            let found = await requestWithToken(token).get(`appointment/search/datesBetween?date1=${minDateUTC}&date2=${maxDateUTC}`)
            dispatch({
                type: GET_APPOINTMENTS,
                payload: found.data
            })
        } catch (err) {
            dispatch({
                type: ERROR,
                payload: err.response.data
            })
            return false;
        }
    }

    const getDatesCreatedBetween = async (minDate, maxDate) => {
        let minDateUTC = toUTC(minDate).split(",").toSpliced(10, 1, "%").join("");
        let maxDateUTC = toUTC(maxDate).split(",").toSpliced(10, 1, "%").join("");

        try {
            let found = await requestWithToken(token).get(`appointment/search/createdBetween?date1=${minDateUTC}&date2=${maxDateUTC}`)
            dispatch({
                type: GET_APPOINTMENTS,
                payload: found.data
            })
        } catch (err) {
            dispatch({
                type: ERROR,
                payload: err.response.data
            })
            return false;
        }
    }
    const setSelected = async (orderID) => {

        try {
            let found = await requestWithToken(token).get(`appointment/${orderID}`);

            dispatch({
                type: SELECT_APPOINTMENT,
                payload: found.data
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

    const clearSelected = () => {
        dispatch({
            type: CLEAR_SELECTED,
            payload: null
        });
    }
    const getAppointmentsByOrderID = async (orderID) => {
        try {
            let found = await requestWithToken(token).get(`/appointment/order/${orderID}`);
            dispatch({
                type: GET_APPOINTMENTS,
                payload: found.data
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

    const getAllAppointments = async () => {

        try {
            let found = await requestWithToken(token).get(`appointment`);
            dispatch({
                type: GET_APPOINTMENTS,
                payload: found.data
            });
            return true;
        } catch (err) {
            dispatch({
                type: ERROR,
                payload: err.response.data
            });
            return false;
        }

    }

    const checkAvailable = async (dateTime, location) => {
        // let utcDate = toUTC(dateTime).split(",").toSpliced(10, 1, "%").join("");

        // get all appointments for month e.g 'appointment/available?date=2023-08-25
        //

        try {
            let count = await requestWithToken(token).get(`appointment/availableByMonth?appointmentDate=${dateTime}&location=${location}`)

            dispatch({
                type: GET_AVAILABLE,
                payload: count.data
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
    const clearAppointments = () => {
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
            clearAppointments: clearAppointments,
            clearSelected: clearSelected,
            getAllAppointments: getAllAppointments,
            appointmentSearch: appointmentSearch,
            getDateBetween: getDatesBetween,
            getDatesCreatedBetween: getDatesCreatedBetween,
            scheduleAppointment: scheduleAppointment,
            updateAppointment: updateAppointment,
            checkAvailable: checkAvailable
        }}>
            {children}
        </AppointmentContext.Provider>
    )
}

export const useAppointmentContext = () => {
    return useContext(AppointmentContext);
}