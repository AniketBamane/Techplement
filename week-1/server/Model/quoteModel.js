const mongoose = require('mongoose');

const quoteSchema = mongoose.Schema({
  quote: {
    type: String,
  },
  author: {
    type: String,
  }
})

const Quote =mongoose.models.quotes || mongoose.model('Quote', quoteSchema);

module.exports = Quote;