import { Link } from 'react-router-dom'
import { MapPin, Bed, Bath, Maximize } from 'lucide-react'

const PropertyCard = ({ property }) => {
 const {
    _id,
    title,
    location,
    price,
    type,
    status,
    bedrooms,
    bathrooms,
    size,
    images,
    tag,
  } = property

const image = Array.isArray(images) ? images[0] : images

  const formatPrice = (amount) => {
    if (amount >= 1_000_000_000) return `₦${(amount / 1_000_000_000).toFixed(1)}B`
    if (amount >= 1_000_000) return `₦${(amount / 1_000_000).toFixed(0)}M`
    return `₦${amount.toLocaleString()}`
  }

  const statusColor = {
    sale:     'bg-green-800 text-cream-100',
    rent:     'bg-sand-400 text-white',
    shortlet: 'bg-earth text-cream-100',
    new:      'bg-green-600 text-cream-100',
  }

  const statusLabel = {
    sale:     'For Sale',
    rent:     'For Rent',
    shortlet: 'Short Let',
    new:      'New',
  }

  return (
    <Link to={`/listings/${_id}`} className="prop-card group block">

      {/* IMAGE */}
      <div className="relative overflow-hidden h-64">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* STATUS TAG */}
        <span
          className={`absolute top-4 left-4 text-[10px] tracking-[2px] uppercase px-3 py-1.5 font-body font-medium ${statusColor[status] || statusColor.sale}`}
        >
          {statusLabel[status] || 'For Sale'}
        </span>

        {/* FEATURED TAG */}
        {tag && (
          <span className="absolute top-4 right-4 bg-sand-300 text-earth text-[10px] tracking-[2px] uppercase px-3 py-1.5 font-body font-medium">
            {tag}
          </span>
        )}

        {/* HOVER OVERLAY */}
        <div className="absolute inset-0 bg-green-950 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
      </div>

      {/* BODY */}
      <div className="p-6 border border-t-0 border-sand-100">

        {/* TYPE */}
        <p className="text-[10px] tracking-[3px] uppercase text-sand-400 mb-2 font-body">
          {type}
        </p>

        {/* TITLE */}
        <h3 className="font-display text-xl text-green-950 mb-3 group-hover:text-green-700 transition-colors duration-300 leading-snug">
          {title}
        </h3>

        {/* LOCATION */}
        <div className="flex items-center gap-1.5 text-sm text-sand-400 mb-5">
          <MapPin size={13} className="shrink-0" />
          <span className="font-body">{location}</span>
        </div>

        {/* DIVIDER */}
        <div className="divider" />

        {/* FEATURES + PRICE */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4">
            {bedrooms && (
              <span className="flex items-center gap-1.5 text-xs text-green-900 opacity-70">
                <Bed size={13} />
                {bedrooms} Bed
              </span>
            )}
            {bathrooms && (
              <span className="flex items-center gap-1.5 text-xs text-green-900 opacity-70">
                <Bath size={13} />
                {bathrooms} Bath
              </span>
            )}
            {size && (
              <span className="flex items-center gap-1.5 text-xs text-green-900 opacity-70">
                <Maximize size={13} />
                {size}
              </span>
            )}
          </div>
          <div className="text-right">
            <p className="font-display text-lg text-green-800 font-semibold leading-none">
              {formatPrice(price)}
            </p>
            {status === 'rent' && (
              <p className="text-[10px] text-sand-400 tracking-wider mt-0.5">/year</p>
            )}
            {status === 'shortlet' && (
              <p className="text-[10px] text-sand-400 tracking-wider mt-0.5">/night</p>
            )}
          </div>
        </div>

      </div>
    </Link>
  )
}

export default PropertyCard