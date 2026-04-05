const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  email:      { type: String, required: true },
  blood_type: { type: String, required: true },
  pin:        { type: String, required: true },
  status:     { type: String, default: 'pending' }, // 'pending' or 'notified'
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
