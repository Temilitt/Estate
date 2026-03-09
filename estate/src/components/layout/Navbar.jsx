import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const navLinks = [
    { label: 'Properties', path: '/listings' },
    { label: 'Buy',        path: '/listings?type=sale' },
    { label: 'Rent',       path: '/listings?type=rent' },
    { label: 'Contact',    path: '/contact' },
  ]

  const isActive = (path) => location.pathname === path.split('?')[0]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream-50 shadow-md py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex flex-col leading-none group">
          <span
            className={`font-display font-bold tracking-wide text-xl transition-colors duration-300 ${
              scrolled ? 'text-green-900' : 'text-green-900'
            }`}
          >
            Temi & Co.
          </span>
          <span className="text-[10px] tracking-[3px] uppercase text-sand-400 font-body">
            Estates
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link relative pb-1 ${
                isActive(link.path)
                  ? 'text-green-700 after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-green-700'
                  : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+2349016196558"
            className="flex items-center gap-2 text-xs text-green-800 hover:text-green-600 transition-colors"
          >
            <Phone size={14} />
            <span className="tracking-wider">+234 901 619 6558</span>
          </a>
          <Link to="/contact" className="btn-primary py-3 px-6 text-xs">
            Book Inspection
          </Link>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          className="md:hidden text-green-900 z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden fixed inset-0 bg-cream-50 z-40 flex flex-col justify-center items-center gap-10 transition-all duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="font-display text-3xl text-green-900 hover:text-green-600 transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <Link to="/contact" className="btn-primary mt-4">
          Book Inspection
        </Link>
        <a
          href="tel:+2349016196558"
          className="flex items-center gap-2 text-sm text-sand-400"
        >
          <Phone size={14} />
          +234 901 619 6558
        </a>
      </div>
    </header>
  )
}

export default Navbar