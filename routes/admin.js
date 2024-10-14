const express = require('express');
const router = express.Router();
const Individual = require('../models/Individual');
const Business = require('../models/Business');
const PlaceOrder = require('../models/PlaceOrder');

// Admin dashboard
router.get('/', (req, res) => {
  res.render('admin/dashboard');
});

// Individual CRUD
router.get('/individual', async (req, res) => {
  const data = await Individual.findOne();
  res.render('admin/individual', { data });
});

router.post('/individual', async (req, res) => {
  const formData = processFormData(req.body);
  await Individual.findOneAndUpdate({}, formData, { upsert: true, new: true });
  res.redirect('/admin/individual');
});

// Business CRUD
router.get('/business', async (req, res) => {
  const data = await Business.findOne();
  res.render('admin/business', { data });
});

router.post('/business', async (req, res) => {
  const formData = processFormData(req.body);
  await Business.findOneAndUpdate({}, formData, { upsert: true, new: true });
  res.redirect('/admin/business');
});

// PlaceOrder CRUD
router.get('/place-order', async (req, res) => {
  const data = await PlaceOrder.findOne();
  res.render('admin/place-order', { data });
});

router.post('/place-order', async (req, res) => {
  const formData = processFormData(req.body);
  await PlaceOrder.findOneAndUpdate({}, formData, { upsert: true, new: true });
  res.redirect('/admin/place-order');
});

function processFormData(body) {
  // Implement your form data processing logic here
  return body;
}

module.exports = router;
