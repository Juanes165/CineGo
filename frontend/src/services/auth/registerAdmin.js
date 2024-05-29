import axiosInstance from "@/utils/interceptor";

export default function registerAdmin(data) {
    /*
    * Function to register a new admin
    *
    * @param {object} data - Admin data
    * @returns {object} - Response data, admin data
    * @throws {Error} - Error message
    */
    return axiosInstance.post("auth/admin/register", data)
    .then((response) => response.data)
    .catch((error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            switch (error.response.status) {
                case 400:
                    throw new Error("Completa todos los campos");
                case 401:
                    throw new Error("No autorizado");
                case 409:
                    throw new Error("El correo ya está registrado");
                case 500:
                    throw new Error("Error del servidor, intenta de nuevo más tarde");
                default:
                    throw new Error("Algo salió mal, intenta de nuevo más tarde");
            }

        } else if (error.request) {
            // The request was made but no response was received
            console.error(error.request);
            throw new Error("Hubo un error, por favor intenta de nuevo");

        } else {
            // Something happened in setting up the request that triggered an Error
            console.error(error.message);
            throw new Error("Ocurrió un error, por favor intenta de nuevo");
        }
    })
}