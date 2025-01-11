require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const cryptoRoutes = require('./routes/cryptoRoutes');
const fetchCryptoData = require('./services/fetchCryptoData');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Schedule Background Job
fetchCryptoData();
cron.schedule('0 */2 * * *', fetchCryptoData);

// Middleware
app.use(express.json());
app.use('/api', cryptoRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
