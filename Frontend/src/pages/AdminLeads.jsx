// AdminLeads.jsx — clean leads table

import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogOut, Package, Users } from 'lucide-react'
import api from '../lib/api'

const TYPE_STYLE = {
  DEMO: 'badge-blue',
  CONTACT_SALES: 'badge bg-purple-50 text-purple-700',
  PRICING: 'badge-yellow',
}

const TYPE_LABEL = {
  DEMO: 'Demo',
  CONTACT_SALES: 'Contact Sales',
  PRICING: 'Pricing',
}

function AdminLeads() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/admin/leads')
      .then((r) => { setLeads(r.data); setLoading(false) })
      .catch(() => navigate('/admin/login'))
  }, [])

  function logout() {
    sessionStorage.removeItem('admin_token')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-nc-bg">
      {/* Admin header */}
      <header className="bg-white border-b border-nc-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/PNG/ncomputindia-india-trans-350px.png" alt="NComputing" className="h-7 object-contain" />
            <span className="text-13 text-nc-mid border-l border-nc-border pl-4 font-medium">Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/admin/orders" className="btn-ghost text-14 gap-1.5">
              <Package size={15} /> Orders
            </Link>
            <Link to="/admin/leads" className="btn-ghost text-14 gap-1.5">
              <Users size={15} /> Leads
            </Link>
            <button onClick={logout} className="btn-ghost text-14 gap-1.5 text-red-500 hover:text-red-600 hover:bg-red-50">
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-27 font-bold text-nc-dark">Leads</h1>
          <p className="text-14 text-nc-mid">{leads.length} submissions</p>
        </div>

        {loading ? (
          <div className="card text-center py-16 text-nc-mid">Loading...</div>
        ) : leads.length === 0 ? (
          <div className="card text-center py-16 text-nc-mid">No leads yet.</div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card overflow-x-auto p-0 rounded-xl"
          >
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Company</th>
                  <th>Type</th>
                  <th>Message</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id}>
                    <td className="font-medium text-nc-dark">{l.name}</td>
                    <td>
                      <div className="text-14 text-nc-body">{l.email}</div>
                      {l.phone && <div className="text-13 text-nc-mid">{l.phone}</div>}
                    </td>
                    <td className="text-nc-mid">{l.company || '—'}</td>
                    <td>
                      <span className={TYPE_STYLE[l.type] || 'badge-gray'}>
                        {TYPE_LABEL[l.type] || l.type}
                      </span>
                    </td>
                    <td className="max-w-xs">
                      <p className="text-14 text-nc-mid truncate">{l.message || '—'}</p>
                    </td>
                    <td className="text-13 text-nc-mid whitespace-nowrap">
                      {new Date(l.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AdminLeads
