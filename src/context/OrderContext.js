import React, {useState, createContext, useReducer, useContext, useEffect} from 'react';
import axios from "axios";


import {request, requestWithToken} from "../axios";
import {ACTIONS, orderReducer} from "../reducers/OrderReducer";
import {useAuthContext} from "./AuthContext";

const {ERROR, CREATE_ORDER, GET_ORDER_BY_ID, GET_ORDERS, SELECT_ORDER, CLEAR_SELECTED, CLEAR_ORDERS,UPDATE_ORDER} = ACTIONS;

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

    const orderSearch = async (searchArr) => {
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

        let found = await requestWithToken(token).get(`/order/search${queryString}`)

        if (found.data.success === false) {
            return dispatch({
                type: ERROR,
                payload: found.data
            })
        }


        dispatch({
            type: GET_ORDERS,
            payload: found.data
        })
        return true;
    }
    const setSelected = async (orderID) => {

        let found = await requestWithToken(token).get(`/order/${orderID}`);

        if (found.data.success === false) {
            dispatch({
                type: ERROR,
                payload: found.data
            })
            return false;
        }
        dispatch({
            type: SELECT_ORDER,
            payload: found.data
        })
        return found.data.data;
    }
    const getOrdersByProfileID = async (profileID) => {

        let found = await requestWithToken(token).get(`/order/profile/${profileID}`);

        if (found.data.success === false) {
            dispatch({
                type: ERROR,
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
    const getOrderByID = async (orderID) => {
        let found = await requestWithToken(token).get(`/order/${orderID}`);

        if (found.data.success === false) {
            return dispatch({
                type: ERROR,
                payload: found.data
            })
        }
        dispatch({
            type: GET_ORDER_BY_ID,
            payload: found.data
        })
    }

    const clearOrders = () => {
        dispatch({
            type: CLEAR_ORDERS,
            payload: null
        })
    }

    const getAllOrders = async () => {
        let found = await requestWithToken(token).get("order");

        if (found.data.success === false) {
            return dispatch({
                type: ERROR,
                payload: found.data
            })
        }
        dispatch({
            type: GET_ORDERS,
            payload: found.data
        })
    }

    const createOrder = async (orderObj) => {

        try {
            let response = await requestWithToken(token).post('order', orderObj);

            dispatch({
                type: CREATE_ORDER,
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

    const clearSelected = ()=>{
        dispatch({
            type: CLEAR_SELECTED,
            payload: null
        })
    }

    const updateOrder = async (obj) => {
        try {
            const response = await requestWithToken(token).put(`order/update/${obj.orderID}`, obj)
            dispatch({
                type: UPDATE_ORDER,
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

    const updateStatus = async (orderID, status) => {

        try {
            let response = await requestWithToken(token).put(`order/${orderID}/update_status/${status}`);
            dispatch({
                type: UPDATE_ORDER,
                payload: response.data
            })
        }catch(err){
            dispatch({
                type: ERROR,
                payload: err.response.data
            })
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


    return (
        <OrderContext.Provider value={{
            ...state,
            getOrdersByProfileID: getOrdersByProfileID,
            setSelected: setSelected,
            clearOrders: clearOrders,
            clearSelected: clearSelected,
            orderSearch: orderSearch,
            getOrderByID: getOrderByID,
            getAllOrders: getAllOrders,
            createOrder: createOrder,
            updateOrder: updateOrder,
            updateStatus: updateStatus
        }}>
            {children}
        </OrderContext.Provider>
    )
}

export const useOrderContext = () => {
    return useContext(OrderContext);
}