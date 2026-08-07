// AdminOrders.jsx — Orders table with search + status filter

import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../lib/api'

const STATUS_OPTIONS = ['', 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED']

const STATUS_COLORS = {
  PENDING: 'bg-yellow-500/10 text-yellow-400',
  PROCESSING: 'bg-blue-500/10 text-blue-400',
  SHIPPED: 'bg-purple-500/10 text-purple-400',
  DELIVERED: 'bg-green-500/10 text-green-400',
}

function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  function fetchOrders() {
    const params = {}
    if (search) params.search = search
    if (filter) params.status = filter
    api.get('/admin/orders', { params })
      .then((r) => { setOrders(r.data); setLoading(false) })
      .catch(() => navigate('/admin/login'))
  }

  useEffect(() => { fetchOrders() }, [search, filter])

  async function updateStatus(id, status) {
    await api.patch(`/admin/orders/${id}/status`, { status })
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o))
  }

  return (
    <div className="min-h-screen p-6 pt-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Orders</h1>
            <p className="text-slate-500 text-sm">{orders.length} total</p>
          </div>
          <div className="flex gap-3">
            <Link to="/admin/leads" className="btn-ghost text-sm">Leads</Link>
            <button
              onClick={() => { sessionStorage.removeItem('admin_token'); navigate('/admin/login') }}
              className="btn-ghost text-sm text-red-400"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input max-w-xs"
            placeholder="Search by name or email..."
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input max-w-xs"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s || 'All Statuses'}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-slate-400">Loading...</div>
        ) : orders.length === 0 ? (
          <div className="card text-center py-12 text-slate-500">No orders found.</div>
        ) : (
          <div className="card overflow-x-auto p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  {['Customer', 'Items', 'Total', 'Payment', 'Status', 'Date'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-slate-500 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-white">{o.customerName}</div>
                      <div className="text-slate-500 text-xs">{o.email}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {o.items.map((i) => `${i.product.name} ×${i.quantity}`).join(', ')}
                    </td>
                    <td className="px-4 py-3 font-medium text-white">₹{o.totalAmount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`badge px-2 py-0.5 text-xs ${o.paymentStatus === 'PAID' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                        {o.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={o.status}
                        onChange={(e) => updateStatus(o.id, e.target.value)}
                        className={`text-xs px-2 py-1 rounded-lg border-0 bg-transparent cursor-pointer font-medium ${STATUS_COLORS[o.status] || ''}`}
                      >
                        {['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'].map((s) => (
                          <option key={s} value={s} className="bg-[#0f0f1a] text-white">{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs">
                      {new Date(o.createdAt).toLocaleDateString('en-IN')}
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

export default AdminOrders
