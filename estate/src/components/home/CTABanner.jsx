import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { useEffect, useRef } from 'react'

const CTABanner = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative py-0 overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        {/* Replace with your best exterior image */}
        <img
          src="/images/exterior-2.jpg"
          alt="Luxury property"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-950 opacity-80" />
      </div>

      {/* CONTENT */}
      <div
        ref={sectionRef}
        className="reveal relative z-10 max-w-7xl mx-auto px-6 py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >

        {/* LEFT */}
        <div>
          <p className="section-tag !text-sand-300">
            Start Your Journey Today
          </p>
          <h2
            className="font-display text-cream-100 leading-tight mb-6"
            style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}
          >
            Your Dream Home<br />
            Is <em className="text-sand-200 italic">One Call Away</em>
          </h2>
          <p className="text-cream-200 opacity-60 text-base leading-relaxed font-body font-light max-w-lg">
            Whether you are buying, renting or investing — our team is ready to
            guide you to the perfect property. No pressure, no rush. Just honest
            advice and exceptional service.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-5 lg:items-end">

          {/* MAIN CTA */}
          <Link
            to="/listings"
            className="btn-sand flex items-center gap-3 group w-full lg:w-auto justify-center"
          >
            Browse All Properties
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          {/* SECONDARY CTA */}
          <Link
            to="/contact"
            className="flex items-center gap-3 border border-cream-200 border-opacity-30 text-cream-100 px-8 py-4 text-sm tracking-widest uppercase hover:border-sand-300 hover:text-sand-200 transition-all duration-300 w-full lg:w-auto justify-center"
          >
            Book Free Consultation
          </Link>

          {/* PHONE */}
          <a
            href="tel:+2349016196558"
            className="flex items-center gap-3 text-cream-200 opacity-50 hover:opacity-100 transition-opacity duration-300 justify-center lg:justify-end mt-2"
          >
            <div className="w-9 h-9 rounded-full border border-cream-200 border-opacity-20 flex items-center justify-center">
              <Phone size={14} />
            </div>
            <span className="text-sm tracking-wider">090 1619 6558</span>
          </a>

        </div>
      </div>

      {/* BOTTOM STRIP */}
      <div className="relative z-10 bg-green-900 bg-opacity-80 border-t border-green-800 py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center md:justify-between gap-6">
          {[
            { num: '500+', label: 'Active Listings' },
            { num: '12+',  label: 'Years Experience' },
            { num: '98%',  label: 'Client Satisfaction' },
            { num: '₦2B+', label: 'Properties Sold' },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="font-display text-2xl text-sand-200">
                {stat.num}
              </span>
              <span className="text-[10px] tracking-[2px] uppercase text-cream-200 opacity-40">
                {stat.label}
              </span>
              {i < 3 && (
                <div className="hidden md:block w-px h-6 bg-green-700 ml-4" />
              )}
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

export default CTABanner