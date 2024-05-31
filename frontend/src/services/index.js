// Authentication services
export { default as signInService } from "./auth/signIn.js";
export { default as signUpService } from "./auth/signUp.js";
export { default as registerAdminService } from "./auth/registerAdmin.js";

// Movie services
// Create
export { default as addMovieService } from "./movies/addMovie.js";

// Get
export { default as getAllMoviesService } from "./movies/getAllMovies.js";
export { default as getActiveMoviesService } from "./movies/getActiveMovies.js";
export { default as getMovieByIdService } from "./movies/getMovieById.js";
export { default as searchMoviesService } from "./movies/searchMovie.js";

// Update
export { default as toggleMovieService } from "./movies/toggleMovie.js";
export { default as updateMovieInfoService } from "./movies/updateMovieInfo.js";
export { default as updateMovieImageService } from "./movies/updateMovieImage.js";

// User services
// Get
export { default as getUsersService } from "./users/getUsers.js";

// Update
export { default as toggleActiveUserService } from "./users/toggleActiveUser.js";


// Sales services
// Create
export { default as createSaleService } from "./sales/createSale.js";