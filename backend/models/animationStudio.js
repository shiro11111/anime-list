const mongoose = require('mongoose');

const animationStudioSchema = mongoose.Schema({
  id: String,
  name: String
});

const Studio = mongoose.model('Studio', animationStudioSchema);

module.exports = Studio;
