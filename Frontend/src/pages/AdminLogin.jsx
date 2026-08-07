// AdminLogin.jsx — clean white card login

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff } from 'lucide-react'
import api from '../lib/api'

function AdminLogin() {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const navigate = useNavigate()

  async function submit(e) {
    e.preventDefault()
    setLoading(true); setErr('')
    try {
      const { data } = await api.post('/admin/login', { password })
      sessionStorage.setItem('admin_token', data.token)
      navigate('/admin/orders')
    } catch {
      setErr('Incorrect password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-nc-bg flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card w-full max-w-sm shadow-modal"
      >
        {/* Logo */}
        <div className="text-center mb-7">
          <img src="/PNG/ncomputindia-india-trans-350px.png" alt="NComputing" className="h-8 mx-auto mb-5 object-contain" />
          <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center mx-auto mb-3">
            <Lock size={22} className="text-brand" />
          </div>
          <h1 className="text-20 font-bold text-nc-dark">Admin Dashboard</h1>
          <p className="text-14 text-nc-mid mt-1">Sign in to manage orders and leads</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="label">Password</label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input pr-10"
                placeholder="Enter admin password"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-nc-light hover:text-nc-body transition-colors"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {err && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-14"
            >
              {err}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.98 }}
            className="btn-green w-full justify-center"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default AdminLogin
