import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const quickLinks = [
        { label: 'Properties For Sale', path: '/listings?type=sale' },
        { label: 'Properties For Rent', path: '/listings?type=rent' },
        { label: 'New Developments', path: '/listings?type=new' },
        { label: 'Short Lets', path: '/listings?type=shortlet' },
        { label: 'Commercial Spaces', path: '/listings?type=commercial' },
    ]

    const locations = [
        'Victoria Island, Lagos',
        'Lekki Phase 1, Lagos',
        'Ikoyi, Lagos',
        'Maitama, Abuja',
        'Asokoro, Abuja',
        'Port Harcourt',
    ]

    return (
        <footer className="bg-green-950 text-cream-200">

            {/* TOP STRIP */}
            <div className="border-b border-green-900 py-10 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <p className="section-tag !text-sand-300 !mb-1">Ready to find your home?</p>
                        <h3 className="font-display text-2xl md:text-3xl text-cream-100">
                            Let's Talk — We Respond Within the Hour
                        </h3>
                    </div>
                    <Link
                        to="/contact"
                        className="btn-sand shrink-0"
                    >
                        Book Free Consultation
                    </Link>
                </div>
            </div>

            {/* MAIN FOOTER */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                {/* BRAND */}
                <div className="lg:col-span-1">
                    <Link to="/" className="flex flex-col leading-none mb-6">
                        <span className="font-display font-bold text-2xl text-cream-100">
                            Temi & Co.
                        </span>
                        <span className="text-[10px] tracking-[3px] uppercase text-sand-300 font-body">
                            Estates
                        </span>
                    </Link>
                    <p className="text-sm text-cream-200 opacity-60 leading-relaxed mb-8 max-w-xs">
                        Where fine living begins. Connecting families and professionals with exceptional properties across Nigeria since 2012.
                    </p>

                    {/* SOCIALS */}
                    <div className="flex items-center gap-3">
                        {[
                            { icon: <Instagram size={15} />, href: 'https://instagram.com/temilit' },
                            { icon: <Facebook size={15} />, href: 'https://facebook.com/yourhandle' },
                            { icon: <Twitter size={15} />, href: 'https://x.com/justtemilit' },
                            { icon: <Linkedin size={15} />, href: 'https://linkedin.com/in/Temiloluwa Adeboye' },
                        ].map((s, i) => (
                            <a
                                key={i}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 border border-green-800 flex items-center justify-center text-cream-200 opacity-60 hover:opacity-100 hover:border-sand-300 hover:text-sand-300 transition-all duration-300"
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* QUICK LINKS */}
                <div>
                    <h4 className="text-[11px] tracking-[3px] uppercase text-sand-300 mb-6">
                        Properties
                    </h4>
                    <ul className="flex flex-col gap-3">
                        {quickLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className="text-sm text-cream-200 opacity-60 hover:opacity-100 hover:text-sand-200 transition-all duration-300 flex items-center gap-2 group"
                                >
                                    <span className="w-4 h-px bg-sand-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* LOCATIONS */}
                <div>
                    <h4 className="text-[11px] tracking-[3px] uppercase text-sand-300 mb-6">
                        Locations
                    </h4>
                    <ul className="flex flex-col gap-3">
                        {locations.map((loc) => (
                            <li
                                key={loc}
                                className="text-sm text-cream-200 opacity-60 flex items-center gap-2"
                            >
                                <MapPin size={12} className="text-sand-300 shrink-0" />
                                {loc}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* CONTACT */}
                <div>
                    <h4 className="text-[11px] tracking-[3px] uppercase text-sand-300 mb-6">
                        Get In Touch
                    </h4>
                    <ul className="flex flex-col gap-5">
                        <li>
                            <a
                                href="tel:+2349016196558"
                                className="flex items-start gap-3 group"
                            >
                                <Phone size={15} className="text-sand-300 mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-[10px] tracking-[2px] uppercase text-sand-400 mb-1">Call Us</p>
                                    <p className="text-sm text-cream-100 group-hover:text-sand-200 transition-colors">
                                        090 1619 6558
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a
                                href="mailto:aderounmutemiloluwa2004@gmail.com"
                                className="flex items-start gap-3 group"
                            >
                                <Mail size={15} className="text-sand-300 mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-[10px] tracking-[2px] uppercase text-sand-400 mb-1">Email Us</p>
                                    <p className="text-sm text-cream-100 group-hover:text-sand-200 transition-colors break-all">
                                        aderounmutemiloluwa2004@gmail.com
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li className="flex items-start gap-3">
                            <MapPin size={15} className="text-sand-300 mt-0.5 shrink-0" />
                            <div>
                                <p className="text-[10px] tracking-[2px] uppercase text-sand-400 mb-1">Office</p>
                                <p className="text-sm text-cream-100 opacity-80 leading-relaxed">
                                    14 Admiralty Way,<br />
                                    Lekki Phase 1, Lagos
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>

            {/* BOTTOM BAR */}
            <div className="border-t border-green-900 py-6 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-cream-200 opacity-40">
                        © {currentYear} Temi & Co. Estates. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="text-xs text-cream-200 opacity-40 hover:opacity-80 transition-opacity"
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

        </footer>
    )
}

export default Footer