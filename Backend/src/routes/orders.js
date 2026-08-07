// orders.js — POST /api/orders, GET /api/orders/:id

const router = require('express').Router();
const db = require('../lib/prisma');
const rz = require('../lib/razorpay');

// Create order + Razorpay order
router.post('/', async (req, res) => {
  try {
    const { customerName, email, phone, shippingAddress, billingAddress, city, state, pincode, items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Fetch products from DB to get current prices
    const productIds = items.map((i) => i.productId);
    const products = await db.product.findMany({ where: { id: { in: productIds } } });
    const priceMap = {};
    products.forEach((p) => (priceMap[p.id] = p.price));

    // Calculate total
    let total = 0;
    const orderItems = items.map((i) => {
      const price = priceMap[i.productId];
      total += price * i.quantity;
      return { productId: i.productId, quantity: i.quantity, unitPrice: price };
    });

    // Create DB order
    const order = await db.order.create({
      data: {
        customerName,
        email,
        phone,
        shippingAddress,
        billingAddress: billingAddress || shippingAddress,
        city,
        state,
        pincode,
        totalAmount: total,
        items: { create: orderItems },
      },
    });

    // Create Razorpay order (amount in paise)
    const rzOrder = await rz.orders.create({
      amount: total * 100,
      currency: 'INR',
      receipt: order.id,
    });

    // Save razorpayOrderId
    await db.order.update({
      where: { id: order.id },
      data: { razorpayOrderId: rzOrder.id },
    });

    res.status(201).json({ orderId: order.id, razorpayOrderId: rzOrder.id, total });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get single order (for confirmation page)
router.get('/:id', async (req, res) => {
  try {
    const order = await db.order.findUnique({
      where: { id: req.params.id },
      include: { items: { include: { product: true } } },
    });
    if (!order) return res.status(404).json({ error: 'Not found' });
    res.json(order);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
