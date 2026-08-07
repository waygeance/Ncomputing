// Navbar.jsx

import { Link, NavLink } from 'react-router-dom'
import useCart from '../store/cart'

function Navbar({ onDemo }) {
  const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0))

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f1a]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white font-bold text-sm">N</div>
          <span className="font-bold text-white">NComputing <span className="text-brand-500">L-Series</span></span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6">
          {[['/', 'Home'], ['/problem', 'Problem'], ['/solution', 'Solution'], ['/product', 'Product']].map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? 'text-brand-500' : 'text-slate-400 hover:text-white'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button onClick={onDemo} className="btn-outline text-sm px-4 py-2">
            Request Demo
          </button>
          <Link to="/cart" className="relative btn-ghost px-3 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 7h12.8M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
