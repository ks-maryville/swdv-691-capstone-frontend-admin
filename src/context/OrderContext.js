import React, {useState, createContext, useReducer, useContext, useEffect} from 'react';
import axios from "axios";


import {request, requestWithToken} from "../axios";
import {ACTIONS, orderReducer} from "../reducers/OrderReducer";
import {useAuthContext} from "./AuthContext";

const {GET_ORDERS, SELECT_ORDER, SEARCH_ERROR,CLEAR_ORDERS} = ACTIONS;

export const OrderContext = createContext('');

export const OrderProvider = ({children}) => {
    const [state, dispatch] = useReducer(orderReducer, {
        orders: [],
        selectedOrder: {},
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
            type: SELECT_ORDER,
            payload: found.data
        })
        return true;
    }
    const getOrdersByProfileID = async (profileID) => {
        console.log("GET ORDERS BY PROFILE ID FIRING NOW")
        let found = await requestWithToken(token).get(`/order/profile/${profileID}`);

        if (found.data.success === false) {
             dispatch({
                type: SEARCH_ERROR,
                payload: found.data
            })
            return false;
        }

        dispatch({
            type: GET_ORDERS,
            payload: found.data
        })
        return true;

    }
    const clearOrders = ()=>{
        dispatch({
            type: CLEAR_ORDERS,
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
        <OrderContext.Provider value={{
            ...state,
            getOrdersByProfileID: getOrdersByProfileID,
            setSelected: setSelected,
            clearOrders: clearOrders
        }}>
            {children}
        </OrderContext.Provider>
    )
}

export const useOrderContext = () => {
    return useContext(OrderContext);
}