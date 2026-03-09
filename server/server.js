const express = require('express')
const dotenv  = require('dotenv')
const cors    = require('cors')
const connectDB = require('./config/db')

// Load env vars
dotenv.config()

// Connect to database
connectDB()

const app = express()

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api/auth',       require('./routes/authRoutes'))
app.use('/api/properties', require('./routes/propertyRoutes'))
app.use('/api/bookings',   require('./routes/bookingRoutes'))

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Temi & Co. Estates API is running' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: err.message || 'Server Error' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})