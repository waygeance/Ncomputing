// AdminLeads.jsx — Leads table

import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../lib/api'

const TYPE_COLORS = {
  DEMO: 'bg-blue-500/10 text-blue-400',
  CONTACT_SALES: 'bg-purple-500/10 text-purple-400',
  PRICING: 'bg-yellow-500/10 text-yellow-400',
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

  return (
    <div className="min-h-screen p-6 pt-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Leads</h1>
            <p className="text-slate-500 text-sm">{leads.length} total</p>
          </div>
          <div className="flex gap-3">
            <Link to="/admin/orders" className="btn-ghost text-sm">Orders</Link>
            <button
              onClick={() => { sessionStorage.removeItem('admin_token'); navigate('/admin/login') }}
              className="btn-ghost text-sm text-red-400"
            >
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-slate-400">Loading...</div>
        ) : leads.length === 0 ? (
          <div className="card text-center py-12 text-slate-500">No leads yet.</div>
        ) : (
          <div className="card overflow-x-auto p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  {['Name', 'Email', 'Phone', 'Company', 'Type', 'Message', 'Date'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-slate-500 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id} className="border-b border-white/5">
                    <td className="px-4 py-3 font-medium text-white">{l.name}</td>
                    <td className="px-4 py-3 text-slate-400">{l.email}</td>
                    <td className="px-4 py-3 text-slate-400">{l.phone || '—'}</td>
                    <td className="px-4 py-3 text-slate-400">{l.company || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`badge px-2 py-0.5 text-xs ${TYPE_COLORS[l.type] || ''}`}>
                        {l.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 max-w-xs truncate">{l.message || '—'}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">
                      {new Date(l.createdAt).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminLeads
