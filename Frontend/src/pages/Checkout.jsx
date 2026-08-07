// Checkout.jsx — Shipping/billing form + Razorpay payment

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api'
import useCart from '../store/cart'

const EMPTY = {
  name: '', email: '', phone: '',
  address: '', city: '', state: '', pincode: '',
  sameAddress: true, billing: '',
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
    setLoading(true)
    setErr('')
    try {
      // 1. Create order on backend
      const { data } = await api.post('/orders', {
        customerName: form.name,
        email: form.email,
        phone: form.phone,
        shippingAddress: form.address,
        billingAddress: form.sameAddress ? form.address : form.billing,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        items: items.map((i) => ({ productId: i.product.id, quantity: i.qty })),
      })

      const { orderId, razorpayOrderId } = data

      // 2. Open Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: total * 100,
        currency: 'INR',
        name: 'NComputing L-Series',
        description: 'Thin client order',
        order_id: razorpayOrderId,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: '#4f46e5' },
        handler: async (response) => {
          // 3. Verify payment
          await api.post('/payments/verify', {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            orderId,
          })
          clear()
          navigate(`/order-confirmation/${orderId}`)
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (e) {
      setErr(e.response?.data?.error || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  function submit(e) {
    e.preventDefault()
    pay()
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-slate-400">No items in cart.</p>
      </div>
    )
  }

  return (
    <div className="section pt-32">
      <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <form onSubmit={submit} className="md:col-span-2 space-y-6">
          {/* Contact */}
          <div className="card space-y-4">
            <h2 className="font-semibold text-white">Contact Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Full Name *</label>
                <input name="name" value={form.name} onChange={change} required className="input" placeholder="Rahul Sharma" />
              </div>
              <div>
                <label className="label">Email *</label>
                <input name="email" type="email" value={form.email} onChange={change} required className="input" placeholder="rahul@school.edu" />
              </div>
            </div>
            <div>
              <label className="label">Phone *</label>
              <input name="phone" value={form.phone} onChange={change} required className="input" placeholder="+91 9876543210" />
            </div>
          </div>

          {/* Shipping */}
          <div className="card space-y-4">
            <h2 className="font-semibold text-white">Shipping Address</h2>
            <div>
              <label className="label">Address *</label>
              <input name="address" value={form.address} onChange={change} required className="input" placeholder="Street, Building, Area" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="label">City *</label>
                <input name="city" value={form.city} onChange={change} required className="input" placeholder="Pune" />
              </div>
              <div>
                <label className="label">State *</label>
                <input name="state" value={form.state} onChange={change} required className="input" placeholder="Maharashtra" />
              </div>
              <div>
                <label className="label">Pincode *</label>
                <input name="pincode" value={form.pincode} onChange={change} required className="input" placeholder="411001" />
              </div>
            </div>
          </div>

          {/* Billing */}
          <div className="card space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="sameAddress"
                name="sameAddress"
                checked={form.sameAddress}
                onChange={change}
                className="rounded"
              />
              <label htmlFor="sameAddress" className="text-sm text-slate-300 cursor-pointer">
                Billing address same as shipping
              </label>
            </div>
            {!form.sameAddress && (
              <div>
                <label className="label">Billing Address *</label>
                <input name="billing" value={form.billing} onChange={change} required className="input" placeholder="Billing address" />
              </div>
            )}
          </div>

          {err && <p className="text-red-400 text-sm">{err}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full text-base py-4">
            {loading ? 'Processing...' : `Pay ₹${total.toLocaleString()} with Razorpay`}
          </button>
        </form>

        {/* Summary */}
        <div className="card h-fit">
          <h2 className="font-semibold text-white mb-4">Order Summary</h2>
          {items.map(({ product, qty }) => (
            <div key={product.id} className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">{product.name} × {qty}</span>
              <span className="text-white">₹{(product.price * qty).toLocaleString()}</span>
            </div>
          ))}
          <div className="border-t border-white/10 pt-3 mt-3 flex justify-between font-bold text-white">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
          <p className="text-xs text-slate-500 mt-4">
            Powered by Razorpay — test mode. Use card 4111 1111 1111 1111.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Checkout
