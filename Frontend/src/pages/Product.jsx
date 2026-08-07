// Product.jsx — L-series product listing and add to cart

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'
import ProductCard from '../components/ProductCard'

function Product() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/products').then((r) => {
      setProducts(r.data)
      setLoading(false)
    })
  }, [])

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
            <ProductCard key={p.id} product={p} />
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
