// mailer.js — sends order confirmation email via Gmail SMTP

const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendOrderConfirmation(order) {
  const items = order.items
    .map((i) => `  - ${i.product.name} x${i.quantity} = ₹${i.unitPrice * i.quantity}`)
    .join('\n');

  const body = `
Hi ${order.customerName},

Thank you for your order!

Order ID: ${order.id}
Items:
${items}

Total: ₹${order.totalAmount}

Shipping to:
${order.shippingAddress}, ${order.city}, ${order.state} - ${order.pincode}

We'll notify you once your order is shipped.

– NComputing L-Series Team
  `.trim();

  await transport.sendMail({
    from: `"NComputing L-Series" <${process.env.SMTP_USER}>`,
    to: order.email,
    subject: `Order Confirmed — ${order.id}`,
    text: body,
  });
}

module.exports = { sendOrderConfirmation };
