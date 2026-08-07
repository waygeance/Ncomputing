// ProductCard.jsx — real product image, clean NComputing card

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Check } from 'lucide-react'
import useCart from '../store/cart'

const IMAGES = { L250: '/PNG/L250.png', L300: '/PNG/L300_1.png', L350: '/PNG/L350.png' }

function ProductCard({ product }) {
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const add = useCart((s) => s.add)

  function handleAdd() {
    add(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const img = IMAGES[product.name] || '/PNG/L300_1.png'

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="card flex flex-col"
    >
      {/* Image area */}
      <div className="bg-nc-bg rounded-lg flex items-center justify-center p-6 mb-5 relative">
        <img src={img} alt={`NComputing ${product.name}`} className="h-32 w-auto object-contain" />
        <span className="absolute top-3 right-3 badge-green text-13">{product.videoPort}</span>
      </div>

      {/* Info */}
      <h2 className="text-20 font-bold text-nc-dark mb-1">NComputing {product.name}</h2>
      <p className="text-14 text-nc-mid mb-4">{product.tagline}</p>

      {/* Specs */}
      <div className="mb-5 space-y-1.5">
        <div className="spec-row">
          <span className="text-nc-mid">Max Resolution</span>
          <span className="font-medium text-nc-dark">{product.maxResolution}</span>
        </div>
        <div className="spec-row">
          <span className="text-nc-mid">USB Ports</span>
          <span className="font-medium text-nc-dark">{product.usbPorts}</span>
        </div>
        <div className="spec-row">
          <span className="text-nc-mid">Power Draw</span>
          <span className="font-medium text-nc-dark">3–5W</span>
        </div>
        <div className="spec-row">
          <span className="text-nc-mid">Max Sessions</span>
          <span className="font-medium text-nc-dark">Up to 100</span>
        </div>
      </div>

      {/* Price + Qty + CTA */}
      <div className="mt-auto">
        <div className="text-27 font-bold text-brand mb-4">₹{product.price.toLocaleString()}</div>

        <div className="flex items-center gap-3 mb-3">
          <span className="text-14 text-nc-mid">Qty:</span>
          <div className="flex items-center border border-nc-border rounded overflow-hidden">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-9 h-9 text-nc-body hover:bg-nc-bg transition-colors text-lg font-bold flex items-center justify-center"
            >
              −
            </button>
            <span className="w-10 text-center text-15 font-medium text-nc-dark border-x border-nc-border py-1">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-9 h-9 text-nc-body hover:bg-nc-bg transition-colors text-lg font-bold flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>

        <motion.button
          onClick={handleAdd}
          whileTap={{ scale: 0.97 }}
          className={`w-full btn transition-all ${added ? 'bg-green-600 text-white' : 'btn-green'}`}
        >
          {added ? (
            <><Check size={16} /> Added to Cart</>
          ) : (
            <><ShoppingCart size={16} /> Add to Cart</>
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}

export default ProductCard
