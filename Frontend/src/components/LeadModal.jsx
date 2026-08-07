// LeadModal.jsx — Demo / Contact Sales / Pricing request form

import { useState } from 'react'
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

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    setErr('')
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="card w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white text-xl">✕</button>

        {done ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-white mb-2">We got your message!</h3>
            <p className="text-slate-400 text-sm">Our team will reach out to you shortly.</p>
            <button onClick={onClose} className="btn-primary mt-6">Close</button>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-white mb-1">Get in Touch</h2>
            <p className="text-slate-400 text-sm mb-6">We'll respond within one business day.</p>

            <form onSubmit={submit} className="space-y-4">
              {/* Type selector */}
              <div className="flex gap-2">
                {TYPES.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setForm({ ...form, type: t.value })}
                    className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                      form.type === t.value
                        ? 'bg-brand-500 border-brand-500 text-white'
                        : 'border-white/10 text-slate-400 hover:border-brand-500/50'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

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
                  <input name="company" value={form.company} onChange={change} className="input" placeholder="School / SMB name" />
                </div>
              </div>

              <div>
                <label className="label">Message</label>
                <textarea name="message" value={form.message} onChange={change} rows={3} className="input resize-none" placeholder="Tell us about your use case..." />
              </div>

              {err && <p className="text-red-400 text-sm">{err}</p>}

              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default LeadModal
