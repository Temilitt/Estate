import { Link } from 'react-router-dom'
import { ArrowRight, Play } from 'lucide-react'
import { useEffect, useRef } from 'react'

const Hero = () => {
  const revealRefs = useRef([])

  useEffect(() => {
    const timer = setTimeout(() => {
      revealRefs.current.forEach((el, i) => {
        if (el) {
          setTimeout(() => {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
          }, i * 180)
        }
      })
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const addRef = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el)
    }
  }

  const animStyle = {
    opacity: 0,
    transform: 'translateY(40px)',
    transition: 'opacity 0.8s ease, transform 0.8s ease',
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        {/* Replace this src with your downloaded luxury exterior image */}
        <img
          src="/images/im1.jpg"
          alt="Luxury property"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-green-950 opacity-60" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cream-50 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-32 pb-20">
        <div className="max-w-3xl">

          {/* EYEBROW */}
          <div
            ref={addRef}
            style={animStyle}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-8 h-px bg-sand-300" />
            <span className="text-sand-300 text-xs tracking-[4px] uppercase font-body">
              Nigeria's Most Trusted Estate Agency
            </span>
          </div>

          {/* HEADING */}
          <h1
            ref={addRef}
            style={animStyle}
            className="font-display text-cream-100 leading-[1.05] mb-8"
            style={{ ...animStyle, fontSize: 'clamp(48px, 7vw, 88px)' }}
          >
            Where Fine<br />
            <em className="text-sand-200 font-display italic">Living</em> Begins
          </h1>

          {/* SUBTEXT */}
          <p
            ref={addRef}
            style={animStyle}
            className="text-cream-200 opacity-75 text-lg leading-relaxed max-w-xl mb-12 font-body font-light"
          >
            Exclusive homes, duplexes and commercial spaces across Lagos and Abuja.
            Curated for families and professionals who deserve the very best.
          </p>

          {/* ACTIONS */}
          <div
            ref={addRef}
            style={animStyle}
            className="flex flex-wrap items-center gap-5"
          >
            <Link
              to="/listings"
              className="btn-sand flex items-center gap-3 group"
            >
              Explore Properties
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-3 text-cream-100 text-sm tracking-widest uppercase hover:text-sand-200 transition-colors duration-300 group"
            >
              <span className="w-10 h-10 rounded-full border border-cream-100 border-opacity-40 flex items-center justify-center group-hover:border-sand-200 transition-colors">
                <Play size={12} fill="currentColor" />
              </span>
              Book Inspection
            </Link>
          </div>

        </div>

        {/* BOTTOM STATS ROW */}
        <div
          ref={addRef}
          style={animStyle}
          className="mt-20 flex flex-wrap gap-0 border border-cream-100 border-opacity-10 w-fit"
        >
          {[
            { num: '500+',  label: 'Properties Listed' },
            { num: '12+',   label: 'Years Experience' },
            { num: '98%',   label: 'Client Satisfaction' },
            { num: '₦2B+',  label: 'Properties Sold' },
          ].map((stat, i) => (
            <div
              key={i}
              className="px-8 py-5 border-r border-cream-100 border-opacity-10 last:border-r-0 text-center"
            >
              <span className="font-display text-2xl text-sand-200 block leading-none mb-1">
                {stat.num}
              </span>
              <span className="text-[10px] tracking-[2px] uppercase text-cream-200 opacity-50">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>

      <div className="absolute bottom-10 right-10 z-10 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[9px] tracking-[3px] uppercase text-cream-100 rotate-90 mb-4">
          Scroll
        </span>
        <div className="w-px h-12 bg-cream-100 opacity-40 animate-pulse" />
      </div>

    </section>
  )
}

export default Hero