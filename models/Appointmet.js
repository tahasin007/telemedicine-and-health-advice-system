const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AppointmentSchema = new Schema({
  scheduleId:{
    type: Schema.Types.ObjectId,
    ref:'schedule'
  },
  docId:{
    type: Schema.Types.ObjectId,
    ref:'users'
  },
  patientId:{
    type: Schema.Types.ObjectId,
    ref:'users'
  },
  appointmentType:{
    type: String,
  },
  appointmentDate:{
    type: Date
  },
  appointmentEnd:{
    type: Date
  },
  slotNo:{
    type: Number
  },
  status:{
    type: String
  }

});


mongoose.model('appointment', AppointmentSchema);