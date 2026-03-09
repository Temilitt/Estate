import { createContext, useContext, useState, useEffect } from 'react'
import { login as loginAPI, register as registerAPI } from '../services/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored))
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const { data } = await loginAPI({ email, password })
    setUser(data)
    localStorage.setItem('user', JSON.stringify(data))
    return data
  }

  const register = async (name, email, password, phone) => {
    const { data } = await registerAPI({ name, email, password, phone })
    setUser(data)
    localStorage.setItem('user', JSON.stringify(data))
    return data
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)