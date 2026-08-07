// razorpay.js — shared Razorpay instance

const Razorpay = require('razorpay');

const rz = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = rz;
