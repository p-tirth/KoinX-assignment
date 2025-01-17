# KoinX-assignment


# Crypto Tracker

This is a server-side application built using Node.js and MongoDB Atlas to track cryptocurrency data.

## Features

- Fetches the latest price, market cap, and 24-hour change of Bitcoin, Matic, and Ethereum every 2 hours.
- Provides APIs to get the latest stats and the standard deviation of prices.

## APIs

1. **GET /api/stats?coin=bitcoin**Returns the latest stats for the requested cryptocurrency.
2. **GET /api/deviation?coin=bitcoin**
   Returns the standard deviation of the price for the last 100 records of the requested cryptocurrency.

## Setup

1. Clone the repository.
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` file and add your MongoDB Atlas connection string.
4. Start the server

   ```bash
   npm start
   ```
