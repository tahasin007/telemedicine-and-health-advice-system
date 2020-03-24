const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ReportSchema = new Schema({
  aptId:{
    type: Schema.Types.ObjectId,
    ref:'appointment'
  },
  docId:{
    type: Schema.Types.ObjectId,
    ref:'users'
  },
  patientId:{
    type: Schema.Types.ObjectId,
    ref:'users'
  },
  symptom:{
    type:String
  },
  medication :{
    type:String
  },
  observation :{
    type:String 
  }
});


mongoose.model('report', ReportSchema);