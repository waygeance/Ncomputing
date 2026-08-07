// Problem.jsx — The pain point page

import { Link } from 'react-router-dom'

const STATS = [
  {
    label: 'Cost: 40-seat computer lab',
    pc: '₹28,00,000',
    lseries: '₹4,00,000',
    saving: '85% cheaper',
    note: '40 PCs @ ₹70,000 vs 40 L-series + 1 server PC @ ₹10 lakh',
  },
  {
    label: 'Power draw per workstation',
    pc: '~120W',
    lseries: '~4W',
    saving: '30x less power',
    note: 'A 40-seat lab saves ₹50,000/yr on electricity alone',
  },
  {
    label: 'IT maintenance',
    pc: 'Per machine',
    lseries: 'One server',
    saving: 'Central control',
    note: 'Update, patch, and manage all desktops from a single server',
  },
]

function Problem({ onDemo }) {
  return (
    <div>
      <section className="section pt-32">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
            Equipping a computer lab<br />
            <span className="text-red-400">should not cost a fortune.</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            For every school or small business in India that needs 30–100 workstations,
            the traditional approach — buy one PC per desk — is a financial trap.
          </p>
        </div>

        {/* Comparison cards */}
        <div className="space-y-4 mb-16">
          {STATS.map((s) => (
            <div key={s.label} className="card">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">{s.label}</h3>
                  <p className="text-xs text-slate-500">{s.note}</p>
                </div>
                <div className="flex gap-6 items-center">
                  <div className="text-center">
                    <div className="text-sm text-slate-500 mb-1">Full PC</div>
                    <div className="text-xl font-bold text-red-400">{s.pc}</div>
                  </div>
                  <div className="text-slate-600 text-xl">→</div>
                  <div className="text-center">
                    <div className="text-sm text-slate-500 mb-1">L-Series</div>
                    <div className="text-xl font-bold text-green-400">{s.lseries}</div>
                  </div>
                  <div className="badge bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 text-sm whitespace-nowrap">
                    {s.saving}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pain points list */}
        <div className="card mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Sound familiar?</h2>
          <ul className="space-y-3">
            {[
              `Your computer lab needs upgrading but the budget just isn't there.`,
              "You're paying high electricity bills running 40+ PCs all day.",
              "One IT person can't keep up with issues on 50 individual machines.",
              'You replaced 10 PCs last year due to hardware failures.',
              'Students or staff are waiting because machines are slow or broken.',
            ].map((pain) => (
              <li key={pain} className="flex items-start gap-3 text-slate-300 text-sm">
                <span className="text-red-400 mt-0.5">✗</span>
                {pain}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center flex flex-wrap gap-4 justify-center">
          <Link to="/solution" className="btn-primary">See How We Solve This →</Link>
          <button onClick={onDemo} className="btn-outline">Talk to Sales</button>
        </div>
      </section>
    </div>
  )
}

export default Problem
