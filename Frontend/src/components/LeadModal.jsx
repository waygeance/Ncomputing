// LeadModal.jsx — clean white modal

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, Send } from 'lucide-react'
import api from '../lib/api'

const TYPES = [
  { value: 'DEMO', label: 'Request Demo' },
  { value: 'CONTACT_SALES', label: 'Contact Sales' },
  { value: 'PRICING', label: 'Request Pricing' },
]

function LeadModal({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', type: 'DEMO', message: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [err, setErr] = useState('')

  function change(e) { setForm({ ...form, [e.target.name]: e.target.value }) }

  async function submit(e) {
    e.preventDefault()
    setLoading(true); setErr('')
    try {
      await api.post('/leads', form)
      setDone(true)
    } catch {
      setErr('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="card shadow-modal w-full max-w-lg relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-nc-light hover:text-nc-body hover:bg-nc-bg transition-colors"
          >
            <X size={18} />
          </button>

          {done ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-brand" />
              </div>
              <h3 className="text-20 font-bold text-nc-dark mb-2">Message Received!</h3>
              <p className="text-15 text-nc-mid mb-6">Our team will reach out to you within one business day.</p>
              <button onClick={onClose} className="btn-green">Close</button>
            </motion.div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-20 font-bold text-nc-dark mb-1">Get in Touch</h2>
                <p className="text-14 text-nc-mid">Our team responds within one business day.</p>
              </div>

              {/* Type tabs */}
              <div className="flex gap-2 mb-5 p-1 bg-nc-bg rounded-lg">
                {TYPES.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setForm({ ...form, type: t.value })}
                    className={`flex-1 px-3 py-2 rounded-md text-13 font-montserrat font-bold transition-all ${
                      form.type === t.value
                        ? 'bg-white text-brand shadow-sm'
                        : 'text-nc-mid hover:text-nc-body'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <form onSubmit={submit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">Name *</label>
                    <input name="name" value={form.name} onChange={change} required className="input" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="label">Email *</label>
                    <input name="email" type="email" value={form.email} onChange={change} required className="input" placeholder="you@company.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">Phone</label>
                    <input name="phone" value={form.phone} onChange={change} className="input" placeholder="+91 9876543210" />
                  </div>
                  <div>
                    <label className="label">Company</label>
                    <input name="company" value={form.company} onChange={change} className="input" placeholder="School / SMB" />
                  </div>
                </div>
                <div>
                  <label className="label">Message</label>
                  <textarea name="message" value={form.message} onChange={change} rows={3} className="input resize-none" placeholder="Tell us about your use case..." />
                </div>

                {err && <p className="text-red-500 text-14">{err}</p>}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileTap={{ scale: 0.98 }}
                  className="btn-green w-full justify-center"
                >
                  <Send size={15} />
                  {loading ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default LeadModal
