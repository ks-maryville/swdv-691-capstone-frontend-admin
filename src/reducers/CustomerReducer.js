export const ACTIONS = {
    GET_ALL_CUSTOMERS: "get_all_customers",
    SELECT_CUSTOMER: "select_customer",
    GET_ASSOCIATED_ORDERS: "get_associated_orders",
    GET_ASSOCIATED_APPOINTMENTS: "get_associated_appointments",
    CLEAR_CUSTOMERS: 'clear_customers',
    ERROR: "error",
    GET_CUSTOMER_BY_ID: "get_customer_by_id",
    CREATE_CUSTOMER: "create_customer",
    UPDATE_CUSTOMER: "update_customer"
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
                created: action.payload.data
            }
        case "update_customer":

            const updatedCustomers = state.customers.map(customer => {
                if (customer.profileID === action.payload.data.profileID) {
                    customer = action.payload.data;
                    return customer;
                }
                return customer;
            })
            return {
                ...state,
                customers: updatedCustomers
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