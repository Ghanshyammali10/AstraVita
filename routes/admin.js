const express = require('express');
const Donor   = require('../models/Donor');
const Request = require('../models/Request');
const Event   = require('../models/Event');
const auth    = require('../middleware/auth');
const router  = express.Router();

// Admin-only guard middleware
function adminOnly(req, res, next) {
  if (req.user.role !== 'admin')
    return res.status(403).json({ status: 'error', message: 'Admins only' });
  next();
}

// GET /api/admin/stats — four dashboard counts
router.get('/stats', auth, adminOnly, async (req, res) => {
  try {
    const [donors, requests, matched, events] = await Promise.all([
      Donor.countDocuments(),
      Request.countDocuments(),
      Request.countDocuments({ status: 'notified' }),
      Event.countDocuments()
    ]);
    res.json({ status: 'success', donors, requests, matched, events });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

// GET /api/admin/donors — most recent 10 donors
router.get('/donors', auth, adminOnly, async (req, res) => {
  try {
    const donors = await Donor.find()
      .sort({ createdAt: -1 }).limit(10)
      .select('name blood_type lbd do_center');
    res.json({ status: 'success', donors });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

// GET /api/admin/requests — most recent 10 blood requests
router.get('/requests', auth, adminOnly, async (req, res) => {
  try {
    const requests = await Request.find()
      .sort({ createdAt: -1 }).limit(10)
      .select('name blood_type pin status createdAt');
    res.json({ status: 'success', requests });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

module.exports = router;
