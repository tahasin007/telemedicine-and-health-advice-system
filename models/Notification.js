const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var notificationSchema = mongoose.Schema({
  title:{
    type:String
  },
  description:{
    type:String
  },
  time : {
    type : Date,
    default: Date.now
  },
  category :{
    type:String
  },
  docId:{
    type: Schema.Types.ObjectId,
    ref:'users'
  },
  patientId:{
    type: Schema.Types.ObjectId,
    ref:'users'
  }
});


mongoose.model('notification', notificationSchema);
