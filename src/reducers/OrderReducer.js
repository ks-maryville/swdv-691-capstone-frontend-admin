export const ACTIONS = {
    GET_ORDERS: "get_orders",
    SELECT_ORDER: "select_order",
    SEARCH_ERROR: "search_error"
}

export const orderReducer = (state, action) => {
    switch (action.type) {
        case "get_orders":
            return {
                orders: action.payload.data
            }
        case "search_error":
            return {
                message: action.payload.message
            }
        case "select_order":
            return {
                selectedOrder: action.payload.data
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