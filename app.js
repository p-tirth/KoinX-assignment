require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
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

// Home Route to Display README.md Content with Styles
app.get('/', (req, res) => {
  const readmePath = path.join(__dirname, 'README.md');

  fs.readFile(readmePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading README.md file');
    }

    // Apply styles to the page
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Crypto Tracker - README</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .container {
            background-color: #fff;
            padding: 20px;
            margin: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 90%;
            max-width: 800px;
          }
          h1 {
            text-align: center;
            color: #333;
          }
          pre {
            background-color: #f0f0f0;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Crypto Tracker - README</h1>
          <pre>${data}</pre>
        </div>
      </body>
      </html>
    `);
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
  