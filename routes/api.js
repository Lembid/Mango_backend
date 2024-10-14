const express = require('express');
const router = express.Router();
const db = require('../config/database');

['individual', 'business', 'place-order'].forEach(route => {
  router.get(`/${route}`, async (req, res) => {
    try {
      const data = await db[`get${route.charAt(0).toUpperCase() + route.slice(1).replace('-', '')}DB`]();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.post(`/${route}`, async (req, res) => {
    try {
      const data = await db[`update${route.charAt(0).toUpperCase() + route.slice(1).replace('-', '')}DB`](req.body);
      res.json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
});

module.exports = router;