// server.js — Express app entry point

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const products = require('./routes/products');
const orders = require('./routes/orders');
const leads = require('./routes/leads');
const payments = require('./routes/payments');
const admin = require('./routes/admin');

const app = express();

app.use(cors());
app.options('*', cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Routes
app.use('/api/products', products);
app.use('/api/orders', orders);
app.use('/api/leads', leads);
app.use('/api/payments', payments);
app.use('/api/admin', admin);

// Error handler to prevent header dropping on failures
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
