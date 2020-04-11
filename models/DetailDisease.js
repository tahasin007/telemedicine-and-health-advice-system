const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const DetailDiseaseSchema = new Schema({
  diseaseName:{type: String},
  overview:{type: String},
  symptoms:[{type:String}]
});


mongoose.model('detaildisease', DetailDiseaseSchema);