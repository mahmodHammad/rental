const mongoose = require("mongoose");
const { genreScheme } = require("../models/genre");

const movieScheme = new mongoose.Schema({
  title: String,
  genre: { type: genreScheme },
  numberInstock: { type: Number, required: true, min: 0, max: 255 },
  dailyRentalRate: { type: Number, required: true, min: 0, max: 255 }
});
const Movies = mongoose.model("movies", movieScheme);

module.exports = Movies;
