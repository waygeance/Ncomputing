// admin.js — admin login + protected order/lead management routes

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const db = require('../lib/prisma');
const auth = require('../middleware/auth');

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { password } = req.body;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Wrong password' });
  }
  const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
});

// GET /api/admin/orders?status=&search=
router.get('/orders', auth, async (req, res) => {
  try {
    const { status, search } = req.query;
    const where = {};

    if (status) where.status = status;
    if (search) {
      where.OR = [
        { customerName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const orders = await db.order.findMany({
      where,
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PATCH /api/admin/orders/:id/status
router.patch('/orders/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await db.order.update({
      where: { id: req.params.id },
      data: { status },
    });
    res.json(order);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/admin/leads
router.get('/leads', auth, async (req, res) => {
  try {
    const leads = await db.lead.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(leads);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
