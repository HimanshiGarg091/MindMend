const mongoose = require('mongoose');

const TherapistSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  license: String,
  expertise: [String],
  years: Number,
  institution: String,
  credentialsUrl: String,
});

module.exports = mongoose.model('Therapist', TherapistSchema);
