const express  = require('express')
const router   = express.Router()
const Property = require('../models/Property')
const { protect, adminOnly } = require('../middleware/authMiddleware')

// @route   GET /api/properties
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { status, type, location, minPrice, maxPrice, featured } = req.query

    let filter = {}

    if (status)   filter.status = status
    if (type)     filter.type = type
    if (featured) filter.isFeatured = true
    if (location) filter.location = { $regex: location, $options: 'i' }
    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }

    const properties = await Property.find(filter).sort({ createdAt: -1 })
    res.json(properties)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @route   GET /api/properties/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
    if (!property) {
      return res.status(404).json({ message: 'Property not found' })
    }
    res.json(property)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @route   POST /api/properties
// @access  Private/Admin
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const property = await Property.create(req.body)
    res.status(201).json(property)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @route   PUT /api/properties/:id
// @access  Private/Admin
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!property) {
      return res.status(404).json({ message: 'Property not found' })
    }
    res.json(property)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @route   DELETE /api/properties/:id
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id)
    if (!property) {
      return res.status(404).json({ message: 'Property not found' })
    }
    res.json({ message: 'Property removed' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router