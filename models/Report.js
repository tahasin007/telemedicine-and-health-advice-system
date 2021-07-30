const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ReportSchema = new Schema({
  aptId: { type: Schema.Types.ObjectId, ref: 'appointment' },
  docId: { type: Schema.Types.ObjectId, ref: 'users' },
  patientId: { type: Schema.Types.ObjectId, ref: 'users' },
  disease: { type: String },
  symptom: [{ type: String }],
  date: { type: String },
  symptomDetails: [{ type: String }],
  medicine_name: [{ type: String }],
  daily_dose: [{ type: String }],
  description: [{ type: String }],
  observation: { type: String },
  pdf: { type: String },
})

mongoose.model('report', ReportSchema)
