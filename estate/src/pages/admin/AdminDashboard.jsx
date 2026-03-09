import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Building2, CalendarCheck, TrendingUp, Clock } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout.jsx'
import { getProperties, getBookings } from '../../services/api'

const AdminDashboard = () => {
  const [properties, setProperties] = useState([])
  const [bookings,   setBookings]   = useState([])
  const [loading,    setLoading]    = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propRes, bookRes] = await Promise.all([
          getProperties(),
          getBookings(),
        ])
        setProperties(propRes.data)
        setBookings(bookRes.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const stats = [
    {
      label: 'Total Properties',
      value: properties.length,
      icon:  Building2,
      link:  '/admin/properties',
      color: 'bg-green-950',
    },
    {
      label: 'Total Bookings',
      value: bookings.length,
      icon:  CalendarCheck,
      link:  '/admin/bookings',
      color: 'bg-sand-400',
    },
    {
      label: 'For Sale',
      value: properties.filter((p) => p.status === 'sale').length,
      icon:  TrendingUp,
      link:  '/admin/properties',
      color: 'bg-green-800',
    },
    {
      label: 'Pending Bookings',
      value: bookings.filter((b) => b.status === 'pending').length,
      icon:  Clock,
      link:  '/admin/bookings',
      color: 'bg-earth',
    },
  ]

  return (
    <AdminLayout>
      <div className="mb-10">
        <p className="section-tag">Overview</p>
        <h1 className="font-display text-3xl text-green-950">Dashboard</h1>
      </div>

      {/* STAT CARDS */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {[1,2,3,4].map((i) => (
            <div key={i} className="bg-sand-100 animate-pulse h-32" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Link
                key={stat.label}
                to={stat.link}
                className={`${stat.color} p-6 flex flex-col gap-4 hover:opacity-90 transition-opacity`}
              >
                <Icon size={20} className="text-cream-100 opacity-70" />
                <div>
                  <p className="font-display text-3xl text-cream-100">{stat.value}</p>
                  <p className="text-[10px] tracking-[2px] uppercase text-cream-100 opacity-60 mt-1">
                    {stat.label}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {/* RECENT BOOKINGS */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl text-green-950">Recent Bookings</h2>
          <Link
            to="/admin/bookings"
            className="text-xs tracking-[2px] uppercase text-green-800 hover:text-green-600 transition-colors"
          >
            View All →
          </Link>
        </div>

        <div className="bg-white border border-sand-200 overflow-hidden">
          {bookings.length === 0 ? (
            <p className="text-center text-sand-400 py-12 text-sm">No bookings yet</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-green-950 text-cream-100">
                <tr>
                  {['Name', 'Email', 'Phone', 'Date', 'Status'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-[10px] tracking-[2px] uppercase font-normal">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 5).map((b, i) => (
                  <tr key={b._id} className={i % 2 === 0 ? 'bg-white' : 'bg-cream-50'}>
                    <td className="px-5 py-4 text-green-950 font-medium">{b.name}</td>
                    <td className="px-5 py-4 text-green-900 opacity-60">{b.email}</td>
                    <td className="px-5 py-4 text-green-900 opacity-60">{b.phone}</td>
                    <td className="px-5 py-4 text-green-900 opacity-60">
                      {new Date(b.date).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-[10px] tracking-[2px] uppercase px-3 py-1 ${
                        b.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : b.status === 'cancelled'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-sand-100 text-sand-500'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard