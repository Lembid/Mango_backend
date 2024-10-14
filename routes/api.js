const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Individual routes
router.get('/individual', async (req, res) => {
  try {
    const data = await db.getIndividualDB();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/individual', async (req, res) => {
  try {
    const data = await db.updateIndividualDB(req.body);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Business routes
router.get('/business', async (req, res) => {
  try {
    const data = await db.getBusinessDB();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/business', async (req, res) => {
  try {
    const data = await db.updateBusinessDB(req.body);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Place Order routes
router.get('/place-order', async (req, res) => {
  try {
    const data = await db.getPlaceOrderDB();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/place-order', async (req, res) => {
  try {
    const data = await db.updatePlaceOrderDB(req.body);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
