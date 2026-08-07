// AdminLogin.jsx — Admin password login

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api'

function AdminLogin() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const navigate = useNavigate()

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    setErr('')
    try {
      const { data } = await api.post('/admin/login', { password })
      sessionStorage.setItem('admin_token', data.token)
      navigate('/admin/orders')
    } catch {
      setErr('Wrong password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-2xl mx-auto mb-3">🔐</div>
          <h1 className="text-xl font-bold text-white">Admin Login</h1>
          <p className="text-slate-500 text-sm">NComputing L-Series Dashboard</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
              placeholder="••••••••"
              autoFocus
            />
          </div>
          {err && <p className="text-red-400 text-sm">{err}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
