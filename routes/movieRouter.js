const movieRouter = require('express').Router();

const { uploads } = require('../utils/multer');

const { getAllMovies,
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie,
    validateMovieId,
    uploadImages
    // getHighestRatedMovies,
    // searchMovies,
    // movieStats,
    // moviesByGenre
} = require('../controllers/movieController');

movieRouter.route('/').get(getAllMovies).post(uploads.fields([{ name: "wide", maxCount: 1 }, { name: "poster", maxCount: 1 }]), createMovie);
// router.route('/search').get(searchMovies);
movieRouter.route('/:id').all(validateMovieId).get(getMovie).patch(updateMovie).delete(deleteMovie);
// router.route('/highest-rated-movie', getHighestRatedMovies)
// router.route('/movie-stats').get(movieStats);
// router.route('/movie-by-genre/:genre').get(moviesByGenre);

module.exports.movieRouter = movieRouter;
