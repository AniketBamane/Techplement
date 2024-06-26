const mongoose = require('mongoose');

const favouriteModel = mongoose.Schema({
  quote: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Quote",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.models.favourites || mongoose.model('Favourite', favouriteModel);