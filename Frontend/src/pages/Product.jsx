// Product.jsx — L-series product listing and add to cart

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'
import useCart from '../store/cart'

function Product() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState({}) // { productId: number }
  const [added, setAdded] = useState({}) // { productId: bool }
  const addToCart = useCart((s) => s.add)

  useEffect(() => {
    api.get('/products').then((r) => {
      setProducts(r.data)
      const qtyInit = {}
      r.data.forEach((p) => (qtyInit[p.id] = 1))
      setQty(qtyInit)
      setLoading(false)
    })
  }, [])

  function handleAdd(product) {
    addToCart(product, qty[product.id] || 1)
    setAdded({ ...added, [product.id]: true })
    setTimeout(() => setAdded((a) => ({ ...a, [product.id]: false })), 1500)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-400">Loading products...</div>
      </div>
    )
  }

  return (
    <div>
      <section className="section pt-32">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Choose Your <span className="text-brand-500">L-Series</span> Model
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            All three models run on 3–5W, support up to 100 sessions per host, and include a mounting bracket, mic, and speaker ports.
          </p>
        </div>

        {/* Comparison table */}
        <div className="card mb-12 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 text-slate-500 font-medium">Feature</th>
                {products.map((p) => (
                  <th key={p.id} className="text-center py-3 text-white font-bold">{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Price', get: (p) => `₹${p.price.toLocaleString()}` },
                { label: 'Video Port', get: (p) => p.videoPort },
                { label: 'Max Resolution', get: (p) => p.maxResolution },
                { label: 'USB Ports', get: (p) => p.usbPorts },
                { label: 'Power Draw', get: () => '3–5W' },
                { label: 'Max Sessions', get: () => 'Up to 100' },
              ].map((row) => (
                <tr key={row.label} className="border-b border-white/5">
                  <td className="py-3 text-slate-500">{row.label}</td>
                  {products.map((p) => (
                    <td key={p.id} className="py-3 text-center text-white">{row.get(p)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Product cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="card flex flex-col hover:border-brand-500/40 transition-all">
              {/* Visual icon */}
              <div className="w-full h-32 rounded-xl bg-gradient-to-br from-brand-500/20 to-purple-500/10 flex items-center justify-center mb-4 text-5xl">
                📺
              </div>

              <div className="flex items-center justify-between mb-1">
                <h2 className="text-xl font-bold text-white">NComputing {p.name}</h2>
                <span className="badge bg-brand-500/10 text-brand-500 border border-brand-500/20">{p.videoPort}</span>
              </div>

              <p className="text-slate-400 text-sm mb-4">{p.tagline}</p>

              <div className="space-y-2 text-sm mb-6">
                <div className="flex justify-between text-slate-400">
                  <span>Max Resolution</span><span className="text-white">{p.maxResolution}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>USB Ports</span><span className="text-white">{p.usbPorts}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Power Draw</span><span className="text-white">3–5W</span>
                </div>
              </div>

              <div className="mt-auto">
                <div className="text-2xl font-bold text-white mb-4">₹{p.price.toLocaleString()}</div>

                {/* Qty stepper */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-slate-500 text-sm">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQty({ ...qty, [p.id]: Math.max(1, (qty[p.id] || 1) - 1) })}
                      className="w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-white font-medium">{qty[p.id] || 1}</span>
                    <button
                      onClick={() => setQty({ ...qty, [p.id]: (qty[p.id] || 1) + 1 })}
                      className="w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleAdd(p)}
                  className={`w-full btn transition-all ${added[p.id] ? 'bg-green-500 text-white' : 'btn-primary'}`}
                >
                  {added[p.id] ? '✓ Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart CTA */}
        <div className="text-center mt-12">
          <Link to="/cart" className="btn-outline">View Cart →</Link>
        </div>
      </section>
    </div>
  )
}

export default Product
