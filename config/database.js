const loki = require('lokijs');
const path = require('path');
require('dotenv').config();

const DB_FILE = process.env.DB_FILE || path.join(__dirname, '..', 'data', 'mango_optimize.db');

const db = new loki(DB_FILE, {
    autoload: true,
    autoloadCallback: initializeDatabase,
    autosave: true,
    autosaveInterval: 4000
});

function initializeDatabase() {
    return new Promise((resolve, reject) => {
        ['individual', 'business', 'placeOrder'].forEach(collectionName => {
            let collection = db.getCollection(collectionName);
            if (collection === null) {
                collection = db.addCollection(collectionName);
                if (collection.count() === 0) {
                    collection.insert(defaultData[collectionName][0]);
                }
            }
        });
        resolve();
    });
}

const defaultData = {
    individual: [{
        mainTitlePart1: 'Default Individual Title Part 1',
        mainTitlePart2: 'Default Individual Title Part 2',
        subHeading: 'Default Individual Subheading',
        cards: [
            { title: 'Card 1 Title', description: 'Card 1 Description' },
            { title: 'Card 2 Title', description: 'Card 2 Description' },
            { title: 'Card 3 Title', description: 'Card 3 Description' }
        ]
    }],
    business: [{
        mainTitlePart1: 'Default Business Title Part 1',
        mainTitlePart2: 'Default Business Title Part 2',
        subHeading: 'Default Business Subheading',
        cards: [
            { title: 'Card 1 Title', description: 'Card 1 Description' },
            { title: 'Card 2 Title', description: 'Card 2 Description' },
            { title: 'Card 3 Title', description: 'Card 3 Description' }
        ],
        leftSection: { heading: 'Default Left Section Heading' },
        rightSection: { title: 'Default Right Section Title', basePrice: '0' }
    }],
    placeOrder: [{
        mainTitle: 'Default Place Order Title',
        subHeading: 'Default Place Order Subheading',
        cards: [
            { title: 'Card 1 Title', description: 'Card 1 Description' },
            { title: 'Card 2 Title', description: 'Card 2 Description' },
            { title: 'Card 3 Title', description: 'Card 3 Description' }
        ],
        pricingDetails: { basePrice: '0' }
    }]
};

module.exports = {
    initializeDatabase: () => initializeDatabase(),
    getIndividualDB: () => db.getCollection('individual').findOne({}),
    getBusinessDB: () => db.getCollection('business').findOne({}),
    getPlaceOrderDB: () => db.getCollection('placeOrder').findOne({}),
    updateIndividualDB: (data) => updateCollection('individual', data),
    updateBusinessDB: (data) => updateCollection('business', data),
    updatePlaceOrderDB: (data) => updateCollection('placeOrder', data)
};

function updateCollection(collectionName, data) {
    const collection = db.getCollection(collectionName);
    const existing = collection.findOne({});
    if (existing) {
        collection.update({ ...existing, ...data });
    } else {
        collection.insert(data);
    }
    return collection.findOne({});
}
