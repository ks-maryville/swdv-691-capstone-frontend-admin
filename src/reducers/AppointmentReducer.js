import moment from 'moment-timezone';
export const ACTIONS = {
    GET_APPOINTMENTS: "get_appointments",
    SELECT_APPOINTMENT: "select_appointment",
    CLEAR_APPOINTMENTS: "clear_appointments",
    ERROR: "error",
    CREATE_APPOINTMENT: "create_appointment",
    UPDATE_APPOINTMENT: "update_appointment",
    CLEAR_SELECTED: "clear_selected",
    GET_AVAILABLE: "get_available"
}

export const appointmentReducer = (state, action) => {
    switch (action.type) {
        case "get_appointments":
            return {
                ...state,
                appointments: action.payload.data
            }
        case "error":
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
        case "create_appointment":
            return {
                ...state,
                appointments: state.appointments.concat(action.payload.data)
            }
        case "update_appointment":
            let updated = action.payload.data;
            const updatedAppointments = state.appointments.map(appointment=> appointment.appointmentID === updated.appointmentID ? updated : appointment);
            return {
                ...state,
                appointments: updatedAppointments
            }
        case "clear_selected":
            return {
                ...state,
                selectedAppointment: {}
            }
        case "get_available":
            return {
                ...state,
                unavailableDates: action.payload.data.length > 0 ? action.payload.data.map(date => {
                    // let formatted = date.slice(11, -13);
                    return moment(date).format("yyyy-MM-DD HH:mm");
                }) : []
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