const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var notificationSchema = mongoose.Schema({
  title:{
    type: String
  },
  description:{
    type: String
  },
  time : {
    type : Date,
    default: Date.now
  },
  category :{
    type: String
  },
  userId:{
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  videoId:{
    type: String
  },
  unread:{
    type: String,
    default: 'yes'
  }
});


mongoose.model('notification', notificationSchema);
