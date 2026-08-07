// Cart.jsx — clean white cart page

import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import useCart from '../store/cart'

const IMAGES = { L250: '/PNG/L250.png', L300: '/PNG/L300_1.png', L350: '/PNG/L350.png' }

function Cart() {
  const items = useCart((s) => s.items)
  const update = useCart((s) => s.update)
  const remove = useCart((s) => s.remove)

  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0)

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 pt-16 bg-nc-bg">
        <ShoppingBag size={56} className="text-nc-border" />
        <h2 className="text-20 font-bold text-nc-dark">Your cart is empty</h2>
        <p className="text-nc-mid text-15">Go back and pick a product to get started.</p>
        <Link to="/product" className="btn-green mt-2">Browse Products</Link>
      </div>
    )
  }

  return (
    <div className="pt-16 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-34 font-bold text-nc-dark font-open mb-8">Your Cart</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Items */}
          <div className="md:col-span-2 space-y-3">
            <AnimatePresence>
              {items.map(({ product, qty }) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="card flex items-center gap-5"
                >
                  {/* Image */}
                  <div className="w-20 h-20 bg-nc-bg rounded-lg flex items-center justify-center shrink-0">
                    <img
                      src={IMAGES[product.name] || '/PNG/L300_1.png'}
                      alt={product.name}
                      className="h-16 w-auto object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-nc-dark text-16">NComputing {product.name}</h3>
                    <p className="text-14 text-nc-mid truncate">{product.tagline}</p>
                    <p className="text-14 text-nc-light">₹{product.price.toLocaleString()} each</p>
                  </div>

                  {/* Qty */}
                  <div className="flex items-center border border-nc-border rounded overflow-hidden shrink-0">
                    <button onClick={() => update(product.id, qty - 1)} className="w-8 h-8 hover:bg-nc-bg transition-colors font-bold text-nc-body">−</button>
                    <span className="w-8 text-center text-15 font-medium border-x border-nc-border">{qty}</span>
                    <button onClick={() => update(product.id, qty + 1)} className="w-8 h-8 hover:bg-nc-bg transition-colors font-bold text-nc-body">+</button>
                  </div>

                  {/* Subtotal + Remove */}
                  <div className="text-right shrink-0">
                    <div className="font-bold text-nc-dark text-16">₹{(product.price * qty).toLocaleString()}</div>
                    <button
                      onClick={() => remove(product.id)}
                      className="mt-1 flex items-center gap-1 text-13 text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="card h-fit sticky top-20">
            <h2 className="text-17 font-bold text-nc-dark mb-5 border-b border-nc-border pb-3">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {items.map(({ product, qty }) => (
                <div key={product.id} className="flex justify-between text-14">
                  <span className="text-nc-mid">{product.name} × {qty}</span>
                  <span className="text-nc-body font-medium">₹{(product.price * qty).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-nc-border pt-4 mb-5">
              <div className="flex justify-between font-bold text-17 text-nc-dark">
                <span>Total</span>
                <span className="text-brand">₹{total.toLocaleString()}</span>
              </div>
            </div>
            <Link to="/checkout" className="btn-green w-full justify-center">
              Checkout <ArrowRight size={16} />
            </Link>
            <Link to="/product" className="btn-ghost w-full justify-center mt-2 text-14">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
