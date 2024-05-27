import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function signIn(data) {

    return axios.post(`${API_URL}/auth/login`,
        data,
        {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
        .then((response) => response.data)
        .catch((error) => {
            console.error(error.response.data);
            return Promise.reject(error.response.data);
        })
};