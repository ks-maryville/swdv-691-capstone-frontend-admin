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
            console.log(action.payload);
            return {
                authenticated: true,
                user: action.payload.data.data.user,
                token: action.payload.data.data.token
            }
        case "logout_user":
            return {
                authenticated: false,
                user: {}
            }
        case "auth_error":
            return {message: action.payload};
        case "refresh":
            return {
                authenticated: true,
                user: action.payload.data
            }
        default:
            return state;
    }
}