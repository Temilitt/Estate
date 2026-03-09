import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Emeka Okafor',
    role: 'Business Executive',
    location: 'Victoria Island, Lagos',
    image: '/images/client1.jpg',
    rating: 5,
    property: 'Bought a 4-bedroom penthouse',
    text: 'Temi & Co. made buying our family home the most seamless experience I have ever had. From the first call to keys in hand — everything was handled with professionalism and warmth. Our agent knew exactly what we wanted before we even finished describing it.',
  },
  {
    id: 2,
    name: 'Amara Nwosu',
    role: 'Returning Professional',
    location: 'Lekki Phase 1, Lagos',
    image: '/images/client2.jpg',
    rating: 5,
    property: 'Rented a 3-bedroom apartment',
    text: 'I was relocating back from London with very little time to sort accommodation. Temi & Co. organised virtual tours, handled all the paperwork remotely and had my apartment ready before I landed. That level of service is rare anywhere in the world, let alone Nigeria.',
  },
  {
    id: 3,
    name: 'Babatunde Adeyemi',
    role: 'Property Investor',
    location: 'Ikoyi, Lagos',
    image: '/images/myimg1.jpg',
    rating: 5,
    property: 'Purchased 3 investment properties',
    text: 'As someone who has worked with many real estate agencies across Lagos, Temi & Co. stands in a different class entirely. Their market knowledge is unmatched and they genuinely care about finding you the right investment — not just closing a deal.',
  },
  {
    id: 4,
    name: 'Chidinma Eze',
    role: 'Medical Doctor',
    location: 'Maitama, Abuja',
    image: '/images/client3.jpg',
    rating: 5,
    property: 'Bought a 5-bedroom duplex',
    text: 'I never thought buying a home in Abuja could be stress-free. My agent at Temi & Co. walked me through every single step — from the inspection to the legal documentation. I felt informed and confident the entire time. My family is now settled in our dream home.',
  },
  {
    id: 5,
    name: 'Rotimi Fashola',
    role: 'Tech Entrepreneur',
    location: 'Asokoro, Abuja',
    image: '/images/client2.jpg',
    rating: 5,
    property: 'Short let — serviced apartment',
    text: 'I needed a high-quality short let in Abuja for a month-long project. Temi & Co. sorted everything within 24 hours. The apartment was exactly as described, fully serviced and in a perfect location. I have already referred four colleagues and will keep coming back.',
  },
  {
    id: 6,
    name: 'Ngozi Obi-Williams',
    role: 'Finance Director',
    location: 'Victoria Island, Lagos',
    image: '/images/client2.jpg',
    rating: 5,
    property: 'Rented commercial office space',
    text: 'Finding the right commercial space in VI felt impossible until I contacted Temi & Co. They presented us with five perfectly matched options within two days. We signed our lease within a week. The entire team is responsive, honest and genuinely invested in getting it right.',
  },
]

const StarRating = ({ count }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} className="w-4 h-4 fill-sand-400 text-sand-400" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
)

const Testimonials = () => {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)
  const sectionRef = useRef(null)
  const intervalRef = useRef(null)

  const goTo = (index) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setActive(index)
      setAnimating(false)
    }, 300)
  }

  const prev = () => goTo(active === 0 ? testimonials.length - 1 : active - 1)
  const next = () => goTo(active === testimonials.length - 1 ? 0 : active + 1)

  // Auto-advance every 6 seconds
  useEffect(() => {
    intervalRef.current = setInterval(next, 6000)
    return () => clearInterval(intervalRef.current)
  }, [active])

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const current = testimonials[active]

  return (
    <section className="py-24 px-6 bg-green-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div ref={sectionRef} className="reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="section-tag !text-sand-300">Client Stories</p>
            <h2 className="section-title !text-cream-100">
              What Our Clients<br />
              <em className="!text-sand-200">Say About Us</em>
            </h2>
          </div>
          {/* NAV ARROWS */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="w-12 h-12 border border-green-800 flex items-center justify-center text-cream-200 hover:border-sand-300 hover:text-sand-300 transition-all duration-300"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 border border-green-800 flex items-center justify-center text-cream-200 hover:border-sand-300 hover:text-sand-300 transition-all duration-300"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* MAIN TESTIMONIAL */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-5 gap-0 border border-green-800 transition-opacity duration-300 ${
            animating ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {/* LEFT — PERSON */}
          <div className="lg:col-span-2 bg-green-900 p-10 flex flex-col justify-between">
            <Quote size={40} className="text-sand-300 opacity-30 mb-8" />
            <div>
              <div className="flex items-center gap-5 mb-8">
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-sand-300"
                />
                <div>
                  <h4 className="font-display text-xl text-cream-100 leading-snug">
                    {current.name}
                  </h4>
                  <p className="text-xs text-sand-300 tracking-wider mt-1">
                    {current.role}
                  </p>
                  <p className="text-xs text-cream-200 opacity-40 mt-0.5">
                    {current.location}
                  </p>
                </div>
              </div>
              <StarRating count={current.rating} />
              <div className="mt-5 px-3 py-2 bg-green-950 border-l-2 border-sand-400 inline-block">
                <p className="text-[10px] tracking-[2px] uppercase text-sand-300">
                  {current.property}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — QUOTE */}
          <div className="lg:col-span-3 p-10 md:p-14 flex flex-col justify-center bg-green-950">
            <p className="font-display text-xl md:text-2xl text-cream-100 leading-relaxed italic font-light">
              "{current.text}"
            </p>
          </div>
        </div>

        {/* DOTS + MINI CARDS */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-8">

          {/* DOTS */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === active
                    ? 'w-8 h-2 bg-sand-300'
                    : 'w-2 h-2 bg-green-700 hover:bg-green-600'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* MINI PREVIEW CARDS */}
          <div className="hidden md:flex items-center gap-3">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => goTo(i)}
                className={`flex items-center gap-3 px-4 py-3 border transition-all duration-300 ${
                  i === active
                    ? 'border-sand-300 bg-green-900'
                    : 'border-green-800 hover:border-green-600'
                }`}
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="text-[11px] text-cream-100 font-body leading-none">
                    {t.name.split(' ')[0]}
                  </p>
                  <p className="text-[9px] text-sand-300 opacity-60 tracking-wider mt-0.5">
                    {t.role}
                  </p>
                </div>
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}

export default Testimonials