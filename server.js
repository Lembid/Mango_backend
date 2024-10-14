require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Add this new route
app.get('/', (req, res) => {
  res.send('Welcome to OptimizeTax API');
});

const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Load models after successful connection
    require('./models/Individual');
    require('./models/Business');
    require('./models/PlaceOrder');
  })
  .catch(err => console.error('Could not connect to MongoDB', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
