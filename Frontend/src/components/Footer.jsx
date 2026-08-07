// Footer.jsx

function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center text-white font-bold text-xs">N</div>
            <span className="font-bold text-white">NComputing L-Series</span>
          </div>
          <p className="text-slate-500 text-sm max-w-xs">
            Desktop virtualization for Indian schools, SMBs, and government offices. One PC, many desks.
          </p>
        </div>

        <div className="text-sm text-slate-500 text-center md:text-right">
          <p>NComputing India Pvt. Ltd.</p>
          <p>Pune, Maharashtra — 411001</p>
          <p>sales@ncomputingindia.com</p>
          <p className="mt-3 text-xs text-slate-600">© {new Date().getFullYear()} NComputing L-Series. Educational demo.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
