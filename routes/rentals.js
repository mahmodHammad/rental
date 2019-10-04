const express = require("express");
const router = express.Router();
const Rental = require("../models/rental");
const { Customer } = require("../models/customer");
const Movies = require("../models/movie");

router.get("/", async (req, res) => {
  const rentals = await Rental.find({}).sort("dateOut");
  res.send(rentals);
});

router.post("/", async (req, res) => {
  //client send only movieId , customerid
  const customer = await Customer.findById(req.body.customerid);
  if (!customer) return res.status(400).send("Cusotmer not found");

  const movie = await Movies.findById(req.body.movieId);
  if (!movie) return res.status(400).send("movie not found");

  if (movie.numberInstock == 0)
    return res.send("no enought versions available ");

  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });
  const ren = await rental.save();

  movie.numberInstock--;
  movie.save();

  res.send(ren);
});

module.exports = router;
