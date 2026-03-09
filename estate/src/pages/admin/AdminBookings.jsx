import { useEffect, useState } from 'react'
import { Trash2, CheckCircle, XCircle } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import { getBookings, updateBooking, deleteBooking } from '../../services/api'

const AdminBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading,  setLoading]  = useState(true)

  const fetchBookings = async () => {
    try {
      const { data } = await getBookings()
      setBookings(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchBookings() }, [])

  const handleStatus = async (id, status) => {
    try {
      await updateBooking(id, { status })
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      )
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this booking?')) return
    try {
      await deleteBooking(id)
      setBookings((prev) => prev.filter((b) => b._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <AdminLayout>
      <div className="mb-10">
        <p className="section-tag">Manage</p>
        <h1 className="font-display text-3xl text-green-950">Bookings</h1>
      </div>

      {loading ? (
        <div className="bg-sand-100 animate-pulse h-64" />
      ) : bookings.length === 0 ? (
        <p className="text-center text-sand-400 py-24 text-sm">No bookings yet</p>
      ) : (
        <div className="bg-white border border-sand-200 overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead className="bg-green-950 text-cream-100">
              <tr>
                {['Name', 'Contact', 'Property', 'Date', 'Message', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] tracking-[2px] uppercase font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr key={b._id} className={i % 2 === 0 ? 'bg-white' : 'bg-cream-50'}>
                  <td className="px-5 py-4 text-green-950 font-medium whitespace-nowrap">{b.name}</td>
                  <td className="px-5 py-4 text-green-900 opacity-60">
                    <p>{b.email}</p>
                    <p>{b.phone}</p>
                  </td>
                  <td className="px-5 py-4 text-green-900 opacity-60">
                    {b.property?.title || 'General Enquiry'}
                  </td>
                  <td className="px-5 py-4 text-green-900 opacity-60 whitespace-nowrap">
                    {new Date(b.date).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4 text-green-900 opacity-60 max-w-[200px] truncate">
                    {b.message || '—'}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-[10px] tracking-[2px] uppercase px-3 py-1 whitespace-nowrap ${
                      b.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : b.status === 'cancelled'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-sand-100 text-sand-500'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStatus(b._id, 'confirmed')}
                        className="text-green-700 hover:text-green-900 transition-colors"
                        title="Confirm"
                      >
                        <CheckCircle size={16} />
                      </button>
                      <button
                        onClick={() => handleStatus(b._id, 'cancelled')}
                        className="text-sand-400 hover:text-red-600 transition-colors"
                        title="Cancel"
                      >
                        <XCircle size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(b._id)}
                        className="text-sand-400 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  )
}

export default AdminBookings