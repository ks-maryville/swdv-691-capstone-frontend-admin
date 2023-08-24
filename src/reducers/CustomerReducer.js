export const ACTIONS = {
    GET_ALL_CUSTOMERS: "get_all_customers",
    SELECT_CUSTOMER: "select_customer",
    GET_ASSOCIATED_ORDERS: "get_associated_orders",
    GET_ASSOCIATED_APPOINTMENTS: "get_associated_appointments",
    CLEAR_CUSTOMERS: 'clear_customers',
    ERROR: "error",
    GET_CUSTOMER_BY_ID: "get_customer_by_id",
    CREATE_CUSTOMER: "create_customer",
    UPDATE_CUSTOMER: "update_customer",
    CLEAR_SELECTED: "clear_selected"
}

export const customerReducer = (state, action) => {
    switch (action.type) {
        case "get_all_customers":
            return {
                ...state,
                customers: action.payload.data
            }
        case "error":
            console.log("error");
            return {
                ...state,
                message: action.payload.message
            }
        case "select_customer":

            return {
                ...state,
                selectedCustomer: action.payload.data
            }
        case "clear_customers":
            return {
                ...state,
                selectedCustomer: {},
                customers: []
            }
        case "get_customer_by_id":
            return {
                ...state,
                customers: [action.payload.data]
            }
        case "create_customer":
            return {
                ...state,
                created: state.customers.concat(action.payload.data)
            }
        case "update_customer":
            let updated = action.payload.data;
            const updatedCustomers = state.customers.map(customer => customer.profileID === updated.profileID ? updated : customer);
            return {
                ...state,
                customers: updatedCustomers
            }
        case "clear_selected":

            return {
                ...state,
                selectedCustomer: {}
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