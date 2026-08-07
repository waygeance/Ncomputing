// OrderConfirm.jsx — success page

import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Package, MapPin, Mail } from 'lucide-react'
import api from '../lib/api'

function OrderConfirm() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/orders/${id}`).then((r) => { setOrder(r.data); setLoading(false) })
  }, [id])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="text-nc-mid">Loading your order...</div>
    </div>
  )

  if (!order) return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="text-nc-mid">Order not found.</div>
    </div>
  )

  return (
    <div className="pt-16 bg-nc-bg min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-16">

        {/* Success header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="w-20 h-20 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-5"
          >
            <CheckCircle size={40} className="text-brand" />
          </motion.div>
          <h1 className="text-34 font-bold text-nc-dark font-open mb-2">Payment Successful!</h1>
          <p className="text-nc-mid text-16 flex items-center justify-center gap-2">
            <Mail size={15} />
            Confirmation sent to <strong className="text-nc-dark">{order.email}</strong>
          </p>
        </motion.div>

        {/* Order card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-4"
        >
          <div className="flex justify-between items-start mb-5 pb-4 border-b border-nc-border">
            <div>
              <p className="text-13 text-nc-mid uppercase tracking-wide mb-1">Order ID</p>
              <p className="font-mono text-14 text-nc-dark">{order.id}</p>
            </div>
            <span className="badge-green">{order.paymentStatus}</span>
          </div>

          {/* Items */}
          <div className="space-y-2 mb-5">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-14">
                <span className="text-nc-mid flex items-center gap-2">
                  <Package size={13} className="text-brand" />
                  NComputing {item.product.name} × {item.quantity}
                </span>
                <span className="font-medium text-nc-dark">₹{(item.unitPrice * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-nc-border pt-4 flex justify-between font-bold text-17 text-nc-dark">
            <span>Total Paid</span>
            <span className="text-brand">₹{order.totalAmount.toLocaleString()}</span>
          </div>
        </motion.div>

        {/* Shipping */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card mb-8"
        >
          <div className="flex items-start gap-3">
            <MapPin size={16} className="text-brand mt-0.5 shrink-0" />
            <div>
              <p className="text-15 font-medium text-nc-dark mb-1">Shipping To</p>
              <p className="text-14 text-nc-mid">{order.customerName}</p>
              <p className="text-14 text-nc-mid">{order.shippingAddress}</p>
              <p className="text-14 text-nc-mid">{order.city}, {order.state} — {order.pincode}</p>
              <p className="text-13 text-nc-light mt-2">We'll notify you once your order is shipped.</p>
            </div>
          </div>
        </motion.div>

        <div className="text-center">
          <Link to="/" className="btn-green">Back to Home</Link>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirm
