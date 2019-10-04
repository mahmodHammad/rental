const Joi = require("joi");
const mongoose = require("mongoose");

genreScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Genre = mongoose.model("Genre", genreScheme);

function validateGenre(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(genre, schema);
}
exports.genreScheme = genreScheme;
exports.Genre = Genre;
exports.validate = validateGenre;
