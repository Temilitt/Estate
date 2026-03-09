import { useEffect, useRef } from 'react'
import { ShieldCheck, CalendarCheck, TrendingUp, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

const features = [
  {
    icon: <ShieldCheck size={22} />,
    title: 'Verified Listings Only',
    text: 'Every property is physically inspected and legally vetted by our team before it appears on our platform. Zero fraud, zero stress.',
  },
  {
    icon: <CalendarCheck size={22} />,
    title: 'Seamless Inspection Booking',
    text: 'Book property viewings online in 60 seconds. Our agents confirm within the hour and guide you through every step.',
  },
  {
    icon: <TrendingUp size={22} />,
    title: 'Smart Investment Advice',
    text: 'Our experts help you identify high-yield properties and growth areas across Lagos and Abuja before the market catches up.',
  },
  {
    icon: <Users size={22} />,
    title: 'Dedicated Personal Agent',
    text: 'You get one agent who knows your needs, your budget and your timeline — no being passed around, no confusion.',
  },
]

const WhyUs = () => {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15 }
    )

    if (leftRef.current) observer.observe(leftRef.current)
    if (rightRef.current) observer.observe(rightRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 px-6 bg-cream-100" ref={sectionRef}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT — IMAGE BLOCK */}
        <div ref={leftRef} className="reveal relative">

          {/* MAIN IMAGE */}
          <div className="relative">
            {/* Replace with your agent-1.jpg or exterior image */}
            <img
              src="/images/myimg1.jpg"
              alt="Temi and Co. Agent"
              className="w-full h-[580px] object-cover"
            />
            {/* Green overlay strip on left edge */}
            <div className="absolute top-0 left-0 w-2 h-full bg-green-800" />
          </div>

          {/* ACCENT IMAGE */}
          <div className="absolute -bottom-10 -right-6 w-52 h-64 hidden lg:block">
            {/* Replace with interior-1.jpg */}
            <img
              src="/images/interior.jpg"
              alt="Luxury interior"
              className="w-full h-full object-cover border-4 border-cream-100 shadow-2xl"
            />
          </div>

          {/* FLOATING BADGE */}
          <div className="absolute top-10 -right-6 bg-green-900 text-cream-100 px-6 py-5 hidden lg:block shadow-xl">
            <span className="font-display text-4xl text-sand-200 block leading-none">
              12+
            </span>
            <span className="text-[10px] tracking-[2px] uppercase text-cream-200 opacity-60 mt-1 block">
              Years of<br />Excellence
            </span>
          </div>

        </div>

        {/* RIGHT — CONTENT */}
        <div ref={rightRef} className="reveal">

          <p className="section-tag">Why Choose Us</p>
          <h2 className="section-title mb-6">
            We Don't Just Sell<br />
            <em>Properties</em>
          </h2>
          <p className="text-green-900 opacity-60 text-base leading-relaxed mb-12 font-body font-light max-w-lg">
            We build relationships. Buying or renting a property is one of the
            biggest decisions of your life — our team takes that seriously and
            walks with you every step of the way.
          </p>

          {/* FEATURES */}
          <div className="flex flex-col gap-0 divide-y divide-sand-200">
            {features.map((feat, i) => (
              <div
                key={i}
                className="flex items-start gap-5 py-6 group"
              >
                {/* ICON */}
                <div className="w-12 h-12 bg-green-950 text-sand-200 flex items-center justify-center shrink-0 group-hover:bg-green-800 transition-colors duration-300">
                  {feat.icon}
                </div>
                <div>
                  <h4 className="font-display text-lg text-green-950 mb-1 group-hover:text-green-700 transition-colors duration-300">
                    {feat.title}
                  </h4>
                  <p className="text-sm text-green-900 opacity-55 leading-relaxed font-body">
                    {feat.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link to="/contact" className="btn-primary mt-10 inline-flex items-center gap-3">
            Talk to an Agent
          </Link>

        </div>

      </div>
    </section>
  )
}

export default WhyUs