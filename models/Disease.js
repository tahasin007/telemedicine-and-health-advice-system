const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const DiseaseSchema = new Schema({
  name:{
    type: String,
  },
  symptom:[
    {type: String}
  ],
  // probability:{
  // 	type:Number
  // },
  treatment:{
  	type:String
  },
  docType:{
    type:String
  }
});


mongoose.model('disease', DiseaseSchema);