export const ACTIONS = {
    GET_APPOINTMENTS: "get_appointments",
    SELECT_APPOINTMENT: "select_appointment",
    CLEAR_APPOINTMENTS: "clear_appointments",
    SEARCH_ERROR: "search_error"
}

export const appointmentReducer = (state, action) => {
    switch (action.type) {
        case "get_appointments":
            return {
                ...state,
                appointments: action.payload.data
            }
        case "search_error":
            return {
                ...state,
                message: action.payload.message
            }
        case "select_appointment":

            return {
                ...state,
                selectedAppointment: action.payload.data
            }
        case "clear_appointments":
            return {
                ...state,
                selectedAppointment: {},
                appointments: []
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