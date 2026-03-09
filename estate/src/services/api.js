import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
})

// Automatically attach token to every request if logged in
API.interceptors.request.use((config) => {
  const user = localStorage.getItem('user')
  if (user) {
    const parsed = JSON.parse(user)
    if (parsed.token) {
      config.headers.Authorization = `Bearer ${parsed.token}`
    }
  }
  return config
})

// PROPERTIES
export const getProperties  = (params) => API.get('/properties', { params })
export const getProperty    = (id)     => API.get(`/properties/${id}`)
export const createProperty = (data)   => API.post('/properties', data)
export const updateProperty = (id, data) => API.put(`/properties/${id}`, data)
export const deleteProperty = (id)     => API.delete(`/properties/${id}`)

// AUTH
export const register = (data) => API.post('/auth/register', data)
export const login    = (data) => API.post('/auth/login', data)
export const getMe    = ()     => API.get('/auth/me')

// BOOKINGS
export const createBooking = (data) => API.post('/bookings', data)
export const getBookings   = ()     => API.get('/bookings')
export const updateBooking = (id, data) => API.put(`/bookings/${id}`, data)
export const deleteBooking = (id)   => API.delete(`/bookings/${id}`)