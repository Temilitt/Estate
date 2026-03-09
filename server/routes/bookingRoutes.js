const express = require('express')
const router  = express.Router()
const Booking = require('../models/Booking')
const { protect, adminOnly } = require('../middleware/authMiddleware')

// @route   POST /api/bookings
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { property, name, email, phone, date, message } = req.body

    const booking = await Booking.create({
      property:property|| undefined,
      name,
      email,
      phone,
      date,
      message,
    })

    res.status(201).json({
      success: true,
      message: 'Booking received. We will contact you within the hour.',
      booking,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @route   GET /api/bookings
// @access  Private/Admin
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('property', 'title location')
      .sort({ createdAt: -1 })
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @route   PUT /api/bookings/:id
// @access  Private/Admin
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' })
    }
    res.json(booking)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @route   DELETE /api/bookings/:id
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id)
    res.json({ message: 'Booking removed' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router