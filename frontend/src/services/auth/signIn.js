import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function signIn(data) {

    return axios.post(`${API_URL}/auth/login`,
        data,
        {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.data)
        .catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                switch (error.response.status) {
                    case 401:
                        throw new Error("Correo o contraseña incorrectos");
                    case 403:
                        throw new Error("Tu cuenta ha sido deshabilitada, contacta a soporte para más información");
                    case 500:
                        throw new Error("Algo salió mal, intenta de nuevo más tarde");
                    default:
                        throw new Error("Algo salió mal, intenta de nuevo más tarde");
                }

            } else if (error.request) {
                // The request was made but no response was received
                console.error(error.request);
                throw new Error("Algo salió mal, intenta de nuevo más tarde");

            } else {
                // Something happened in setting up the request that triggered an Error
                console.error(error.message);
                throw new Error("Ocurrió un error, por favor intenta de nuevo");
            }
            // debug
            // console.log(error.config);
        })
};