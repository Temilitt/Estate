const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
    status: {
      type: String,
      enum: ['sale', 'rent', 'shortlet'],
      required: true,
    },
    type: {
      type: String,
      required: [true, 'Please add a property type'],
    },
    location: {
      type: String,
      required: [true, 'Please add a location'],
    },
    bedrooms:  { type: Number, default: null },
    bathrooms: { type: Number, default: null },
    size:      { type: String, default: null },
    yearBuilt: { type: Number, default: null },
    parking:   { type: Number, default: null },
    features:  [{ type: String }],
    images:    [{ type: String }],
    tag: {
      type: String,
      enum: ['Featured', 'New', 'Premium', null],
      default: null,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    agent: {
      name:  { type: String },
      email: { type: String },
      phone: { type: String },
      image: { type: String },
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Property', propertySchema)