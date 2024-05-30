import axiosInstance from "@/utils/interceptor";

export default async function searchMovie (query) {
    /*
    * Function to search for a movie
    * 
    * @param {string} query - Search query
    * @returns {object} - Response data
    */
    query = query.replace(/\//g, "");
    return axiosInstance.get(`/movies/search/${query}`)
    .then(response => response.data)
    .catch((error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            switch (error.response.status) {
                case 401:
                    throw new Error("No autorizado");
                case 404:
                    throw new Error("No se encontraron resultados");
                case 500:
                    throw new Error("Error del servidor, intenta de nuevo más tarde");
                default:
                    throw new Error("Algo salió mal, intenta de nuevo más tarde");
            }

        } else if (error.request) {
            // The request was made but no response was received
            console.error(error.request);
            throw new Error("Error de petición");

        } else {
            // Something happened in setting up the request that triggered an Error
            console.error(error.message);
            throw new Error("Ocurrió un error, por favor intenta de nuevo");
        }
    })
}