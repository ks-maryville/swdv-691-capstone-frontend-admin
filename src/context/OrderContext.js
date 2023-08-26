import React, {useState, createContext, useReducer, useContext, useEffect} from 'react';
import axios from "axios";


import {request, requestWithToken} from "../axios";
import {ACTIONS, orderReducer} from "../reducers/OrderReducer";
import {useAuthContext} from "./AuthContext";

const {
    ERROR,
    CREATE_ORDER,
    GET_ORDER_BY_ID,
    GET_ORDERS,
    SELECT_ORDER,
    CLEAR_SELECTED,
    CLEAR_ORDERS,
    UPDATE_ORDER
} = ACTIONS;

export const OrderContext = createContext('');

export const OrderProvider = ({children}) => {
    const [state, dispatch] = useReducer(orderReducer, {
        orders: [],
        selectedOrder: {},
        message: []
    })
    const {token} = useAuthContext();


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


        try {
            let found;
            if (queryString === "" || queryString === undefined || queryString.length < 1) {
                found = await requestWithToken(token).get(`order`);
            } else {

                found = await requestWithToken(token).get(`/order/search${queryString}`)
            }
            dispatch({
                type: GET_ORDERS,
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
    const setSelectedOrder = async (orderID) => {

        try {
            let found = await requestWithToken(token).get(`/order/${orderID}`);
            dispatch({
                type: SELECT_ORDER,
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
    const getOrdersByProfileID = async (profileID) => {

        try {
            let found = await requestWithToken(token).get(`/order/profile/${profileID}`);
            dispatch({
                type: GET_ORDERS,
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
    const getOrderByID = async (orderID) => {

        try {
            let found = await requestWithToken(token).get(`/order/${orderID}`);
            dispatch({
                type: GET_ORDER_BY_ID,
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

    const clearOrders = () => {
        dispatch({
            type: CLEAR_ORDERS,
            payload: null
        })
    }

    const getAllOrders = async () => {
        let found = await requestWithToken(token).get("order");

        try {
            dispatch({
                type: GET_ORDERS,
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

    const clearSelectedOrder = () => {
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


    return (
        <OrderContext.Provider value={{
            ...state,
            getOrdersByProfileID: getOrdersByProfileID,
            setSelectedOrder: setSelectedOrder,
            clearOrders: clearOrders,
            clearSelectedOrder: clearSelectedOrder,
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