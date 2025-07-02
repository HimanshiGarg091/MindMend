const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // unique added
  password: { type: String, required: true },
  age: { type: Number, required: true },
  preferredLanguage: { type: String, required: true }, // should match your API request
  concerns: { type: [String], required: true },
  communicationMode: { type: String, required: true } // consistent with API request
});

module.exports = mongoose.model('Client', ClientSchema);
