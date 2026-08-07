// Navbar.jsx — NComputing brand white navbar

import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import useCart from '../store/cart'

const links = [
  ['/problem', 'Problem'],
  ['/solution', 'Solution'],
  ['/product', 'Products'],
]

function Navbar({ onDemo }) {
  const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0))
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-nc-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/PNG/ncomputindia-india-trans-350px.png"
            alt="NComputing India"
            className="h-8 w-auto object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" end className={({ isActive }) =>
            `text-15 font-medium transition-colors ${isActive ? 'text-brand' : 'text-nc-body hover:text-brand'}`
          }>Home</NavLink>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} className={({ isActive }) =>
              `text-15 font-medium transition-colors ${isActive ? 'text-brand' : 'text-nc-body hover:text-brand'}`
            }>{label}</NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onDemo}
            className="hidden md:inline-flex btn-green text-13 px-4 py-2"
          >
            Request Demo
          </button>

          <Link to="/cart" className="relative p-2 text-nc-body hover:text-brand transition-colors">
            <ShoppingCart size={20} />
            {count > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 bg-brand text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
              >
                {count}
              </motion.span>
            )}
          </Link>

          {/* Mobile menu toggle */}
          <button className="md:hidden p-2 text-nc-body" onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-nc-border overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              <NavLink to="/" end onClick={() => setOpen(false)} className="text-15 font-medium text-nc-body hover:text-brand">Home</NavLink>
              {links.map(([to, label]) => (
                <NavLink key={to} to={to} onClick={() => setOpen(false)} className="text-15 font-medium text-nc-body hover:text-brand">{label}</NavLink>
              ))}
              <button onClick={() => { onDemo(); setOpen(false) }} className="btn-green mt-2 w-full">Request Demo</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
