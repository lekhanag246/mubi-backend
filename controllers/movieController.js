const { movieModel } = require('../models/Movies');
const { asyncErrorHandler } = require('./asyncErrorHandler')

const { validateId } = require('../utils/mubi.utility');
const CustomError = require('../utils/CustomError');

const getAllMovies = asyncErrorHandler(async (req, res, next) => {
    const movies = await movieModel.find({});
    if (movies.length == 0) {
        throw new CustomError("error getting all the movies")
    }
    res.status(200).json({
        status: "success",
        count: movies.length,
        data: {
            movies
        }
    })
})

const createMovie = asyncErrorHandler(async (req, res, next) => {
    let { name, description, duration, releaseDate, ratings, totalRating,
        genres, stars, directors, language, price } = req.body;
    const newMovie = await movieModel.create({
        name,
        description,
        duration,
        releaseDate,
        ratings,
        totalRating,
        genres,
        stars,
        directors,
        language,
        price,
        images: { poster: req.files.poster[0], wide: req.files.wide[0] }
    });
    // console.log(newMovie)

    res.status(201).json({
        status: "success",
        data: {
            newMovie
        }
    })
})


const getMovie = asyncErrorHandler(async (req, res, next) => {
    const movie = req.movie;
    res.status(200).json({
        status: "success",
        data: {
            movie
        }
    })
})

const updateMovie = asyncErrorHandler(async (req, res, next) => {
    //TODO maybe don't write findbyId twice
    const updatedMovie = await movieModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        status: "success",
        data: {
            updatedMovie
        }
    })
});

const deleteMovie = asyncErrorHandler(async (req, res, next) => {
    //TODO maybe don't write findbyId twice
    let movie = await movieModel.findByIdAndRemove(req.params.id);
    res.status(202).json({
        status: "success",
        data: null
    })
})

const validateMovieId = asyncErrorHandler(async (req, res, next) => {
    if (!validateId(req.params.id)) {
        throw new CustomError("invalid id", 404); //valid id 
    } else {
        let movie = movieModel.findById(req.params.id) //if id exists
        if (movie === null) {
            throw new CustomError("movie with this id does not exist", 404)
        } else {
            req.movie = movie;
            next()
        }
    }
})


module.exports = {
    getAllMovies,
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie,
    validateMovieId,
    // movieStats,
    // moviesByGenre,
    // searchMovies
}