const axios = require('axios');
const Crypto = require('../models/crypto.js');

const fetchCryptoData = async () => {
  const coins = ['bitcoin', 'matic-network', 'ethereum'];
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;

  try {
    const response = await axios.get(url);
    console.log(url)
    const data = response.data;

    coins.forEach(async coin => {
      const cryptoData = new Crypto({
        coin,
        price: data[coin].usd,
        marketCap: data[coin].usd_market_cap,
        change24h: data[coin].usd_24h_change,
      });
      await cryptoData.save();
    });

    console.log('Crypto data fetched and saved to the database');
  } catch (error) {
    console.error('Error fetching crypto data:', error);
  }
};

module.exports = fetchCryptoData;
