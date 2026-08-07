// Solution.jsx — How L-Series solves the problem

import { Link } from 'react-router-dom'

function Solution({ onDemo }) {
  return (
    <div>
      <section className="section pt-32">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
            One server. <span className="text-brand-500">Many desks.</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            NComputing's vSpace Pro server software runs on a single powerful PC and serves up to 100 independent virtual desktops — each powered by an L-Series thin client.
          </p>
        </div>

        {/* Architecture diagram */}
        <div className="card mb-12 py-12">
          <h2 className="text-center text-sm font-medium text-slate-500 uppercase tracking-wider mb-10">How it works</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            {/* Server */}
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 rounded-2xl bg-brand-500/20 border-2 border-brand-500/50 flex flex-col items-center justify-center gap-1 shadow-lg shadow-brand-500/10">
                <div className="text-3xl">🖥️</div>
                <div className="text-xs font-bold text-brand-500 text-center">Host PC</div>
                <div className="text-xs text-slate-500 text-center">vSpace Pro</div>
              </div>
            </div>

            {/* Arrow out */}
            <div className="flex flex-col items-center gap-1 text-slate-600">
              <div className="hidden md:block text-2xl">→</div>
              <div className="md:hidden text-2xl">↓</div>
              <div className="text-xs text-slate-600">Network</div>
            </div>

            {/* Thin clients */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'L250', res: '1440×900', port: 'VGA', color: 'bg-slate-700/50 border-slate-600' },
                { name: 'L300', res: '1920×1080', port: 'VGA', color: 'bg-indigo-900/40 border-indigo-700/50' },
                { name: 'L350', res: '1920×1200', port: 'DVI-D', color: 'bg-purple-900/40 border-purple-700/50' },
              ].map((d) => (
                <div key={d.name} className={`flex flex-col items-center p-3 rounded-xl border ${d.color} text-center`}>
                  <div className="text-2xl mb-1">📺</div>
                  <div className="text-xs font-bold text-white">{d.name}</div>
                  <div className="text-xs text-slate-500">{d.res}</div>
                  <div className="text-xs text-slate-600">{d.port}</div>
                  <div className="mt-2 text-xs text-slate-500">⌨️ 🖱️</div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-xs text-slate-600 mt-8">
            Each device connects to a monitor, keyboard, and mouse — giving the user a full independent desktop experience.
          </p>
        </div>

        {/* How it works steps */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { step: '01', title: 'Install vSpace Pro', desc: 'Install NComputing vSpace Pro server software on one powerful PC (the host).' },
            { step: '02', title: 'Connect L-Series devices', desc: 'Plug an L250, L300, or L350 into each user\'s monitor via VGA or DVI-D. Connect mouse and keyboard.' },
            { step: '03', title: 'Everyone gets a desktop', desc: 'Each user logs into their own independent virtual desktop session — simultaneously — from the same host PC.' },
          ].map((s) => (
            <div key={s.step} className="card">
              <div className="text-5xl font-extrabold text-brand-500/20 mb-3">{s.step}</div>
              <h3 className="font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-slate-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="card mb-12">
          <h2 className="text-xl font-bold text-white mb-6">What you get</h2>
          <ul className="space-y-3">
            {[
              'Up to 100 independent desktops from a single host PC',
              'Each L-Series device draws only 3–5 watts of power',
              'No local storage — zero data theft risk from lost devices',
              'Update all desktops from one place in minutes',
              'Devices include mounting bracket, mic and speaker ports',
              'Devices cost ₹4,999–₹7,999 vs ₹40,000–₹80,000 for a full PC',
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 text-slate-300 text-sm">
                <span className="text-green-400 mt-0.5">✓</span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center flex flex-wrap gap-4 justify-center">
          <Link to="/product" className="btn-primary">See the Devices →</Link>
          <button onClick={onDemo} className="btn-outline">Request a Demo</button>
        </div>
      </section>
    </div>
  )
}

export default Solution
