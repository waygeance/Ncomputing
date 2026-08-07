// AdminGuard.jsx — redirects to /admin/login if no JWT token in sessionStorage

import { Navigate } from 'react-router-dom'

function AdminGuard({ children }) {
  const token = sessionStorage.getItem('admin_token')
  if (!token) return <Navigate to="/admin/login" replace />
  return children
}

export default AdminGuard
