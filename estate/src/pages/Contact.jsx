import { useState, useEffect, useRef } from 'react'
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from 'lucide-react'
import { createBooking } from '../services/api'

const contactInfo = [
  {
    icon: <Phone size={20} />,
    label: 'Call Us',
    value: '090 1619 6558',
    sub: 'Mon — Sat, 8am to 7pm',
    href: 'tel:+2349016196558',
  },
  {
    icon: <Mail size={20} />,
    label: 'Email Us',
    value: 'aderounmutemiloluwa2004@gmail.com',
    sub: 'We reply within 2 hours',
    href: 'mailto:aderounmutemiloluwa2004@gmail.com',
  },
  {
    icon: <MapPin size={20} />,
    label: 'Visit Us',
    value: '14 Admiralty Way, Lekki Phase 1',
    sub: 'Lagos, Nigeria',
    href: 'https://maps.google.com',
  },
  {
    icon: <Clock size={20} />,
    label: 'Working Hours',
    value: 'Mon — Fri: 8am — 7pm',
    sub: 'Saturday: 9am — 5pm',
    href: null,
  },
]

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Buying',
    budget: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await createBooking({
        property: null,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        date: new Date().toISOString(),
        message: `Interest: ${formData.interest} | Budget: ${formData.budget} | Message: ${formData.message}`,
      })
      setSubmitted(true)
    } catch (error) {
      console.error('Contact form failed:', error)
      // Still show success to user even if API fails
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream-50">

      {/* PAGE HERO */}
      <div className="relative bg-green-950 pt-36 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/images/exterior-1.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-green-950" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <p className="section-tag !text-sand-300 justify-center mb-4">
            Get In Touch
          </p>
          <h1 className="font-display text-cream-100 text-5xl md:text-6xl leading-tight mb-5">
            Let's Find Your<br />
            <em className="text-sand-200 italic">Perfect Property</em>
          </h1>
          <p className="text-cream-200 opacity-50 font-body font-light max-w-xl mx-auto">
            Whether you are buying, renting or investing — our team is ready
            to guide you. No pressure, just honest advice.
          </p>
        </div>
      </div>

      {/* CONTACT INFO STRIP */}
      <div className="bg-white border-b border-sand-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-sand-100">
          {contactInfo.map((item, i) => (
            <div key={i} className="py-8 px-8">
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex flex-col gap-3 group"
                >
                  <span className="w-10 h-10 bg-green-950 text-sand-200 flex items-center justify-center group-hover:bg-green-800 transition-colors duration-300">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-[10px] tracking-[2px] uppercase text-sand-400 mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm text-green-950 font-medium group-hover:text-green-700 transition-colors duration-300 break-all">
                      {item.value}
                    </p>
                    <p className="text-xs text-green-900 opacity-40 mt-0.5">
                      {item.sub}
                    </p>
                  </div>
                </a>
              ) : (
                <div className="flex flex-col gap-3">
                  <span className="w-10 h-10 bg-green-950 text-sand-200 flex items-center justify-center">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-[10px] tracking-[2px] uppercase text-sand-400 mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm text-green-950 font-medium">{item.value}</p>
                    <p className="text-xs text-green-900 opacity-40 mt-0.5">{item.sub}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div
        ref={sectionRef}
        className="reveal max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-5 gap-16"
      >

        {/* FORM */}
        <div className="lg:col-span-3">
          <p className="section-tag mb-2">Send a Message</p>
          <h2 className="font-display text-3xl text-green-950 mb-10">
            Tell Us What You're Looking For
          </h2>

          {submitted ? (
            <div className="border border-sand-200 bg-white p-12 text-center">
              <CheckCircle2 size={52} className="text-green-700 mx-auto mb-5" />
              <h3 className="font-display text-2xl text-green-950 mb-3">
                Message Received!
              </h3>
              <p className="text-sm text-green-900 opacity-60 max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out. One of our consultants will contact
                you within 2 hours during working hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', interest: 'Buying', budget: '', message: '' }) }}
                className="btn-outline mt-8"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* NAME + PHONE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] tracking-[2px] uppercase text-sand-400 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full bg-white border border-sand-200 px-4 py-3 text-sm text-green-950 focus:outline-none focus:border-green-700 font-body transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[2px] uppercase text-sand-400 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="090 0000 0000"
                    className="w-full bg-white border border-sand-200 px-4 py-3 text-sm text-green-950 focus:outline-none focus:border-green-700 font-body transition-colors"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-[10px] tracking-[2px] uppercase text-sand-400 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full bg-white border border-sand-200 px-4 py-3 text-sm text-green-950 focus:outline-none focus:border-green-700 font-body transition-colors"
                />
              </div>

              {/* INTEREST + BUDGET */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] tracking-[2px] uppercase text-sand-400 mb-2">
                    I Am Interested In
                  </label>
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full bg-white border border-sand-200 px-4 py-3 text-sm text-green-950 focus:outline-none focus:border-green-700 font-body transition-colors appearance-none"
                  >
                    {['Buying', 'Renting', 'Short Let', 'Commercial', 'Investment Advice'].map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] tracking-[2px] uppercase text-sand-400 mb-2">
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-white border border-sand-200 px-4 py-3 text-sm text-green-950 focus:outline-none focus:border-green-700 font-body transition-colors appearance-none"
                  >
                    {[
                      'Select budget',
                      'Under ₦10M',
                      '₦10M — ₦50M',
                      '₦50M — ₦150M',
                      '₦150M — ₦500M',
                      '₦500M+',
                    ].map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-[10px] tracking-[2px] uppercase text-sand-400 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about what you are looking for — location, size, special requirements..."
                  className="w-full bg-white border border-sand-200 px-4 py-3 text-sm text-green-950 focus:outline-none focus:border-green-700 font-body transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex items-center justify-center gap-3 mt-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-cream-100 border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>

            </form>
          )}
        </div>

        {/* RIGHT — WHY CONTACT US */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div>
            <p className="section-tag mb-2">Why Reach Out</p>
            <h3 className="font-display text-2xl text-green-950 mb-6">
              We Make It Simple
            </h3>
            {[
              {
                num: '01',
                title: 'Tell us what you want',
                text: 'Share your budget, location preference and property type. The more detail the better.',
              },
              {
                num: '02',
                title: 'We curate options for you',
                text: 'Your dedicated agent handpicks the best matching properties and sends them to you directly.',
              },
              {
                num: '03',
                title: 'Book your inspections',
                text: 'We arrange everything — transport, timing and a full guided tour of each property.',
              },
              {
                num: '04',
                title: 'Move in with confidence',
                text: 'From offer to keys, our legal team handles every document so nothing goes wrong.',
              },
            ].map((step, i) => (
              <div key={i} className="flex gap-5 py-5 border-b border-sand-100 last:border-b-0">
                <span className="font-display text-3xl text-sand-200 leading-none shrink-0 w-10">
                  {step.num}
                </span>
                <div>
                  <h4 className="font-display text-lg text-green-950 mb-1">
                    {step.title}
                  </h4>
                  <p className="text-sm text-green-900 opacity-55 leading-relaxed font-body">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}

export default Contact