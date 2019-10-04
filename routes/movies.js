const express = require("express");
const router = express.Router();
const { Genre } = require("../models/genre");
const Movies = require("../models/movie");
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

router.get("/", async (req, res) => {
  const movies = await Movies.find({}).sort("name");
  res.send(movies);
});

router.post("/", async (req, res) => {
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("invalid genreeeeeeeeeeeeeeeeeeeee.");

  let movie = new Movies({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInstock: req.body.numberInstock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  movie = await movie.save();
  res.send(movie);
});

module.exports = router;
