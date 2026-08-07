// products.js — GET /api/products, GET /api/products/:id

const router = require('express').Router();
const db = require('../lib/prisma');

// List all products
router.get('/', async (req, res) => {
  try {
    const list = await db.product.findMany({ orderBy: { price: 'asc' } });
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Single product
router.get('/:id', async (req, res) => {
  try {
    const product = await db.product.findUnique({ where: { id: req.params.id } });
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
