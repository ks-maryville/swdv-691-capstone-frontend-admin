export const ACTIONS = {
    GET_ALL_CUSTOMERS: "get_all_customers",
    SELECT_CUSTOMER: "select_customers",
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
        // case "register_user":
        //     return {
        //         authenticated: true,
        //         user: action.payload
        //     }
        // case "login_user":
        //     console.log(action.payload);
        //     return {
        //         authenticated: true,
        //         user: action.payload.data.data.user,
        //         token: action.payload.data.data.token
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