export const ACTIONS = {
    GET_ALL_CUSTOMERS: "get_all_customers",
    SELECT_CUSTOMER: "select_customer",
    GET_ASSOCIATED_ORDERS: "get_associated_orders",
    GET_ASSOCIATED_APPOINTMENTS: "get_associated_appointments",
    SEARCH_ERROR: "search_error"
}

export const customerReducer = (state, action) => {
    switch (action.type) {
        case "get_all_customers":
            return {
                customers: action.payload.data
            }
        case "search_error":
            return {
                message: action.payload.message
            }
        case "select_customer":
            console.log(action.payload);
            return {
                ...state,
                selectedCustomer: action.payload.data
            }

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