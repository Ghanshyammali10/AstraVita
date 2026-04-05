const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  host_name:     { type: String, required: true },
  host_phone:    { type: String, required: true },
  host_email:    { type: String, required: true },
  host_address:  { type: String, required: true },
  event_name:    { type: String, required: true },
  event_date:    { type: Date,   required: true },
  start_time:    { type: String, required: true },
  end_time:      { type: String, required: true },
  event_venue:   { type: String, required: true },
  event_purpose: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
