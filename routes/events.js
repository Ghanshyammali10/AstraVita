const express = require('express');
const Event   = require('../models/Event');
const router  = express.Router();

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ event_date: 1 });
    res.json({ status: 'success', events });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

// REGISTER an event — corrected to include all fields from process_event.php
router.post('/register', async (req, res) => {
  try {
    const {
      host_name, host_phone, host_email, host_address,
      event_name, event_date, start_time, end_time,
      event_venue, event_purpose
    } = req.body;

    // Check for duplicate event (same name + date + venue)
    const duplicate = await Event.findOne({ event_name, event_date, event_venue });
    if (duplicate)
      return res.status(400).json({ status: 'error', message: 'An event with the same name, date, and venue already exists.' });

    await Event.create({
      host_name, host_phone, host_email, host_address,
      event_name, event_date, start_time, end_time,
      event_venue, event_purpose
    });

    res.json({ status: 'success', message: 'Event registered successfully!' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

module.exports = router;
