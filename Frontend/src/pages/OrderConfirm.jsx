// OrderConfirm.jsx — Order confirmation page

import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../lib/api'

function OrderConfirm() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/orders/${id}`).then((r) => {
      setOrder(r.data)
      setLoading(false)
    })
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-400">Loading your order...</div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-400">Order not found.</div>
      </div>
    )
  }

  return (
    <div className="section pt-32 max-w-2xl">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
        <p className="text-slate-400">
          A confirmation email has been sent to <strong className="text-white">{order.email}</strong>
        </p>
      </div>

      {/* Order card */}
      <div className="card mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="font-semibold text-white">Order ID</h2>
            <p className="text-slate-500 text-sm font-mono">{order.id}</p>
          </div>
          <span className="badge bg-green-500/10 text-green-400 border border-green-500/20">
            {order.paymentStatus}
          </span>
        </div>

        {/* Items */}
        <div className="space-y-3 mb-6">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-slate-300">NComputing {item.product.name} × {item.quantity}</span>
              <span className="text-white">₹{(item.unitPrice * item.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-4 flex justify-between font-bold text-white">
          <span>Total Paid</span>
          <span>₹{order.totalAmount.toLocaleString()}</span>
        </div>
      </div>

      {/* Shipping */}
      <div className="card mb-8">
        <h2 className="font-semibold text-white mb-3">Shipping To</h2>
        <p className="text-slate-400 text-sm">{order.customerName}</p>
        <p className="text-slate-400 text-sm">{order.shippingAddress}</p>
        <p className="text-slate-400 text-sm">{order.city}, {order.state} — {order.pincode}</p>
        <p className="text-slate-500 text-xs mt-3">We'll notify you once your order is shipped.</p>
      </div>

      <div className="text-center">
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    </div>
  )
}

export default OrderConfirm
