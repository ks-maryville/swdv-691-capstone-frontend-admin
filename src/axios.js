import axios from "axios";


export const request = () => {
    return axios.create({
        baseURL: "https://swdv-691-capstone-frontend-admin-2d0frnh8h-ks-maryville.vercel.app/",
        headers: {'Content-Type': "application/json"}
    })
}

export const requestWithToken = (token) => {
    return axios.create({
        baseURL: "https://swdv-691-capstone-frontend-admin-2d0frnh8h-ks-maryville.vercel.app/",
        headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${token}`}
    })
}
