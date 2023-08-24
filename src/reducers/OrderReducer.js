export const ACTIONS = {
    GET_ORDERS: "get_orders",
    SELECT_ORDER: "select_order",
    CLEAR_ORDERS: "clear_orders",
    ERROR: "error",
    GET_ORDER_BY_ID: "get_order_by_id",
    CREATE_ORDER: "create_order",
    CLEAR_SELECTED: "clear_selected",
    UPDATE_ORDER: "update_order"
}

export const orderReducer = (state, action) => {
    switch (action.type) {
        case "get_orders":
            return {
                ...state,
                orders: action.payload.data
            }
        case "error":
            return {
                ...state,
                message: action.payload.message
            }
        case "select_order":
            return {
                ...state,
                selectedOrder: action.payload.data
            }
        case "clear_orders":
            return {
                ...state,
                selectedOrders: {},
                orders: []
            }
        case "get_order_by_id":
            return {
                ...state,
                orders: [action.payload.data]
            }
        case "create_order":
            // const updatedOrders = state.orders.map(order => {
            //     console.log(order.orderID === action.payload.data.orderID);
            //     if (order.orderID === action.payload.data.orderID) {
            //         return action.payload.data;
            //     }
            //     return order;
            // })
            console.log("action payload: " + action.payload);
            // const updatedOrders = state.orders.map(order=>order.orderId === action.payload.data.orderID ? action.payload.data : order)
            // console.log(updatedOrders);
            return {
                ...state,
                orders: state.orders.concat(action.payload.data)
            }
        case "clear_selected":
            return {
                ...state,
                selectedOrder: {}
            }
        case "update_order":
            let updated = action.payload.data;
            const updatedOrders = state.orders.map(order=> order.orderID === updated.orderID ? updated : order);
            return {
                ...state,
                orders: updatedOrders
            }
        // case "get_associated_appointments":
        //     return {
        //         associatedAppointments: action.payload.data
        //     }
        // case "logout_user":
        //     return {
        //         authenticated: false,
        //         user: {}
        //     }
        // case "auth_error":
        //     return {message: action.payload};
        // case "refresh":
        //     return {
        //         authenticated: true,
        //         user: action.payload.data
        //     }
        default:
            return state;
    }
}