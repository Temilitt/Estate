import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import PropertyCard from '../ui/PropertyCard'
import { getProperties } from '../../services/api'

const FeaturedListings = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading]       = useState(true)
  const sectionRef = useRef(null)
  const cardRefs   = useRef([])

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await getProperties({ featured: true })
        setProperties(data.slice(0, 6))
      } catch (error) {
        console.error('Failed to fetch properties:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) headerObserver.observe(sectionRef.current)

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1'
              entry.target.style.transform = 'translateY(0)'
            }, i * 120)
          }
        })
      },
      { threshold: 0.1 }
    )
    cardRefs.current.forEach((card) => {
      if (card) cardObserver.observe(card)
    })

    return () => {
      headerObserver.disconnect()
      cardObserver.disconnect()
    }
  }, [properties])

  return (
    <section className="py-24 px-6 bg-cream-50">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div
          ref={sectionRef}
          className="reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="section-tag">Featured Properties</p>
            <h2 className="section-title">
              Curated <em>Exceptional</em><br />
              Listings
            </h2>
          </div>
          <Link
            to="/listings"
            className="flex items-center gap-3 text-green-800 text-xs tracking-[2px] uppercase hover:text-green-600 transition-colors duration-300 group self-start md:self-auto"
          >
            View All Properties
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-sand-100 animate-pulse h-80" />
            ))}
          </div>
        )}

        {/* GRID */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, i) => (
              <div
                key={property._id}
                ref={(el) => (cardRefs.current[i] = el)}
                style={{
                  opacity: 0,
                  transform: 'translateY(40px)',
                  transition: `opacity 0.7s ease, transform 0.7s ease`,
                }}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        )}

        {/* BOTTOM CTA */}
        {!loading && (
          <div className="mt-16 text-center">
            <Link to="/listings" className="btn-outline">
              Explore All Listings
            </Link>
          </div>
        )}

      </div>
    </section>
  )
}

export default FeaturedListings