export const ACTIONS = {
    GET_ORDERS: "get_orders",
    SELECT_ORDER: "select_order",
    CLEAR_ORDERS: "clear_orders",
    SEARCH_ERROR: "search_error"

}

export const orderReducer = (state, action) => {
    switch (action.type) {
        case "get_orders":
            return {
                ...state,
                orders: action.payload.data
            }
        case "search_error":
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