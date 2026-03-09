const marqueeItems = [
  'Luxury Homes',
  'Victoria Island',
  'Prime Investments',
  'Lekki Estates',
  'Commercial Spaces',
  'Maitama Abuja',
  'New Developments',
  'Short Lets',
  'Ikoyi Lagos',
  'Family Homes',
]

const Marquee = () => {
  return (
    <div className="bg-green-900 py-4 overflow-hidden flex">

      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1}
          className="flex items-center gap-0 shrink-0"
          style={{
            animation: 'marquee 25s linear infinite',
          }}
        >
          {marqueeItems.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-8 px-8"
            >
              <span className="text-cream-100 text-xs tracking-[4px] uppercase font-body whitespace-nowrap opacity-80">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-sand-300 opacity-60 shrink-0" />
            </li>
          ))}
        </ul>
      ))}

      {/* Marquee keyframe injected inline */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  )
}

export default Marquee