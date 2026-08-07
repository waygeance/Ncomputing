// Cart.jsx — Cart page

import { Link } from 'react-router-dom'
import useCart from '../store/cart'

function Cart() {
  const items = useCart((s) => s.items)
  const update = useCart((s) => s.update)
  const remove = useCart((s) => s.remove)

  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0)

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="text-6xl">🛒</div>
        <h2 className="text-2xl font-bold text-white">Your cart is empty</h2>
        <p className="text-slate-400">Go back and pick a product to get started.</p>
        <Link to="/product" className="btn-primary mt-2">Browse Products</Link>
      </div>
    )
  }

  return (
    <div className="section pt-32">
      <h1 className="text-3xl font-bold text-white mb-8">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Items */}
        <div className="md:col-span-2 space-y-4">
          {items.map(({ product, qty }) => (
            <div key={product.id} className="card flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-brand-500/20 flex items-center justify-center text-2xl flex-shrink-0">
                📺
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">NComputing {product.name}</h3>
                <p className="text-sm text-slate-400">{product.tagline}</p>
                <p className="text-sm text-slate-500">Unit: ₹{product.price.toLocaleString()}</p>
              </div>

              {/* Qty stepper */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => update(product.id, qty - 1)}
                  className="w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  −
                </button>
                <span className="w-6 text-center text-white font-medium">{qty}</span>
                <button
                  onClick={() => update(product.id, qty + 1)}
                  className="w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  +
                </button>
              </div>

              <div className="text-right min-w-[80px]">
                <div className="font-bold text-white">₹{(product.price * qty).toLocaleString()}</div>
                <button
                  onClick={() => remove(product.id)}
                  className="text-xs text-red-400 hover:text-red-300 mt-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="card h-fit">
          <h2 className="text-lg font-bold text-white mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            {items.map(({ product, qty }) => (
              <div key={product.id} className="flex justify-between text-sm">
                <span className="text-slate-400">{product.name} × {qty}</span>
                <span className="text-white">₹{(product.price * qty).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-4 mb-6">
            <div className="flex justify-between font-bold text-white">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>
          <Link to="/checkout" className="btn-primary w-full text-center">
            Proceed to Checkout →
          </Link>
          <Link to="/product" className="btn-ghost w-full text-center mt-3 text-sm">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart
