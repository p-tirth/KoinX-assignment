const express = require('express');
const router = express.Router();
const Crypto = require('../models/crypto.js');

// Task 2: /stats API
router.get('/stats', async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: 'Coin query parameter is required' });
  }

  const latestData = await Crypto.findOne({ coin }).sort({ timestamp: -1 });
  if (!latestData) {
    return res.status(404).json({ error: 'No data found for the requested coin' });
  }

  res.json({
    price: latestData.price,
    marketCap: latestData.marketCap,
    '24hChange': latestData.change24h,
  });
});

// Task 3: /deviation API
router.get('/deviation', async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: 'Coin query parameter is required' });
  }

  const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
  if (records.length < 2) {
    return res.status(400).json({ error: 'Not enough data to calculate deviation' });
  }

  const prices = records.map(record => record.price);
  const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
  const variance = prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / prices.length;
  const deviation = Math.sqrt(variance).toFixed(2);

  res.json({ deviation });
});

module.exports = router;
