const mongoose = require('mongoose');

const individualSchema = new mongoose.Schema({
  id: Number,
  mainTitlePart1: String,
  mainTitlePart2: String,
  subHeading: String,
  cards: [{
    title: String,
    description: String
  }],
  leftSection: {
    heading: String,
    checkboxPoints: [{
      icon: String,
      title: String,
      price: Number,
      showInPage: Boolean
    }]
  },
  rightSection: {
    title: String,
    basePrice: Number,
    allPlansInclude: [String]
  }
});

module.exports = mongoose.model('Individual', individualSchema);