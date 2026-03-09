import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import PropertyCard from '../components/ui/PropertyCard'
import { getProperties } from '../services/api'

const statusTabs = [
  { label: 'All',       value: 'all' },
  { label: 'For Sale',  value: 'sale' },
  { label: 'For Rent',  value: 'rent' },
  { label: 'Short Let', value: 'shortlet' },
]

const locationOptions = [
  'All Locations',
  'Lagos — Victoria Island',
  'Lagos — Lekki',
  'Lagos — Ikoyi',
  'Lagos — Oniru',
  'Lagos — Banana Island',
  'Lagos — Eko Atlantic',
  'Abuja — Maitama',
  'Abuja — Asokoro',
  'Abuja — Wuse II',
  'Abuja — Gwarinpa',
  'Abuja — Jabi',
]

const typeOptions = [
  'All Types',
  'Apartment',
  'Duplex',
  'Penthouse',
  'Villa',
  'Mansion',
  'Terrace',
  'Commercial',
  'Studio',
]

const budgetOptions = [
  { label: 'Any Budget',    min: 0,         max: Infinity },
  { label: 'Under ₦10M',   min: 0,         max: 10000000 },
  { label: '₦10M — ₦50M',  min: 10000000,  max: 50000000 },
  { label: '₦50M — ₦150M', min: 50000000,  max: 150000000 },
  { label: '₦150M — ₦500M',min: 150000000, max: 500000000 },
  { label: '₦500M+',       min: 500000000, max: Infinity },
]

const sortOptions = [
  { label: 'Newest First',      value: 'newest' },
  { label: 'Price: Low — High', value: 'price_asc' },
  { label: 'Price: High — Low', value: 'price_desc' },
]

