// Landing.jsx — Hero + Why it matters + CTAs

import { Link } from 'react-router-dom'

const WHY = [
  {
    icon: '🔒',
    title: 'More Secure',
    desc: 'All data stays on the server. If a thin client is lost or stolen, there is nothing to recover.',
  },
  {
    icon: '💸',
    title: 'Spend Wisely',
    desc: 'One server PC replaces 30–100 full desktops. Save on hardware, power bills, and IT costs.',
  },
  {
    icon: '🔧',
    title: 'Less Hardware',
    desc: 'Thin clients have no moving parts, no fans, no local storage. They almost never break down.',
  },
]

function Landing({ onDemo }) {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-3xl" />
        </div>

        <div className="text-center max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/30 rounded-full px-4 py-1.5 text-sm text-brand-500 font-medium mb-8">
            <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
            Desktop Virtualization for India
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Stop buying a PC<br />
            <span className="text-brand-500">for every desk.</span>
          </h1>

          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            One powerful server PC can run up to <strong className="text-white">100 independent desktops</strong> simultaneously. The NComputing L-Series thin client gives each user their own workstation — at a fraction of the cost.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/problem" className="btn-primary text-base px-8 py-4">
              See the Problem We Solve →
            </Link>
            <button onClick={onDemo} className="btn-outline text-base px-8 py-4">
              Request a Demo
            </button>
          </div>

          {/* Quick stats */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[['100x', 'Users per server'], ['3–5W', 'Power per device'], ['60%', 'Cost savings vs PCs']].map(([val, label]) => (
              <div key={label} className="card">
                <div className="text-3xl font-extrabold text-brand-500">{val}</div>
                <div className="text-sm text-slate-400 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="section">
        <h2 className="text-3xl font-bold text-white text-center mb-4">Why it matters</h2>
        <p className="text-slate-400 text-center mb-12 max-w-xl mx-auto">
          Schools, SMBs, and government offices across India face the same problem — too many desks, too little budget.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {WHY.map((item) => (
            <div key={item.title} className="card hover:border-brand-500/40 transition-all">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto card border-brand-500/20">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to see the devices?</h2>
          <p className="text-slate-400 mb-6 text-sm">Compare L250, L300, and L350 models and order directly online.</p>
          <Link to="/product" className="btn-primary">Explore the L-Series →</Link>
        </div>
      </section>
    </div>
  )
}

export default Landing
