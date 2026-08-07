// App.jsx — React Router routes + global Navbar/Footer + LeadModal

import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LeadModal from './components/LeadModal'
import AdminGuard from './components/AdminGuard'

import Landing from './pages/Landing'
import Problem from './pages/Problem'
import Solution from './pages/Solution'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirm from './pages/OrderConfirm'
import AdminLogin from './pages/AdminLogin'
import AdminOrders from './pages/AdminOrders'
import AdminLeads from './pages/AdminLeads'

// Admin pages don't show the public Navbar/Footer
const ADMIN_PATHS = ['/admin']

function PublicLayout({ children, onDemo }) {
  return (
    <>
      <Navbar onDemo={onDemo} />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  )
}

function App() {
  const [showModal, setShowModal] = useState(false)

  return (
    <BrowserRouter>
      {showModal && <LeadModal onClose={() => setShowModal(false)} />}
      <Routes>
        {/* Public marketing + ordering routes */}
        <Route path="/" element={<PublicLayout onDemo={() => setShowModal(true)}><Landing onDemo={() => setShowModal(true)} /></PublicLayout>} />
        <Route path="/problem" element={<PublicLayout onDemo={() => setShowModal(true)}><Problem onDemo={() => setShowModal(true)} /></PublicLayout>} />
        <Route path="/solution" element={<PublicLayout onDemo={() => setShowModal(true)}><Solution onDemo={() => setShowModal(true)} /></PublicLayout>} />
        <Route path="/product" element={<PublicLayout onDemo={() => setShowModal(true)}><Product /></PublicLayout>} />
        <Route path="/cart" element={<PublicLayout onDemo={() => setShowModal(true)}><Cart /></PublicLayout>} />
        <Route path="/checkout" element={<PublicLayout onDemo={() => setShowModal(true)}><Checkout /></PublicLayout>} />
        <Route path="/order-confirmation/:id" element={<PublicLayout onDemo={() => setShowModal(true)}><OrderConfirm /></PublicLayout>} />

        {/* Admin routes (no public nav) */}
        <Route path="/admin" element={<Navigate to="/admin/orders" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/orders" element={<AdminGuard><AdminOrders /></AdminGuard>} />
        <Route path="/admin/leads" element={<AdminGuard><AdminLeads /></AdminGuard>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
