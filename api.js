import axios from "axios"

export const peticionesAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})