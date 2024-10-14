const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', (req, res) => {
  res.render('admin/dashboard', { path: '/admin' });
});

['individual', 'business', 'place-order'].forEach(route => {
  router.get(`/${route}`, async (req, res) => {
    let data = await db[`get${route.charAt(0).toUpperCase() + route.slice(1).replace('-', '')}DB`]();
    if (!data) {
      data = {};
    }
    if (!data.cards || !Array.isArray(data.cards) || data.cards.length < 3) {
      data.cards = [
        { title: '', description: '' },
        { title: '', description: '' },
        { title: '', description: '' }
      ];
    }
    res.render(`admin/${route}`, { data, path: `/admin/${route}` });
  });

  router.post(`/${route}`, async (req, res) => {
    const formData = processFormData(req.body);
    await db[`update${route.charAt(0).toUpperCase() + route.slice(1).replace('-', '')}DB`](formData);
    res.redirect(`/admin/${route}`);
  });
});

function processFormData(body) {
  // Implement your form data processing logic here
  return body;
}

module.exports = router;
