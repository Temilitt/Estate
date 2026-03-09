import { useEffect, useState } from 'react'
import { Pencil, Trash2, Plus, X, CheckCircle } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import { getProperties, createProperty, updateProperty, deleteProperty } from '../../services/api'

const empty = {
  title: '', location: '', price: '', type: 'Apartment',
  status: 'sale', bedrooms: '', bathrooms: '', size: '',
  description: '', features: '', yearBuilt: '', parking: '',
  isFeatured: false, tag: '',
  images: '',
}

const TYPES    = ['Apartment','Duplex','Villa','Penthouse','Mansion','Terrace','Studio','Commercial']
const STATUSES = ['sale','rent','shortlet']
const TAGS     = ['','Featured','Premium','New']

const AdminProperties = () => {
  const [properties, setProperties] = useState([])
  const [loading,    setLoading]    = useState(true)
  const [showForm,   setShowForm]   = useState(false)
  const [editing,    setEditing]    = useState(null)
  const [confirmId,  setConfirmId]  = useState(null)
  const [saving,     setSaving]     = useState(false)
  const [saved,      setSaved]      = useState(false)
  const [form,       setForm]       = useState(empty)

  const fetchProperties = async () => {
    try {
      const { data } = await getProperties()
      setProperties(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProperties() }, [])

  const openAdd = () => {
    setEditing(null)
    setForm(empty)
    setShowForm(true)
  }

  const openEdit = (property) => {
    setEditing(property._id)
    setForm({
      ...property,
      features: property.features?.join(', ') || '',
      images:   property.images?.join(', ')   || '',
    })
    setShowForm(true)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        ...form,
        price:     Number(form.price),
        bedrooms:  Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        yearBuilt: Number(form.yearBuilt),
        parking:   Number(form.parking),
        features:  form.features.split(',').map((f) => f.trim()).filter(Boolean),
        images:    form.images.split(',').map((i) => i.trim()).filter(Boolean),
        agent: {
          name:  'Temiloluwa Aderounmu',
          role:  'Senior Property Consultant',
          phone: '09016196558',
          email: 'aderounmutemiloluwa2004@gmail.com',
          image: '/images/myimg1.jpg',
        },
      }

      if (editing) {
        const { data } = await updateProperty(editing, payload)
        setProperties((prev) => prev.map((p) => (p._id === editing ? data : p)))
      } else {
        const { data } = await createProperty(payload)
        setProperties((prev) => [...prev, data])
      }

      setSaved(true)
      setTimeout(() => {
        setSaved(false)
        setShowForm(false)
        setEditing(null)
        setForm(empty)
      }, 1500)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteProperty(confirmId)
      setProperties((prev) => prev.filter((p) => p._id !== confirmId))
      setConfirmId(null)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <AdminLayout>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="section-tag">Manage</p>
          <h1 className="font-display text-3xl text-green-950">Properties</h1>
        </div>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2">
          <Plus size={15} />
          Add Property
        </button>
      </div>

      {/* TABLE */}
      {loading ? (
        <div className="bg-sand-100 animate-pulse h-64" />
      ) : (
        <div className="bg-white border border-sand-200 overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="bg-green-950 text-cream-100">
              <tr>
                {['Image', 'Title', 'Location', 'Type', 'Status', 'Price', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] tracking-[2px] uppercase font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {properties.map((p, i) => (
                <tr key={p._id} className={i % 2 === 0 ? 'bg-white' : 'bg-cream-50'}>
                  <td className="px-5 py-3">
                    <img
                      src={p.images?.[0]}
                      alt={p.title}
                      className="w-16 h-12 object-cover"
                    />
                  </td>
                  <td className="px-5 py-4 text-green-950 font-medium whitespace-nowrap">{p.title}</td>
                  <td className="px-5 py-4 text-green-900 opacity-60 whitespace-nowrap">{p.location}</td>
                  <td className="px-5 py-4 text-green-900 opacity-60">{p.type}</td>
                  <td className="px-5 py-4">
                    <span className={`text-[10px] tracking-[2px] uppercase px-3 py-1 ${
                      p.status === 'sale'     ? 'bg-green-100 text-green-800'  :
                      p.status === 'rent'     ? 'bg-sand-100 text-sand-500'   :
                                                'bg-green-950 text-cream-100'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-green-900 opacity-60 whitespace-nowrap">
                    ₦{Number(p.price).toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => openEdit(p)}
                        className="text-green-700 hover:text-green-900 transition-colors"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => setConfirmId(p._id)}
                        className="text-sand-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ADD / EDIT FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-4 py-8 overflow-y-auto">
          <div
            className="fixed inset-0 bg-green-950 opacity-80"
            onClick={() => setShowForm(false)}
          />
          <div className="relative bg-cream-50 w-full max-w-2xl p-8 z-10 my-auto">

            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-green-900 opacity-40 hover:opacity-100 transition-opacity"
            >
              <X size={18} />
            </button>

            {saved ? (
              <div className="text-center py-12">
                <CheckCircle size={48} className="text-green-700 mx-auto mb-4" />
                <h3 className="font-display text-2xl text-green-950">
                  {editing ? 'Property Updated!' : 'Property Added!'}
                </h3>
              </div>
            ) : (
              <>
                <p className="section-tag mb-2">
                  {editing ? 'Edit Property' : 'New Property'}
                </p>
                <h3 className="font-display text-2xl text-green-950 mb-8">
                  {editing ? 'Update Details' : 'Add New Listing'}
                </h3>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* TITLE */}
                  <div className="md:col-span-2">
                    <label className="form-label">Title</label>
                    <input name="title" required value={form.title} onChange={handleChange} className="form-input" placeholder="e.g. Ocean Crest Penthouse" />
                  </div>

                  {/* LOCATION */}
                  <div className="md:col-span-2">
                    <label className="form-label">Location</label>
                    <input name="location" required value={form.location} onChange={handleChange} className="form-input" placeholder="e.g. Victoria Island, Lagos" />
                  </div>

                  {/* PRICE */}
                  <div>
                    <label className="form-label">Price (₦)</label>
                    <input name="price" type="number" required value={form.price} onChange={handleChange} className="form-input" placeholder="e.g. 85000000" />
                  </div>

                  {/* TYPE */}
                  <div>
                    <label className="form-label">Type</label>
                    <select name="type" value={form.type} onChange={handleChange} className="form-input">
                      {TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>

                  {/* STATUS */}
                  <div>
                    <label className="form-label">Status</label>
                    <select name="status" value={form.status} onChange={handleChange} className="form-input">
                      {STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>

                  {/* TAG */}
                  <div>
                    <label className="form-label">Tag</label>
                    <select name="tag" value={form.tag} onChange={handleChange} className="form-input">
                      {TAGS.map((t) => <option key={t} value={t}>{t || 'None'}</option>)}
                    </select>
                  </div>

                  {/* BEDROOMS */}
                  <div>
                    <label className="form-label">Bedrooms</label>
                    <input name="bedrooms" type="number" value={form.bedrooms} onChange={handleChange} className="form-input" placeholder="e.g. 3" />
                  </div>

                  {/* BATHROOMS */}
                  <div>
                    <label className="form-label">Bathrooms</label>
                    <input name="bathrooms" type="number" value={form.bathrooms} onChange={handleChange} className="form-input" placeholder="e.g. 2" />
                  </div>

                  {/* SIZE */}
                  <div>
                    <label className="form-label">Size</label>
                    <input name="size" value={form.size} onChange={handleChange} className="form-input" placeholder="e.g. 250 sqm" />
                  </div>

                  {/* YEAR BUILT */}
                  <div>
                    <label className="form-label">Year Built</label>
                    <input name="yearBuilt" type="number" value={form.yearBuilt} onChange={handleChange} className="form-input" placeholder="e.g. 2022" />
                  </div>

                  {/* PARKING */}
                  <div>
                    <label className="form-label">Parking Spaces</label>
                    <input name="parking" type="number" value={form.parking} onChange={handleChange} className="form-input" placeholder="e.g. 2" />
                  </div>

                  {/* FEATURED */}
                  <div className="flex items-center gap-3 mt-2">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      id="isFeatured"
                      checked={form.isFeatured}
                      onChange={handleChange}
                      className="w-4 h-4 accent-green-800"
                    />
                    <label htmlFor="isFeatured" className="text-sm text-green-900">
                      Show on Featured Listings (Homepage)
                    </label>
                  </div>

                  {/* IMAGES */}
                  <div className="md:col-span-2">
                    <label className="form-label">Image Paths (comma separated)</label>
                    <input name="images" value={form.images} onChange={handleChange} className="form-input" placeholder="/images/apart1.jpg, /images/interior.jpg" />
                  </div>

                  {/* FEATURES */}
                  <div className="md:col-span-2">
                    <label className="form-label">Features (comma separated)</label>
                    <input name="features" value={form.features} onChange={handleChange} className="form-input" placeholder="Swimming pool, 24hr security, Gym" />
                  </div>

                  {/* DESCRIPTION */}
                  <div className="md:col-span-2">
                    <label className="form-label">Description</label>
                    <textarea name="description" required rows={4} value={form.description} onChange={handleChange} className="form-input resize-none" placeholder="Describe the property..." />
                  </div>

                  {/* SUBMIT */}
                  <div className="md:col-span-2 mt-2">
                    <button
                      type="submit"
                      disabled={saving}
                      className="btn-primary w-full flex items-center justify-center gap-3"
                    >
                      {saving ? (
                        <>
                          <span className="w-4 h-4 border-2 border-cream-100 border-t-transparent rounded-full animate-spin" />
                          Saving...
                        </>
                      ) : (
                        editing ? 'Update Property' : 'Add Property'
                      )}
                    </button>
                  </div>

                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {confirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-green-950 opacity-80" onClick={() => setConfirmId(null)} />
          <div className="relative bg-cream-50 w-full max-w-sm p-8 z-10 text-center">
            <h3 className="font-display text-2xl text-green-950 mb-3">Delete Property?</h3>
            <p className="text-sm text-green-900 opacity-60 mb-8">
              This will permanently remove the listing.
            </p>
            <div className="flex gap-4">
              <button onClick={() => setConfirmId(null)} className="btn-outline flex-1 text-center">
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white text-xs tracking-[2px] uppercase px-6 py-3 hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  )
}

export default AdminProperties