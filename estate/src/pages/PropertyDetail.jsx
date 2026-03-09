import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  MapPin, Bed, Bath, Maximize, ArrowLeft,
  Phone, Mail, Calendar, Share2, Heart,
  CheckCircle2, ChevronLeft, ChevronRight
} from 'lucide-react'
import { getProperty, createBooking } from '../services/api'

const formatPrice = (amount, status) => {
  let price = ''
  if (amount >= 1_000_000_000) price = `₦${(amount / 1_000_000_000).toFixed(1)}B`
  else if (amount >= 1_000_000) price = `₦${(amount / 1_000_000).toFixed(0)}M`
  else price = `₦${amount.toLocaleString()}`
  if (status === 'rent') return price + ' / year'
  if (status === 'shortlet') return price + ' / night'
  return price
}

const statusLabel = {
  sale: 'For Sale',
  rent: 'For Rent',
  shortlet: 'Short Let',
}

const PropertyDetail = () => {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImg, setActiveImg] = useState(0)
  const [saved, setSaved] = useState(false)
  const [showBooking, setShowBooking] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [bookingData, setBookingData] = useState({
    name: '', phone: '', email: '', date: '', message: ''
  })

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { data } = await getProperty(id)
        setProperty(data)
      } catch (error) {
        setProperty(null)
      } finally {
        setLoading(false)
      }
      setActiveImg(0)
      window.scrollTo(0, 0)
    }
    fetchProperty()
  }, [id])

  const handleBooking = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await createBooking({
        property: property._id,
        name: bookingData.name,
        phone: bookingData.phone,
        email: bookingData.email,
        date: bookingData.date,
        message: bookingData.message,
      })
      setSubmitted(true)
      setTimeout(() => {
        setShowBooking(false)
        setSubmitted(false)
        setBookingData({ name: '', phone: '', email: '', date: '', message: '' })
      }, 3000)
    } catch (error) {
      console.error('Booking failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const prevImg = () =>
    setActiveImg((prev) => (prev === 0 ? property.images.length - 1 : prev - 1))
  const nextImg = () =>
    setActiveImg((prev) => (prev === property.images.length - 1 ? 0 : prev + 1))

  // LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 pt-36 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-sand-100 animate-pulse h-96 mb-4" />
            <div className="bg-sand-100 animate-pulse h-8 mb-3 w-2/3" />
            <div className="bg-sand-100 animate-pulse h-6 w-1/3" />
          </div>
          <div className="lg:col-span-1">
            <div className="bg-sand-100 animate-pulse h-48" />
          </div>
        </div>
      </div>
    )
  }

  // NOT FOUND STATE
  if (!property) {
    return (
      <div className="min-h-screen bg-cream-50 flex flex-col items-center justify-center gap-6 pt-24">
        <p className="font-display text-4xl text-green-950 opacity-20">
          Property not found
        </p>
        <Link to="/listings" className="btn-outline">
          Back to Listings
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50">

      {/* BACK BUTTON */}
      <div className="pt-28 pb-6 px-6 max-w-7xl mx-auto">
        <Link
          to="/listings"
          className="inline-flex items-center gap-2 text-xs tracking-[2px] uppercase text-green-800 hover:text-green-600 transition-colors duration-300 group"
        >
          <ArrowLeft
            size={14}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          Back to Listings
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-2">

            {/* IMAGE GALLERY */}
            <div className="relative overflow-hidden mb-4 bg-sand-100">
              <img
                key={activeImg}
                src={property.images[activeImg]}
                alt={property.title}
                className="w-full h-[480px] object-cover"
                style={{ animation: 'fadeIn 0.4s ease' }}
              />
              <span className="absolute top-5 left-5 bg-green-900 text-cream-100 text-[10px] tracking-[2px] uppercase px-3 py-1.5">
                {statusLabel[property.status]}
              </span>
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImg}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-green-950 bg-opacity-60 text-cream-100 flex items-center justify-center hover:bg-opacity-90 transition-all"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextImg}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-green-950 bg-opacity-60 text-cream-100 flex items-center justify-center hover:bg-opacity-90 transition-all"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
              <div className="absolute bottom-4 right-4 bg-green-950 bg-opacity-70 text-cream-100 text-xs px-3 py-1.5 tracking-wider">
                {activeImg + 1} / {property.images.length}
              </div>
            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-3 mb-10 overflow-x-auto pb-1">
              {property.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`shrink-0 w-24 h-16 overflow-hidden border-2 transition-all duration-300 ${activeImg === i
                      ? 'border-green-800'
                      : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* TITLE ROW */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-[10px] tracking-[3px] uppercase text-sand-400 mb-2">
                  {property.type}
                </p>
                <h1 className="font-display text-3xl md:text-4xl text-green-950 leading-tight mb-3">
                  {property.title}
                </h1>
                <div className="flex items-center gap-2 text-sand-400 text-sm">
                  <MapPin size={14} />
                  {property.location}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setSaved(!saved)}
                  className={`w-10 h-10 border flex items-center justify-center transition-all duration-300 ${saved
                      ? 'bg-green-800 border-green-800 text-cream-100'
                      : 'border-sand-200 text-sand-400 hover:border-green-800 hover:text-green-800'
                    }`}
                >
                  <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
                </button>
                <button
                  onClick={() =>
                    navigator.share?.({
                      title: property.title,
                      url: window.location.href,
                    })
                  }
                  className="w-10 h-10 border border-sand-200 flex items-center justify-center text-sand-400 hover:border-green-800 hover:text-green-800 transition-all duration-300"
                >
                  <Share2 size={16} />
                </button>
              </div>
            </div>

            {/* KEY STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-sand-200 mb-10">
              {[
                { icon: <Bed size={18} />, label: 'Bedrooms', value: property.bedrooms ?? '—' },
                { icon: <Bath size={18} />, label: 'Bathrooms', value: property.bathrooms ?? '—' },
                { icon: <Maximize size={18} />, label: 'Size', value: property.size ?? '—' },
                { icon: <Calendar size={18} />, label: 'Built', value: property.yearBuilt ?? '—' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center py-6 border-r border-sand-200 last:border-r-0 gap-2"
                >
                  <span className="text-sand-400">{stat.icon}</span>
                  <span className="font-display text-xl text-green-950">{stat.value}</span>
                  <span className="text-[10px] tracking-[2px] uppercase text-green-900 opacity-40">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* DESCRIPTION */}
            <div className="mb-10">
              <h3 className="font-display text-2xl text-green-950 mb-5">
                About This Property
              </h3>
              <div className="divider mb-6" />
              <p className="text-green-900 opacity-70 leading-relaxed text-base font-body font-light">
                {property.description}
              </p>
            </div>

            {/* FEATURES */}
            {property.features?.length > 0 && (
              <div>
                <h3 className="font-display text-2xl text-green-950 mb-5">
                  Features & Amenities
                </h3>
                <div className="divider mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-green-700 shrink-0" />
                      <span className="text-sm text-green-900 opacity-70 font-body">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN — STICKY SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 flex flex-col gap-5">

              {/* PRICE CARD */}
              <div className="bg-green-950 text-cream-100 p-8">
                <p className="text-[10px] tracking-[3px] uppercase text-sand-300 mb-2">
                  {statusLabel[property.status]}
                </p>
                <p className="font-display text-3xl text-sand-200 mb-1">
                  {formatPrice(property.price, property.status)}
                </p>
                <p className="text-xs text-cream-200 opacity-40 tracking-wider mb-8">
                  {property.location}
                </p>
                <button
                  onClick={() => setShowBooking(true)}
                  className="btn-sand w-full text-center flex items-center justify-center gap-2"
                >
                  <Calendar size={15} />
                  Book Inspection
                </button>
              </div>

              {/* AGENT CARD */}
              {property.agent && (
                <div className="border border-sand-200 p-6 bg-white">
                  <p className="text-[10px] tracking-[3px] uppercase text-sand-400 mb-5">
                    Your Agent
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={property.agent.image}
                      alt={property.agent.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-sand-200"
                    />
                    <div>
                      <p className="font-display text-lg text-green-950 leading-snug">
                        {property.agent.name}
                      </p>
                      <p className="text-xs text-sand-400 tracking-wider mt-0.5">
                        {property.agent.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <a
                      href={`tel:${property.agent.phone}`}
                      className="flex items-center gap-3 border border-sand-200 px-4 py-3 text-sm text-green-800 hover:bg-green-950 hover:text-cream-100 hover:border-green-950 transition-all duration-300"
                    >
                      <Phone size={14} />
                      {property.agent.phone}
                    </a>
                    <a
                      href={`mailto:${property.agent.email}`}
                      className="flex items-center gap-3 border border-sand-200 px-4 py-3 text-sm text-green-800 hover:bg-green-950 hover:text-cream-100 hover:border-green-950 transition-all duration-300 truncate"
                    >
                      <Mail size={14} className="shrink-0" />
                      <span className="truncate">{property.agent.email}</span>
                    </a>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* BOOKING MODAL */}
      {showBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-green-950 opacity-80"
            onClick={() => setShowBooking(false)}
          />
          <div className="relative bg-cream-50 w-full max-w-lg p-8 z-10">
            <button
              onClick={() => setShowBooking(false)}
              className="absolute top-4 right-4 text-green-900 opacity-40 hover:opacity-100 transition-opacity"
            >
              ✕
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 size={48} className="text-green-700 mx-auto mb-4" />
                <h3 className="font-display text-2xl text-green-950 mb-2">
                  Booking Received!
                </h3>
                <p className="text-sm text-green-900 opacity-60">
                  We will contact you within the hour to confirm your inspection.
                </p>
              </div>
            ) : (
              <>
                <p className="section-tag mb-2">Schedule a Visit</p>
                <h3 className="font-display text-2xl text-green-950 mb-6">
                  Book an Inspection
                </h3>
                <form onSubmit={handleBooking} className="flex flex-col gap-4">
                  {[
                    { name: 'name', placeholder: 'Your Full Name', type: 'text' },
                    { name: 'phone', placeholder: 'Phone Number', type: 'tel' },
                    { name: 'email', placeholder: 'Email Address', type: 'email' },
                    { name: 'date', placeholder: 'Preferred Date', type: 'date' },
                  ].map((field) => (
                    <input
                      key={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      required
                      value={bookingData[field.name]}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, [field.name]: e.target.value })
                      }
                      className="w-full bg-white border border-sand-200 px-4 py-3 text-sm text-green-950 focus:outline-none focus:border-green-700 font-body transition-colors"
                    />
                  ))}
                  <textarea
                    placeholder="Additional message (optional)"
                    rows={3}
                    value={bookingData.message}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, message: e.target.value })
                    }
                    className="w-full bg-white border border-sand-200 px-4 py-3 text-sm text-green-950 focus:outline-none focus:border-green-700 font-body transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full text-center mt-2 flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-cream-100 border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Confirm Inspection Request'
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

    </div>
  )
}

export default PropertyDetail