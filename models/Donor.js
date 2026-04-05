const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  dob:         { type: Date,   required: true },
  blood_type:  { type: String, required: true },
  phone:       { type: String, required: true },
  email:       { type: String, required: true, lowercase: true },
  address:     { type: String, required: true },
  pin:         { type: String, required: true },
  history:     { type: String, default: '' },
  // NOTE: 'medication' was collected by the old form but never saved to the DB —
  // confirmed bug in the original PHP. Field intentionally omitted here.
  // The medication input has been removed from donor.html as well.
  any_surgery: { type: String, default: '' },
  do_center:   { type: String, required: true },
  lbd:         { type: Date,   default: Date.now }, // last blood donation date
}, { timestamps: true });

module.exports = mongoose.model('Donor', donorSchema);
