const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  userName:{
    type: String
  },
  name:{
    type: String
  },
  gender:{
    type: String
  },
  email:{
    type: String
  },
  contact:{
    type: String
  },
  password:{
    type:String
  },
  role:{
    type: String
  },
  education:{
    type: String
  },
  experience:{
    type: String
  },
  degree:{
    type: String
  },
  chamber:{
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
  dob:{
    type: Date,
  },
  nationality:{
    type: String
  },
  speciality:{
    type: String
  },
  address:{
    type: String
  },
  _id:{
    type: Schema.Types.ObjectId
  },
  gender:{
    type: String
  }
});


mongoose.model('users', UserSchema);