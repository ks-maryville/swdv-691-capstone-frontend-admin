import axios from "axios";


export const request = () => {
    return axios.create({
        baseURL: process.env.REACT_APP_DEFAULT_SERVER_URL,
        headers: {'Content-Type': "application/json"}
    })
}

export const requestWithToken = (token) => {
    return axios.create({
        baseURL: process.env.REACT_APP_DEFAULT_SERVER_URL,
        headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${token}`}
    })
}
