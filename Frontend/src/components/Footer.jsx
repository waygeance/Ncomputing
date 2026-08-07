// Footer.jsx — NComputing dark footer

import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-nc-dark text-white mt-0">
      <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="md:col-span-2">
          <img
            src="/PNG/ncomputindia-india-trans-350px.png"
            alt="NComputing India"
            className="h-8 w-auto object-contain brightness-200 mb-4"
          />
          <p className="text-nc-light text-14 leading-relaxed max-w-xs">
            Desktop virtualization solutions for Indian schools, SMBs, and government institutions. One PC, many desks.
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-14 text-nc-light">
              <MapPin size={14} className="text-brand shrink-0" />
              <span>Pune, Maharashtra — 411001</span>
            </div>
            <div className="flex items-center gap-2 text-14 text-nc-light">
              <Phone size={14} className="text-brand shrink-0" />
              <span>+91-20-6680-1234</span>
            </div>
            <div className="flex items-center gap-2 text-14 text-nc-light">
              <Mail size={14} className="text-brand shrink-0" />
              <span>sales@ncomputingindia.com</span>
            </div>
          </div>
        </div>

        {/* Products */}
        <div>
          <h4 className="font-montserrat font-bold text-14 uppercase tracking-wider text-white mb-4">Products</h4>
          <ul className="space-y-2">
            {['L250 Thin Client', 'L300 Thin Client', 'L350 Thin Client', 'vSpace Pro Server'].map((item) => (
              <li key={item}>
                <Link to="/product" className="text-14 text-nc-light hover:text-brand transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-montserrat font-bold text-14 uppercase tracking-wider text-white mb-4">Company</h4>
          <ul className="space-y-2">
            {[['/', 'Home'], ['/problem', 'The Problem'], ['/solution', 'Our Solution'], ['/product', 'Order Online']].map(([to, label]) => (
              <li key={label}>
                <Link to={to} className="text-14 text-nc-light hover:text-brand transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-13 text-nc-light">© {new Date().getFullYear()} NComputing India Pvt. Ltd. Educational demo project.</p>
          <div className="flex gap-4">
            <Link to="/admin/login" className="text-13 text-nc-light hover:text-brand transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
