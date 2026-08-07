// Landing.jsx — NComputing brand hero + sections

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, Shield, Wrench, ArrowRight, CheckCircle } from 'lucide-react'

const fade = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.12 } } }

const WHY = [
  {
    icon: Shield,
    color: 'text-nc-blue',
    bg: 'bg-blue-50',
    title: 'More Secure',
    desc: 'All data stays on the server. If a thin client is lost or stolen, there is nothing on the device to recover.',
  },
  {
    icon: Zap,
    color: 'text-brand',
    bg: 'bg-brand-light',
    title: 'Spend Wisely',
    desc: 'One server PC replaces 30–100 full desktops. Cut hardware spend, power bills, and maintenance costs by up to 60%.',
  },
  {
    icon: Wrench,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    title: 'Less Hardware',
    desc: 'Thin clients have no moving parts, no fans, no local storage. They almost never fail — and are trivial to replace.',
  },
]

function Landing({ onDemo }) {
  return (
    <div>

      {/* ── HERO ──────────────────────────────────────── */}
      <section className="hero-strip min-h-[560px] flex items-center pt-16">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">

          {/* Left copy */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={fade} className="inline-flex items-center gap-2 bg-brand/20 border border-brand/40 rounded-full px-3 py-1 text-brand text-13 font-montserrat font-bold mb-6">
              <span className="w-2 h-2 bg-brand rounded-full" />
              NComputing L-Series
            </motion.div>

            <motion.h1 variants={fade} className="text-44 md:text-5xl font-bold text-white font-open leading-tight mb-4">
              Stop buying a PC<br />for every desk.
            </motion.h1>

            <motion.p variants={fade} className="text-17 text-gray-300 mb-8 leading-relaxed max-w-md">
              One powerful server can run up to <strong className="text-white">100 independent virtual desktops</strong>. Each user gets their own L-Series thin client — at a fraction of the cost.
            </motion.p>

            <motion.div variants={fade} className="flex flex-wrap gap-3">
              <Link to="/problem" className="btn-green">
                See the Problem We Solve <ArrowRight size={16} />
              </Link>
              <button onClick={onDemo} className="btn border-2 border-white/30 text-white hover:border-brand hover:text-brand">
                Request a Demo
              </button>
            </motion.div>

            {/* Quick bullets */}
            <motion.ul variants={fade} className="mt-8 flex flex-col gap-2">
              {['Up to 100 sessions per server PC', '3–5W power draw per device', 'From ₹4,999 per workstation'].map((b) => (
                <li key={b} className="flex items-center gap-2 text-14 text-gray-300">
                  <CheckCircle size={14} className="text-brand shrink-0" />
                  {b}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <img
              src="/PNG/L300_1.png"
              alt="NComputing L300 thin client"
              className="w-full max-w-sm drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* ── STATS STRIP ───────────────────────────────── */}
      <section className="bg-brand">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-3 divide-x divide-white/20">
          {[['100x', 'Users per server PC'], ['3–5W', 'Power per thin client'], ['60%', 'Average cost savings']].map(([val, label]) => (
            <div key={label} className="text-center py-2 px-4">
              <div className="text-34 font-bold text-white font-open">{val}</div>
              <div className="text-14 text-white/80">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ARCHITECTURE PREVIEW ──────────────────────── */}
      <section className="section border-b border-nc-border">
        <div className="text-center mb-10">
          <span className="accent-line mx-auto" />
          <h2 className="section-title mb-3">How It Works</h2>
          <p className="section-sub max-w-xl mx-auto">
            vSpace Pro server software runs on one PC and shares resources across up to 100 simultaneous virtual desktops.
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src="/SVG/l-series-architecture.svg"
            alt="L-Series architecture diagram"
            className="w-full max-w-3xl"
          />
        </div>
      </section>

      {/* ── WHY IT MATTERS ────────────────────────────── */}
      <section className="section">
        <div className="text-center mb-10">
          <span className="accent-line mx-auto" />
          <h2 className="section-title mb-3">Key Benefits</h2>
          <p className="section-sub max-w-xl mx-auto">
            Built for Indian schools, SMBs, and government offices that need many workstations at low cost.
          </p>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {WHY.map(({ icon: Icon, color, bg, title, desc }) => (
            <motion.div key={title} variants={fade} className="card-hover">
              <div className={`w-11 h-11 rounded-lg ${bg} flex items-center justify-center mb-4`}>
                <Icon size={22} className={color} />
              </div>
              <h3 className="text-17 font-bold text-nc-dark mb-2">{title}</h3>
              <p className="text-15 text-nc-mid leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── PRODUCT PREVIEW ───────────────────────────── */}
      <section className="bg-nc-bg py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="accent-line mx-auto" />
            <h2 className="section-title mb-3">L-Series Family</h2>
            <p className="section-sub max-w-lg mx-auto">Choose the right model for your resolution, port, and budget needs.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { model: 'L350', img: '/PNG/L350.png', price: '₹7,999', port: 'DVI-D', res: '1920×1200', tag: 'Best Quality' },
              { model: 'L300', img: '/PNG/L300_1.png', price: '₹6,499', port: 'VGA', res: '1920×1080', tag: 'Most Popular' },
              { model: 'L250', img: '/PNG/L250.png', price: '₹4,999', port: 'VGA', res: '1440×900', tag: 'Best Value' },
            ].map(({ model, img, price, port, res, tag }) => (
              <motion.div
                key={model}
                whileHover={{ y: -4 }}
                className="card text-center"
              >
                {tag && (
                  <div className="badge-green text-13 mb-3 mx-auto w-fit">{tag}</div>
                )}
                <img src={img} alt={`NComputing ${model}`} className="h-36 w-auto mx-auto object-contain mb-4" />
                <h3 className="text-20 font-bold text-nc-dark">{model}</h3>
                <p className="text-nc-mid text-14 mb-1">{port} · {res}</p>
                <p className="text-22 font-bold text-brand mt-2">{price}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/product" className="btn-green">
              Order Online <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ─────────────────────────────────── */}
      <section
        className="py-16 px-4 text-center bg-nc-dark relative overflow-hidden"
        style={{ backgroundImage: 'url(/PNG/zone-background-img.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-nc-dark/80" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-34 font-bold text-white font-open mb-3">
            Ready to cut your hardware costs?
          </h2>
          <p className="text-17 text-gray-300 mb-8">
            Talk to our team or explore the devices and order directly online.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={onDemo} className="btn-green">Get a Free Demo</button>
            <Link to="/product" className="btn border-2 border-white/30 text-white hover:border-brand hover:text-brand">Browse Products</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing
