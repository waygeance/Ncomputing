// Product.jsx — L-Series product page with real images, comparison table

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import api from '../lib/api'
import ProductCard from '../components/ProductCard'

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

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
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-nc-mid">Loading products...</div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero */}
      <section className="hero-strip py-16 pt-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="accent-line mx-auto" />
            <h1 className="text-44 font-bold text-white font-open mb-3">
              Choose Your <span className="text-brand">L-Series</span> Model
            </h1>
            <p className="text-17 text-gray-300 max-w-lg mx-auto">
              All three models: up to 100 sessions per server, 3–5W power, mounting bracket, mic and speaker ports.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="section border-b border-nc-border">
        <div className="text-center mb-8">
          <span className="accent-line mx-auto" />
          <h2 className="section-title mb-2">L-Series Family Comparison</h2>
        </div>

        <div className="overflow-x-auto rounded-xl border border-nc-border shadow-card">
          <table className="admin-table w-full">
            <thead>
              <tr>
                <th className="text-left">Feature</th>
                {products.map((p) => (
                  <th key={p.id} className="text-center py-4">
                    <div className="font-bold text-nc-dark text-17">{p.name}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Price', get: (p) => <span className="font-bold text-brand">₹{p.price.toLocaleString()}</span> },
                { label: 'Video Port', get: (p) => p.videoPort },
                { label: 'Max Resolution', get: (p) => p.maxResolution },
                { label: 'USB Ports', get: (p) => p.usbPorts },
                { label: 'Power Draw', get: () => '3–5W' },
                { label: 'Max Sessions', get: () => 'Up to 100' },
                { label: 'Mounting Bracket', get: () => <span className="text-brand font-bold">✓</span> },
                { label: 'Mic + Speaker', get: () => <span className="text-brand font-bold">✓</span> },
              ].map(({ label, get }) => (
                <tr key={label}>
                  <td className="font-medium text-nc-body">{label}</td>
                  {products.map((p) => (
                    <td key={p.id} className="text-center">{get(p)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Product cards */}
      <section className="section">
        <div className="text-center mb-10">
          <span className="accent-line mx-auto" />
          <h2 className="section-title mb-2">Order Online</h2>
          <p className="section-sub">Select model, quantity, and add to cart — no sales call needed.</p>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {products.map((p) => (
            <motion.div key={p.id} variants={fade}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-10">
          <Link to="/cart" className="btn-outline-green inline-flex items-center gap-2">
            <ShoppingCart size={16} /> View Cart
          </Link>
        </div>
      </section>

      {/* Connections section */}
      <section className="bg-nc-bg py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="accent-line mx-auto" />
            <h2 className="section-title mb-2">Connections</h2>
            <p className="section-sub">See the port layout of each L-Series model</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { model: 'L350', img: '/PNG/Connections_L350.png' },
              { model: 'L300', img: '/PNG/Connections_L300.png' },
              { model: 'L250', img: '/PNG/L250-connections.png' },
            ].map(({ model, img }) => (
              <div key={model} className="card text-center">
                <h3 className="text-17 font-bold text-nc-dark mb-3">{model} Connections</h3>
                <img src={img} alt={`${model} connections`} className="w-full rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Product
