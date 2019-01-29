const mongoose = require('mongoose');

const animeSchema = mongoose.Schema({
  id: Number,
  description: String,
  releaseDate: String,
  studio: String,
  title: String,
  genre: String
});

const Anime = mongoose.model('Anime', animeSchema);

module.exports = Anime;
