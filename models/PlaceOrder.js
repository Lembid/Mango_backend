const mongoose = require('mongoose');

const placeOrderSchema = new mongoose.Schema({
  id: Number,
  mainTitle: String,
  subHeading: String,
  cards: [{
    title: String,
    description: String
  }],
  orderOptions: [String],
  pricingDetails: {
    basePrice: Number,
    additionalServices: [{
      title: String,
      price: Number
    }]
  }
});

module.exports = mongoose.model('PlaceOrder', placeOrderSchema);