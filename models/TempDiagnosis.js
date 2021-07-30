const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const TempDiagnosisSchema = new Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  matching: [
    {
      diseaseName: { type: String },
      matchPercent: { type: Number },
      docType: { type: String },
    },
  ],
  symptoms: [
    {
      type: String,
    },
  ],
  diagnosisDate: {
    type: Date,
    default: Date.now,
  },
})

mongoose.model('tempDiagnosis', TempDiagnosisSchema)
