
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  is_success: {
    type: Boolean,
    required: true
  },
  user_id: {
    type: String,
    default: 'john_doe_17091999',
    required: true
  },
  email: {
    type: String,
    default: 'john@xyz.com',
    required: true
  },
  roll_number: {
    type: String,
    default: 'ABCD123',
    required: true
  },
  numbers: {
    type: [String], 
    default: []
  },
  alphabets: {
    type: [String], 
    default: []
  },
  highest_lowercase_alphabet: {
    type: [String], 
    default: []
  }
});

const DataModel = mongoose.model('Data', dataSchema);

module.exports = DataModel;
