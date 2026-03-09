import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Eye, EyeOff } from 'lucide-react'

const AdminLogin = () => {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const { login }               = useAuth()
  const navigate                = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const user = await login(email, password)
      if (user.role === 'admin') {
        navigate('/admin/dashboard')
      } else {
        setError('You do not have admin access')
      }
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-green-950 flex items-center justify-center px-6 relative overflow-hidden">

      {/* BIG BACKGROUND TEXT */}
      <span
        className="absolute font-display text-green-900 select-none pointer-events-none"
        style={{ fontSize: 'clamp(120px, 20vw, 280px)', opacity: 0.15, lineHeight: 1 }}
      >
        ADMIN
      </span>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md bg-cream-50 p-10">

        {/* LOGO */}
        <div className="mb-10">
          <div className="flex flex-col leading-none mb-2">
            <span className="font-display font-bold text-2xl text-green-900">
              Temi & Co.
            </span>
            <span className="text-[10px] tracking-[3px] uppercase text-sand-400">
              Estates — Admin
            </span>
          </div>
          <p className="text-sm text-green-900 opacity-50 mt-4">
            Sign in to access your dashboard
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-[10px] tracking-[2px] uppercase text-sand-400 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@temiestates.com"
              className="w-full bg-white border border-sand-200 px-4 py-3 text-sm text-green-950 focus:outline-none focus:border-green-700 font-body transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] tracking-[2px] uppercase text-sand-400 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-sand-200 px-4 py-3 pr-12 text-sm text-green-950 focus:outline-none focus:border-green-700 font-body transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sand-400 hover:text-green-800 transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-3 mt-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-cream-100 border-t-transparent rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In to Dashboard'
            )}
          </button>
        </form>

      </div>
    </div>
  )
}

export default AdminLogin