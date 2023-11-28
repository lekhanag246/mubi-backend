const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        required: [true, "movie name is empty"],
        unique: true
    },
    description: {
        type: String,
        required: [true, "description is empty"]
    },
    duration: {
        type: Number,
        required: [true, "duration is empty"],
    },
    releaseDate: {
        type: Date,
        required: [true, "release date is empty"],
    },
    releaseYear: {
        type: Number,
        default: function () {
            return this.releaseDate.getFullYear();
        }
    },
    ratings: {
        type: Number,
        required: [true, "ratings is empty"],
        min: [1, "rating can't be less than 1"],
        max: [10, "rating can't be more than 10"]
    },
    totalRating: {
        type: Number,
        required: [true, "total ratings is empty"],
    },
    genres: {
        type: [String],
        // validator: {
        //     validate: v => {
        //         console.log(v)
        //         console.log(Array.isArray(v) && v.length > 0)
        //         return Array.isArray(v) && v.length > 0
        //     },
        //     message: "genres field is empty"
        // },
        required: [true, "genres field is empty"],
    },
    stars: {
        type: [String],
        required: [true, "stars field is empty"],
    },
    directors: {
        type: [String],
        required: [true, "directors field is empty"],
    },
    language: {
        type: [String],
        required: [true, "language field is empty"]
    },
    price: {
        type: Number,
        required: [true, "price is empty"],
    },
    images: {
        type: {},
        required: [true, "images field is empty"],
        // default: ["path to default image"] //TODO provide path to a default images
    }
}, {
    timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } //id: false, 
});

schema.virtual("durationInHrMin").get(function () {
    return `${Math.floor(this.duration / 60)}hr ${this.duration % 60}min`
})

schema.pre("save", function (next) {
    // console.log(this, "doc")
    if (this.language[0] !== "Kannada") {
        this.price += this.price * 0.3;
    } //tax on non-kannada movies
    next()
})

schema.path('genres').validate((value) => {
    if (Array.isArray(value) && value.length > 0 && !value.includes("")) {
        return true
    } else {
        return false
    }
}, "genres contains empty string")


schema.path('stars').validate((value) => {
    if (Array.isArray(value) && value.length > 0 && !value.includes("")) {
        return true
    } else {
        return false
    }
}, "stars contains empty string")

schema.path('directors').validate((value) => {
    if (Array.isArray(value) && value.length > 0 && !value.includes("")) {
        return true
    } else {
        return false
    }
}, "directors contains empty string")

const movieModel = model('movies', schema);

module.exports.movieModel = movieModel

//TODO VALIDATING ARRAY ELEMENTS is not working FIXED