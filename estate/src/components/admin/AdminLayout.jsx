import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  LayoutDashboard, Building2, CalendarCheck,
  LogOut, Menu, X
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard',  path: '/admin/dashboard',  icon: LayoutDashboard },
  { label: 'Properties', path: '/admin/properties', icon: Building2       },
  { label: 'Bookings',   path: '/admin/bookings',   icon: CalendarCheck   },
]

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth()
  const location         = useLocation()
  const navigate         = useNavigate()
  const [open, setOpen]  = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/admin')
  }

  return (
    <div className="min-h-screen bg-cream-50">

      {/* MOBILE TOPBAR */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-green-950 flex items-center justify-between px-5 py-4">
        <span className="font-display text-cream-100 text-lg">Temi & Co.</span>
        <button onClick={() => setOpen(!open)} className="text-cream-100">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-green-950 z-30
        flex flex-col transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        {/* LOGO */}
        <div className="p-8 border-b border-green-900">
          <span className="font-display font-bold text-xl text-cream-100">Temi & Co.</span>
          <p className="text-[10px] tracking-[3px] uppercase text-sand-400 mt-1">Admin Panel</p>
        </div>

        {/* NAV */}
        <nav className="flex-1 p-6 flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon   = item.icon
            const active = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 ${
                  active
                    ? 'bg-green-800 text-cream-100'
                    : 'text-green-300 hover:bg-green-900 hover:text-cream-100'
                }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* USER + LOGOUT */}
        <div className="p-6 border-t border-green-900">
          <p className="text-xs text-green-300 mb-1 truncate">{user?.name}</p>
          <p className="text-[10px] text-green-500 mb-4 truncate">{user?.email}</p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-green-400 hover:text-cream-100 transition-colors"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-20 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <div className="lg:ml-64 flex flex-col min-h-screen">

        {/* DESKTOP TOPBAR */}
        <header className="hidden lg:flex bg-white border-b border-sand-200 px-8 py-4 items-center justify-between sticky top-0 z-20">
          <p className="text-[10px] tracking-[3px] uppercase text-sand-400">
            Temi & Co. Estates — Admin
          </p>
          <Link
            to="/"
            target="_blank"
            className="text-xs text-green-800 hover:text-green-600 tracking-wider transition-colors"
          >
            View Site →
          </Link>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-5 pt-20 lg:pt-8 lg:p-8 w-full">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  )
}

export default AdminLayout