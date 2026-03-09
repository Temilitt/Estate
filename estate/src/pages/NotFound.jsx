import { Link } from 'react-router-dom'
import { ArrowLeft, Home, Search } from 'lucide-react'
import { useEffect, useRef } from 'react'

const NotFound = () => {
  const ref = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const timer = setTimeout(() => {
      if (ref.current) {
        ref.current.style.opacity = '1'
        ref.current.style.transform = 'translateY(0)'
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-green-950 flex items-center justify-center px-6 overflow-hidden relative">

      {/* BIG 404 BACKGROUND TEXT */}
      <span
        className="absolute font-display text-green-900 select-none pointer-events-none"
        style={{ fontSize: 'clamp(180px, 30vw, 400px)', opacity: 0.15, lineHeight: 1 }}
      >
        404
      </span>

      {/* CONTENT */}
      <div
        ref={ref}
        style={{
          opacity: 0,
          transform: 'translateY(40px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
        className="relative z-10 text-center max-w-lg"
      >
        {/* TAG */}
        <p className="section-tag !text-sand-300 justify-center mb-6">
          Page Not Found
        </p>

        {/* HEADING */}
        <h1 className="font-display text-cream-100 mb-5"
          style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
        >
          This Page Doesn't<br />
          <em className="text-sand-200 italic">Exist</em>
        </h1>

        {/* SUBTEXT */}
        <p className="text-cream-200 opacity-50 font-body font-light leading-relaxed mb-10">
          The page you are looking for may have been moved, deleted or
          never existed. Let us help you find your way back.
        </p>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="btn-sand flex items-center gap-3 group w-full sm:w-auto justify-center"
          >
            <Home size={15} />
            Back to Home
          </Link>
          <Link
            to="/listings"
            className="flex items-center gap-3 border border-cream-200 border-opacity-20 text-cream-100 px-8 py-4 text-sm tracking-widest uppercase hover:border-sand-300 hover:text-sand-200 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <Search size={15} />
            Browse Properties
          </Link>
        </div>

        {/* BACK LINK */}
        <button
          onClick={() => window.history.back()}
          className="mt-8 inline-flex items-center gap-2 text-xs tracking-[2px] uppercase text-cream-200 opacity-30 hover:opacity-70 transition-opacity duration-300 group"
        >
          <ArrowLeft size={13} className="transition-transform duration-300 group-hover:-translate-x-1" />
          Go Back
        </button>

      </div>

    </div>
  )
}

export default NotFound
