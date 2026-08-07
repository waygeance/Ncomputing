// leads.js — POST /api/leads

const router = require('express').Router();
const db = require('../lib/prisma');

// Submit a lead
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, company, type, message } = req.body;
    if (!name || !email || !type) {
      return res.status(400).json({ error: 'name, email, and type are required' });
    }
    const lead = await db.lead.create({
      data: { name, email, phone, company, type, message },
    });
    res.status(201).json(lead);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
