const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ContactSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  country: {
    type: String,
  },
  phone: {
    type: String,
  },
  message: {
    type: String,
  },
})

mongoose.model('contact', ContactSchema)
