export const ACTIONS = {
    STORE_TOKEN: "store_tokenn",
    REGISTER_USER: "register_user",
    LOGIN_USER: "login_user",
    LOGOUT_USER: "logout_user",
    REFRESH: "refresh",
    AUTH_ERROR: "auth_error"
}

export const authReducer = (state, action) => {
    switch (action.type) {
        case "store_token":
            return {authenticated: true, user: action.payload}
        case "register_user":
            return {
                authenticated: true,
                user: action.payload
            }
        case "login_user":

            return {
                ...state,
                authenticated: true,
                user: action.payload.data.user,
                token: action.payload.data.token
            }
        case "logout_user":
            return {
                authenticated: false,
                user: {},
                token: ""
            }
        case "auth_error":
            return {
                ...state,
                message: action.payload.message
            };
        case "refresh":
            return {
                authenticated: true,
                user: action.payload.user,
                token: action.payload.token
            }
        default:
            return state;
    }
}