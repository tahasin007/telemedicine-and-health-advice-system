const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({
  userName: { type: String },
  name: { type: String },
  gender: { type: String },
  email: { type: String },
  contact: { type: String },
  password: { type: String },
  role: { type: String },
  education: { type: String },
  experience: { type: String },
  degree: { type: String },
  chamber: { type: String },
  dob: { type: Date },
  nationality: { type: String },
  speciality: { type: String },
  address: { type: String },
  status: { type: String },
  // _id:{
  //   type: Schema.Types.ObjectId
  // },
  gender: { type: String },
  profileImage: { type: String },
  sentRequest: [
    {
      userId: { type: Schema.Types.ObjectId, ref: 'users' },
      userName: { type: String, default: '' },
    },
  ],
  request: [
    {
      userId: { type: Schema.Types.ObjectId, ref: 'users' },
      userName: { type: String, default: '' },
    },
  ],
  friendList: [
    {
      friendId: { type: Schema.Types.ObjectId, ref: 'users' },
      friendName: { type: String, default: '' },
    },
  ],
  totalRequest: { type: Number, default: 0 },
  time: {
    type: Date,
    default: Date.now,
  },
  // google:{type: String,default:''},
  // googleTokens:{type:String,default:''}
})

mongoose.model('users', UserSchema)
