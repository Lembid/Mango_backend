const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const DATABASE_FILE = process.env.DATABASE_FILE || path.join(__dirname, 'database.json');

const defaultData = {
  individual: [{
    id: 1,
    mainTitlePart1: "Personal Tax Preparation",
    mainTitlePart2: "for Everyone",
    subHeading: "Optimize your taxes with us",
    cards: [
      { title: "Card 1", description: "Description 1" },
      { title: "Card 2", description: "Description 2" },
      { title: "Card 3", description: "Description 3" }
    ],
    leftSection: { heading: "Select options", checkboxPoints: [] },
    rightSection: { title: "Pricing", basePrice: "100", allPlansInclude: [] }
  }],
  business: [{
    id: 1,
    mainTitlePart1: "Business Tax Preparation",
    mainTitlePart2: "for All Sizes",
    subHeading: "Optimize your business taxes",
    cards: [
      { title: "Card 1", description: "Description 1" },
      { title: "Card 2", description: "Description 2" },
      { title: "Card 3", description: "Description 3" }
    ],
    leftSection: {
      heading: "Select business options",
      checkboxPoints: []
    },
    rightSection: {
      title: "Business Pricing",
      basePrice: "500",
      allPlansInclude: []
    }
  }],
  placeOrder: [{
    id: 1,
    mainTitle: "Place Your Order",
    subHeading: "Easy and quick ordering process",
    cards: [
      { title: "Card 1", description: "Description 1" },
      { title: "Card 2", description: "Description 2" },
      { title: "Card 3", description: "Description 3" }
    ],
    orderOptions: [],
    pricingDetails: {
      basePrice: "100",
      additionalServices: []
    }
  }]
};

const initializeDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');
  await loadDatabase();
};

async function loadDatabase() {
  try {
    const data = await fs.readFile(DATABASE_FILE, 'utf8');
    const parsedData = JSON.parse(data);
    await Promise.all([
      mongoose.model('Individual').create(parsedData.individual),
      mongoose.model('Business').create(parsedData.business),
      mongoose.model('PlaceOrder').create(parsedData.placeOrder)
    ]);
  } catch (error) {
    console.log('No existing database found, initializing with default data');
    await Promise.all([
      mongoose.model('Individual').create(defaultData.individual),
      mongoose.model('Business').create(defaultData.business),
      mongoose.model('PlaceOrder').create(defaultData.placeOrder)
    ]);
  }
}

async function saveDatabase() {
  const data = {
    individual: await mongoose.model('Individual').find(),
    business: await mongoose.model('Business').find(),
    placeOrder: await mongoose.model('PlaceOrder').find()
  };
  await fs.writeFile(DATABASE_FILE, JSON.stringify(data, null, 2));
}

setInterval(saveDatabase, 5 * 60 * 1000); // Save every 5 minutes

module.exports = {
  initializeDB,
  saveDatabase,
  getIndividualDB: () => mongoose.model('Individual').findOne(),
  getBusinessDB: () => mongoose.model('Business').findOne(),
  getPlaceOrderDB: () => mongoose.model('PlaceOrder').findOne(),
  updateIndividualDB: (data) => mongoose.model('Individual').findOneAndUpdate({}, data, { new: true }),
  updateBusinessDB: (data) => mongoose.model('Business').findOneAndUpdate({}, data, { new: true }),
  updatePlaceOrderDB: (data) => mongoose.model('PlaceOrder').findOneAndUpdate({}, data, { new: true })
};
