// ProductCard.jsx — reusable card for a single L-Series product

import { useState } from 'react'
import useCart from '../store/cart'

function ProductCard({ product }) {
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const addToCart = useCart((s) => s.add)

  function handleAdd() {
    addToCart(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="card flex flex-col hover:border-brand-500/40 transition-all">
      {/* Icon */}
      <div className="w-full h-28 rounded-xl bg-gradient-to-br from-brand-500/20 to-purple-500/10 flex items-center justify-center mb-4 text-5xl">
        📺
      </div>

      <div className="flex items-center justify-between mb-1">
        <h2 className="text-lg font-bold text-white">NComputing {product.name}</h2>
        <span className="badge bg-brand-500/10 text-brand-500 border border-brand-500/20 text-xs px-2">{product.videoPort}</span>
      </div>

      <p className="text-slate-400 text-sm mb-3">{product.tagline}</p>

      <div className="space-y-1.5 text-sm mb-4">
        {[
          ['Resolution', product.maxResolution],
          ['USB', product.usbPorts],
          ['Power', '3–5W'],
        ].map(([label, val]) => (
          <div key={label} className="flex justify-between text-slate-400">
            <span>{label}</span>
            <span className="text-white">{val}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <div className="text-xl font-bold text-white mb-3">₹{product.price.toLocaleString()}</div>

        <div className="flex items-center gap-2 mb-3">
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors">−</button>
          <span className="w-8 text-center text-white font-medium">{qty}</span>
          <button onClick={() => setQty(qty + 1)} className="w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors">+</button>
        </div>

        <button
          onClick={handleAdd}
          className={`w-full btn ${added ? 'bg-green-500 text-white' : 'btn-primary'}`}
        >
          {added ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard
