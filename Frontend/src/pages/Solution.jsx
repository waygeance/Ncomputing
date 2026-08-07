// Solution.jsx — with real architecture SVG and product images

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Server, Monitor, Wifi } from 'lucide-react'

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.12 } } }

const STEPS = [
  {
    icon: Server,
    step: '01',
    title: 'Install vSpace Pro',
    desc: 'Install NComputing vSpace Pro server software on one powerful host PC.',
  },
  {
    icon: Wifi,
    step: '02',
    title: 'Connect over LAN',
    desc: "Connect L-Series devices to the network. Plug each device into the user's monitor via VGA or DVI-D.",
  },
  {
    icon: Monitor,
    step: '03',
    title: 'Every user gets a desktop',
    desc: 'Each user logs into their own independent virtual desktop — all running simultaneously on the same host.',
  },
]

const BENEFITS = [
  'Up to 100 independent desktops from a single host PC',
  'Each L-Series device draws only 3–5 watts',
  'No local storage — zero data theft risk from lost devices',
  'Update and manage all desktops from one place',
  'Devices include mounting bracket, mic, and speaker ports',
  'Devices cost ₹4,999–₹7,999 vs ₹40,000–₹80,000 for a full PC',
]

function Solution({ onDemo }) {
  return (
    <div>
      {/* Hero */}
      <section className="hero-strip py-20 pt-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="accent-line mx-auto" />
            <h1 className="text-44 font-bold text-white font-open mb-4">
              One server. <span className="text-brand">Many desks.</span>
            </h1>
            <p className="text-17 text-gray-300 max-w-2xl mx-auto">
              NComputing's vSpace Pro server software runs on a single powerful PC and
              serves up to 100 independent virtual desktops — each powered by an L-Series thin client.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Architecture diagram */}
      <section className="section border-b border-nc-border">
        <div className="text-center mb-10">
          <span className="accent-line mx-auto" />
          <h2 className="section-title mb-3">Access Up to 100 Virtual Desktop Sessions</h2>
          <p className="section-sub max-w-2xl mx-auto">
            One server running vSpace Pro fans out to L-Series devices at every desk via your existing LAN.
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src="/SVG/l-series-architecture.svg"
            alt="L-Series vSpace Pro architecture"
            className="w-full max-w-4xl"
          />
        </div>
      </section>

      {/* Device showcase */}
      <section className="bg-nc-bg py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="accent-line mx-auto" />
            <h2 className="section-title mb-2">The L-Series Devices</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { model: 'L350', img: '/PNG/L350.png', conn: '/PNG/Connections_L350.png', port: 'DVI-D', res: '1920×1200' },
              { model: 'L300', img: '/PNG/L300_1.png', conn: '/PNG/Connections_L300.png', port: 'VGA', res: '1920×1080' },
              { model: 'L250', img: '/PNG/L250.png', conn: '/PNG/L250-connections.png', port: 'VGA', res: '1440×900' },
            ].map(({ model, img, conn, port, res }) => (
              <motion.div
                key={model}
                whileHover={{ y: -4 }}
                className="card text-center"
              >
                <img src={img} alt={`NComputing ${model}`} className="h-32 w-auto mx-auto object-contain mb-4" />
                <h3 className="text-20 font-bold text-nc-dark mb-1">{model}</h3>
                <p className="text-14 text-nc-mid mb-3">{port} · {res}</p>
                <img src={conn} alt={`${model} connections`} className="w-full rounded-lg border border-nc-border" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* vSpace Pro callout */}
      <section className="section border-b border-nc-border">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="accent-line" />
            <h2 className="section-title mb-4">Powered by vSpace Pro</h2>
            <p className="text-15 text-nc-mid mb-6 leading-relaxed">
              vSpace Pro is the server-side software that creates and manages the virtual desktop sessions.
              It runs on a standard Windows PC and handles all computing for every connected L-Series device.
            </p>
            <img src="/PNG/vspace-pro-small-143x62.png" alt="vSpace Pro" className="h-10 object-contain" />
          </div>
          <div>
            <img src="/PNG/Customer_value_(EN).png" alt="Customer value" className="w-full rounded-xl shadow-card" />
          </div>
        </div>
      </section>

      {/* How it works steps */}
      <section className="bg-nc-bg py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="accent-line mx-auto" />
            <h2 className="section-title mb-2">How to Get Started</h2>
          </div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {STEPS.map(({ icon: Icon, step, title, desc }) => (
              <motion.div key={step} variants={fade} className="card-hover text-center">
                <div className="text-44 font-bold text-brand-light font-open mb-2">{step}</div>
                <div className="w-10 h-10 rounded-lg bg-brand-light flex items-center justify-center mx-auto mb-3">
                  <Icon size={20} className="text-brand" />
                </div>
                <h3 className="text-17 font-bold text-nc-dark mb-2">{title}</h3>
                <p className="text-14 text-nc-mid leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <span className="accent-line" />
            <h2 className="section-title mb-6">What You Get</h2>
            <ul className="space-y-3">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-brand shrink-0 mt-0.5" />
                  <span className="text-15 text-nc-body">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-highlight">
            <h3 className="text-20 font-bold text-nc-dark mb-4">Ready to see the devices?</h3>
            <p className="text-15 text-nc-mid mb-6">
              Compare L250, L300, and L350 models and order directly online — no sales call needed.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link to="/product" className="btn-green">
                Browse Products <ArrowRight size={16} />
              </Link>
              <button onClick={onDemo} className="btn-outline-green">Request Demo</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Solution
