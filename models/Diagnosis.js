const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const DiagnosisSchema = new Schema({
  diseaseId:{
    type: Schema.Types.ObjectId,
    ref:'disease'
  },
  patientId:{
    type: Schema.Types.ObjectId,
    ref:'users'
  },
  probability:{
    type : Number
  },
  diagnosisDate: {
    type: Date,
    default: Date.now
  }
});


mongoose.model('diagnosis', DiagnosisSchema);