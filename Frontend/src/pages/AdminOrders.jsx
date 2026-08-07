// AdminOrders.jsx — clean white admin orders table

import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Filter, LogOut, Users, Package } from 'lucide-react'
import api from '../lib/api'

const STATUS_OPTIONS = ['', 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED']

const STATUS_STYLE = {
  PENDING:    'badge-yellow',
  PROCESSING: 'badge-blue',
  SHIPPED:    'badge bg-purple-50 text-purple-700',
  DELIVERED:  'badge-green',
}

function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const params = {}
    if (search) params.search = search
    if (filter) params.status = filter
    api.get('/admin/orders', { params })
      .then((r) => { setOrders(r.data); setLoading(false) })
      .catch(() => navigate('/admin/login'))
  }, [search, filter])

  async function updateStatus(id, status) {
    await api.patch(`/admin/orders/${id}/status`, { status })
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o))
  }

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
        {/* Page title + stats */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-27 font-bold text-nc-dark">Orders</h1>
            <p className="text-14 text-nc-mid">{orders.length} total orders</p>
          </div>
        </div>

        {/* Filters */}
        <div className="card mb-5 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-nc-light" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-9"
              placeholder="Search by name or email..."
            />
          </div>
          <div className="relative min-w-[180px]">
            <Filter size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-nc-light pointer-events-none" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="select pl-9"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s || 'All Statuses'}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="card text-center py-16 text-nc-mid">Loading...</div>
        ) : orders.length === 0 ? (
          <div className="card text-center py-16 text-nc-mid">No orders found.</div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card overflow-x-auto p-0 rounded-xl"
          >
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>
                      <div className="font-medium text-nc-dark">{o.customerName}</div>
                      <div className="text-13 text-nc-mid">{o.email}</div>
                      <div className="text-13 text-nc-light">{o.phone}</div>
                    </td>
                    <td>
                      <div className="text-14 text-nc-body">
                        {o.items.map((i) => `${i.product.name} ×${i.quantity}`).join(', ')}
                      </div>
                    </td>
                    <td>
                      <span className="font-bold text-nc-dark">₹{o.totalAmount.toLocaleString()}</span>
                    </td>
                    <td>
                      <span className={`badge ${o.paymentStatus === 'PAID' ? 'badge-green' : o.paymentStatus === 'FAILED' ? 'badge-red' : 'badge-gray'}`}>
                        {o.paymentStatus}
                      </span>
                    </td>
                    <td>
                      <select
                        value={o.status}
                        onChange={(e) => updateStatus(o.id, e.target.value)}
                        className={`text-13 font-medium border rounded-full px-3 py-1 cursor-pointer bg-transparent focus:outline-none ${
                          o.status === 'PENDING' ? 'border-yellow-300 text-yellow-700 bg-yellow-50' :
                          o.status === 'PROCESSING' ? 'border-blue-300 text-nc-blue bg-blue-50' :
                          o.status === 'SHIPPED' ? 'border-purple-300 text-purple-700 bg-purple-50' :
                          'border-green-300 text-brand bg-brand-light'
                        }`}
                      >
                        {['PENDING','PROCESSING','SHIPPED','DELIVERED'].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="text-13 text-nc-mid whitespace-nowrap">
                      {new Date(o.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
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

export default AdminOrders
