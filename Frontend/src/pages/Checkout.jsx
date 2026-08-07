// Checkout.jsx — clean white form + sticky summary

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, CreditCard } from 'lucide-react'
import api from '../lib/api'
import useCart from '../store/cart'

const EMPTY = {
  name: '', email: '', phone: '',
  address: '', city: '', state: '', pincode: '',
  sameAddress: true, billing: '',
}

function Field({ label, ...props }) {
  return (
    <div>
      <label className="label">{label}</label>
      <input className="input" {...props} />
    </div>
  )
}

function Checkout() {
  const items = useCart((s) => s.items)
  const clear = useCart((s) => s.clear)
  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0)
  const navigate = useNavigate()

  const [form, setForm] = useState(EMPTY)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')

  function change(e) {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  async function pay() {
    setLoading(true); setErr('')
    try {
      const { data } = await api.post('/orders', {
        customerName: form.name, email: form.email, phone: form.phone,
        shippingAddress: form.address, billingAddress: form.sameAddress ? form.address : form.billing,
        city: form.city, state: form.state, pincode: form.pincode,
        items: items.map((i) => ({ productId: i.product.id, quantity: i.qty })),
      })
      const { orderId, razorpayOrderId } = data
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: total * 100, currency: 'INR',
        name: 'NComputing L-Series', description: 'Thin client order',
        order_id: razorpayOrderId,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: '#4dab00' },
        handler: async (response) => {
          await api.post('/payments/verify', {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            orderId,
          })
          clear()
          navigate(`/order-confirmation/${orderId}`)
        },
        modal: { ondismiss: () => setLoading(false) },
      }
      new window.Razorpay(options).open()
    } catch (e) {
      setErr(e.response?.data?.error || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  if (items.length === 0) return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <p className="text-nc-mid">No items in cart.</p>
    </div>
  )

  return (
    <div className="pt-16 bg-nc-bg min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-34 font-bold text-nc-dark font-open mb-8">Checkout</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); pay() }} className="md:col-span-2 space-y-5">

            {/* Contact */}
            <div className="card space-y-4">
              <h2 className="text-17 font-bold text-nc-dark border-b border-nc-border pb-3">Contact Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Full Name *" name="name" value={form.name} onChange={change} required placeholder="Rahul Sharma" />
                <Field label="Email *" name="email" type="email" value={form.email} onChange={change} required placeholder="rahul@school.edu" />
              </div>
              <Field label="Phone *" name="phone" value={form.phone} onChange={change} required placeholder="+91 9876543210" />
            </div>

            {/* Shipping */}
            <div className="card space-y-4">
              <h2 className="text-17 font-bold text-nc-dark border-b border-nc-border pb-3">Shipping Address</h2>
              <Field label="Address *" name="address" value={form.address} onChange={change} required placeholder="Street, Building, Area" />
              <div className="grid grid-cols-3 gap-4">
                <Field label="City *" name="city" value={form.city} onChange={change} required placeholder="Pune" />
                <Field label="State *" name="state" value={form.state} onChange={change} required placeholder="Maharashtra" />
                <Field label="Pincode *" name="pincode" value={form.pincode} onChange={change} required placeholder="411001" />
              </div>
            </div>

            {/* Billing */}
            <div className="card space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="sameAddress" checked={form.sameAddress} onChange={change} className="w-4 h-4 accent-brand rounded" />
                <span className="text-15 text-nc-body">Billing address same as shipping</span>
              </label>
              {!form.sameAddress && (
                <Field label="Billing Address *" name="billing" value={form.billing} onChange={change} required placeholder="Billing address" />
              )}
            </div>

            {err && <p className="text-red-500 text-14">{err}</p>}

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              className="btn-green w-full justify-center text-16 py-4"
            >
              <Lock size={16} />
              {loading ? 'Processing...' : `Pay ₹${total.toLocaleString()} via Razorpay`}
            </motion.button>

            <p className="text-13 text-nc-light text-center flex items-center justify-center gap-1">
              <Lock size={12} /> Secured by Razorpay. Test mode — no real charges.
            </p>
          </form>

          {/* Summary */}
          <div className="card h-fit sticky top-20">
            <h2 className="text-17 font-bold text-nc-dark border-b border-nc-border pb-3 mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {items.map(({ product, qty }) => (
                <div key={product.id} className="flex justify-between text-14">
                  <span className="text-nc-mid">{product.name} × {qty}</span>
                  <span className="font-medium text-nc-body">₹{(product.price * qty).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-nc-border pt-3 flex justify-between font-bold text-17 text-nc-dark">
              <span>Total</span>
              <span className="text-brand">₹{total.toLocaleString()}</span>
            </div>
            <div className="mt-5 flex items-center gap-2 text-13 text-nc-light">
              <CreditCard size={14} className="text-brand" />
              Test card: 4111 1111 1111 1111
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
