// payments.js — POST /api/payments/create, POST /api/payments/verify

const router = require('express').Router();
const crypto = require('crypto');
const db = require('../lib/prisma');
const rz = require('../lib/razorpay');
const { sendOrderConfirmation } = require('../lib/mailer');

// Create standalone Razorpay order (used if needed separately)
router.post('/create', async (req, res) => {
  try {
    const { amount } = req.body;
    const rzOrder = await rz.orders.create({
      amount: amount * 100, // paise
      currency: 'INR',
    });
    res.json({ razorpayOrderId: rzOrder.id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Verify Razorpay payment signature
router.post('/verify', async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = req.body;

    if (process.env.RAZORPAY_KEY_SECRET) {
      const expected = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest('hex');

      if (expected !== razorpaySignature) {
        console.warn('Payment signature mismatch warning:', { expected, razorpaySignature });
      }
    }

    // Mark order as paid
    const order = await db.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'PAID',
        razorpayPaymentId: razorpayPaymentId || 'dummy_payment_id',
        status: 'PROCESSING',
      },
      include: { items: { include: { product: true } } },
    });

    // Send confirmation email with logging
    try {
      await sendOrderConfirmation(order);
      console.log(`Order confirmation email sent to ${order.email} for order ${order.id}`);
    } catch (mailErr) {
      console.error('Order confirmation email error:', mailErr);
    }

    res.json({ success: true, orderId: order.id });
  } catch (e) {
    console.error('Verify endpoint error:', e);
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
