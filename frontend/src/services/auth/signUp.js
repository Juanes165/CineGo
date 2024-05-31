import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function signUp(data) {
    /*
     * function to sign up
     *
     * @param {Object} data
     * @param {string} data.email
     * @param {string} data.password
     * @param {string} data.name
     * @param {string} data.lastName
     * @returns {Object} - Response data
     * @throws {Error} - Error message
     */
    
    return axios.post(`${API_URL}/auth/register`,
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
                    case 400:
                        throw new Error("Completa todos los campos");
                    case 409:
                        throw new Error("El correo electrónico ya está en uso");
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
        })
};