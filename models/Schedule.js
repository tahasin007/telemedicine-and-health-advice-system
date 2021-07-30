const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ScheduleSchema = new Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },

  start: [{ type: String }],
  end: [{ type: String }],

  slot: [{ type: Array }],

  day: [{ type: Number }],
})

mongoose.model('schedule', ScheduleSchema)