const SelectField = ({ label, options, value, onChange }) => (
  <div className="relative">
    <label className="block text-[10px] tracking-[2px] uppercase text-sand-400 mb-2">
      {label}
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-cream-50 border border-sand-200 text-green-950 text-sm px-4 py-3 pr-10 focus:outline-none focus:border-green-700 font-body transition-colors duration-200"
      >
        {options.map((opt) => (
          <option
            key={typeof opt === 'string' ? opt : opt.label}
            value={typeof opt === 'string' ? opt : opt.label}
          >
            {typeof opt === 'string' ? opt : opt.label}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-sand-400 pointer-events-none" />
    </div>
  </div>
)

const Listings = () => {
  const [searchParams]                    = useSearchParams()
  const [activeTab, setActiveTab]         = useState(searchParams.get('type') || 'all')
  const [location, setLocation]           = useState('All Locations')
  const [propType, setPropType]           = useState('All Types')
  const [budget, setBudget]               = useState('Any Budget')
  const [sort, setSort]                   = useState('newest')
  const [search, setSearch]               = useState('')
  const [showFilters, setShowFilters]     = useState(false)
  const [allProperties, setAllProperties] = useState([])
  const [filtered, setFiltered]           = useState([])
  const [loading, setLoading]             = useState(true)

  // Fetch all properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data } = await getProperties()
        setAllProperties(data)
        setFiltered(data)
      } catch (error) {
        console.error('Failed to fetch properties:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProperties()
  }, [])

  // Filter logic
  useEffect(() => {
    let results = [...allProperties]

    if (activeTab !== 'all') {
      results = results.filter((p) => p.status === activeTab)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q)
      )
    }

    if (location !== 'All Locations') {
      const locQuery = location.split('— ')[1]?.toLowerCase() || ''
      results = results.filter((p) =>
        p.location.toLowerCase().includes(locQuery)
      )
    }

    if (propType !== 'All Types') {
      results = results.filter((p) => p.type === propType)
    }

    const budgetObj = budgetOptions.find((b) => b.label === budget)
    if (budgetObj && budgetObj.min > 0) {
      results = results.filter(
        (p) => p.price >= budgetObj.min && p.price <= budgetObj.max
      )
    }

    if (sort === 'price_asc')  results.sort((a, b) => a.price - b.price)
    if (sort === 'price_desc') results.sort((a, b) => b.price - a.price)

    setFiltered(results)
  }, [activeTab, search, location, propType, budget, sort, allProperties])

  const clearFilters = () => {
    setActiveTab('all')
    setLocation('All Locations')
    setPropType('All Types')
    setBudget('Any Budget')
    setSearch('')
    setSort('newest')
  }

  const hasFilters =
    activeTab !== 'all' ||
    location !== 'All Locations' ||
    propType !== 'All Types' ||
    budget !== 'Any Budget' ||
    search.trim() !== ''

  return (
    <div className="min-h-screen bg-cream-50">

      {/* PAGE HERO */}
      <div className="relative bg-green-950 pt-36 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/exterior-3.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-green-950 opacity-70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <p className="section-tag !text-sand-300 mb-3">Our Portfolio</p>
          <h1 className="font-display text-cream-100 text-5xl md:text-6xl leading-tight mb-4">
            All Properties
          </h1>
          <p className="text-cream-200 opacity-50 font-body font-light">
            {loading ? 'Loading...' : `${filtered.length} properties available across Lagos & Abuja`}
          </p>
        </div>
      </div>

      {/* TABS */}
      <div className="bg-white border-b border-sand-100 sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center">
            {statusTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-6 py-5 text-xs tracking-[2px] uppercase font-body transition-all duration-300 border-b-2 ${
                  activeTab === tab.value
                    ? 'border-green-800 text-green-800 font-medium'
                    : 'border-transparent text-green-900 opacity-50 hover:opacity-80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 text-xs tracking-[2px] uppercase py-5 transition-colors duration-300 ${
              showFilters ? 'text-green-800' : 'text-green-900 opacity-50 hover:opacity-80'
            }`}
          >
            <SlidersHorizontal size={14} />
            Filters
            {hasFilters && (
              <span className="w-2 h-2 rounded-full bg-sand-400 ml-1" />
            )}
          </button>
        </div>
      </div>

      {/* FILTER PANEL */}
      <div
        className={`bg-white border-b border-sand-100 overflow-hidden transition-all duration-500 ${
          showFilters ? 'max-h-96 py-6' : 'max-h-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
            <div className="lg:col-span-1">
              <label className="block text-[10px] tracking-[2px] uppercase text-sand-400 mb-2">
                Search
              </label>
              <input
                type="text"
                placeholder="Location, type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-cream-50 border border-sand-200 text-green-950 text-sm px-4 py-3 focus:outline-none focus:border-green-700 font-body transition-colors duration-200"
              />
            </div>
            <SelectField label="Location"      options={locationOptions} value={location}  onChange={setLocation} />
            <SelectField label="Property Type" options={typeOptions}     value={propType}  onChange={setPropType} />
            <SelectField label="Budget"        options={budgetOptions}   value={budget}    onChange={setBudget} />
            <SelectField label="Sort By"       options={sortOptions}     value={sort}      onChange={setSort} />
          </div>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="mt-5 flex items-center gap-2 text-xs text-sand-400 hover:text-green-800 transition-colors duration-300 tracking-wider uppercase"
            >
              <X size={13} />
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* RESULTS */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <p className="text-sm text-green-900 opacity-50 font-body">
            Showing{' '}
            <span className="text-green-800 font-medium opacity-100">
              {filtered.length}
            </span>{' '}
            properties
          </p>
        </div>

        {/* LOADING SKELETONS */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="bg-sand-100 animate-pulse h-80" />
            ))}
          </div>
        )}

        {/* GRID */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((property, i) => (
              <div
                key={property._id}
                style={{
                  opacity: 0,
                  transform: 'translateY(30px)',
                  animation: `fadeUp 0.6s ease ${i * 80}ms forwards`,
                }}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-28">
            <p className="font-display text-4xl text-green-950 opacity-20 mb-4">
              No properties found
            </p>
            <p className="text-sm text-green-900 opacity-40 mb-8">
              Try adjusting your filters or search terms
            </p>
            <button onClick={clearFilters} className="btn-outline">
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  )
}

export default Listings