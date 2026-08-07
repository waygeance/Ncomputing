// Problem.jsx — clean white layout with comparison stats

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, XCircle, TrendingDown, Zap, Cpu } from 'lucide-react'

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

const STATS = [
  {
    icon: Cpu,
    label: '40-seat computer lab',
    pc: { val: '₹28,00,000', sub: '40 PCs @ ₹70,000 each' },
    ls: { val: '₹4,00,000', sub: '40 L-series + 1 server PC' },
    saving: '85% cheaper',
  },
  {
    icon: Zap,
    label: 'Power draw per workstation',
    pc: { val: '~120W', sub: 'Standard desktop PC' },
    ls: { val: '3–5W', sub: 'NComputing L-Series' },
    saving: '30× less power',
  },
  {
    icon: TrendingDown,
    label: 'IT maintenance scope',
    pc: { val: '40 machines', sub: 'Individual updates & repairs' },
    ls: { val: '1 server', sub: 'Centralised management' },
    saving: 'Central control',
  },
]

const PAINS = [
  'Computer lab upgrade is overdue but the budget keeps getting rejected.',
  "You're paying high electricity bills running 40+ PCs all day.",
  "One IT person can't keep up with 50 individual machines.",
  'You replaced 10 PCs last year — hardware failures keep mounting.',
  'Students or staff wait because machines are slow or broken.',
]

function Problem({ onDemo }) {
  return (
    <div>
      {/* Hero strip */}
      <section className="hero-strip py-20 pt-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="accent-line mx-auto" />
            <h1 className="text-44 font-bold text-white font-open mb-4">
              Equipping a computer lab<br />
              <span className="text-brand">should not cost a fortune.</span>
            </h1>
            <p className="text-17 text-gray-300 max-w-2xl mx-auto">
              For every school or small business in India that needs 30–100 workstations,
              the traditional approach — one PC per desk — is a financial trap.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats comparison */}
      <section className="section">
        <div className="text-center mb-10">
          <span className="accent-line mx-auto" />
          <h2 className="section-title mb-3">The Numbers Don't Lie</h2>
          <p className="section-sub">Side-by-side comparison: traditional PCs vs NComputing L-Series</p>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {STATS.map(({ icon: Icon, label, pc, ls, saving }) => (
            <motion.div key={label} variants={fade} className="card">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex items-center gap-3 md:w-56 shrink-0">
                  <div className="w-9 h-9 rounded-lg bg-brand-light flex items-center justify-center">
                    <Icon size={18} className="text-brand" />
                  </div>
                  <span className="text-15 font-medium text-nc-dark">{label}</span>
                </div>

                <div className="flex-1 grid grid-cols-3 gap-4 items-center">
                  {/* PC */}
                  <div className="text-center">
                    <div className="text-13 text-nc-light mb-1 uppercase tracking-wide">Full PC</div>
                    <div className="text-20 font-bold text-red-500">{pc.val}</div>
                    <div className="text-13 text-nc-light">{pc.sub}</div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <span className="badge-green font-montserrat font-bold">{saving}</span>
                  </div>

                  {/* L-Series */}
                  <div className="text-center">
                    <div className="text-13 text-nc-light mb-1 uppercase tracking-wide">L-Series</div>
                    <div className="text-20 font-bold text-brand">{ls.val}</div>
                    <div className="text-13 text-nc-light">{ls.sub}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Pain points */}
      <section className="bg-nc-bg py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="accent-line mx-auto" />
            <h2 className="section-title mb-2">Sound Familiar?</h2>
          </div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-3"
          >
            {PAINS.map((pain) => (
              <motion.div key={pain} variants={fade} className="card flex items-start gap-3">
                <XCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                <p className="text-15 text-nc-body">{pain}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section text-center">
        <h2 className="text-34 font-bold text-nc-dark font-open mb-3">There is a better way.</h2>
        <p className="section-sub mb-8 max-w-lg mx-auto">
          NComputing L-Series lets you equip every desk with a fast, secure workstation — without buying a PC for each one.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/solution" className="btn-green">
            See the Solution <ArrowRight size={16} />
          </Link>
          <button onClick={onDemo} className="btn-outline-green">Talk to Sales</button>
        </div>
      </section>
    </div>
  )
}

export default Problem
