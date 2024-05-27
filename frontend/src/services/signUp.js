import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function signUp (data) {
    return axios.post(`${API_URL}/auth/register`, data)
        .then((response) => response.data)
        .catch((error) => {
            console.error(error.response.data);
            return Promise.reject(error.response.data);
        })
};