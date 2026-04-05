const express = require('express');
const Donor   = require('../models/Donor');
const Request = require('../models/Request');
const { sendEmail } = require('../lib/email');
const auth    = require('../middleware/auth');
const router  = express.Router();

// REGISTER DONOR (protected — must be logged in)
router.post('/register', auth, async (req, res) => {
  try {
    const { name, dob, blood_type, phone, email, address, pin, history, any_surgery, do_center } = req.body;

    // Check 3-month cooldown
    const existing = await Donor.findOne({ $or: [{ phone }, { email }] });
    if (existing) {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      if (existing.lbd >= threeMonthsAgo) {
        const daysLeft = Math.ceil((existing.lbd - threeMonthsAgo) / (1000 * 60 * 60 * 24));
        return res.json({ status: 'error', message: `Not eligible. Please wait ${daysLeft} more days.` });
      }
      existing.lbd = new Date();
      await existing.save();
      return res.json({ status: 'success', message: 'Re-registered successfully.' });
    }

    await Donor.create({ name, dob, blood_type, phone, email, address, pin, history, any_surgery, do_center });

    // Notify any pending requests that match this donor
    const pending = await Request.find({ blood_type, pin, status: 'pending' });
    for (const request of pending) {
      await sendEmail(request.email, 'Blood Donor Match Found - AstraVita',
        `<h3>Hello ${request.name},</h3>
         <p>Great news! A new donor matching your recent request for <strong>${blood_type}</strong> blood has just registered in your area (PIN: ${pin}).</p>
         <div class="info-box">
           <h4 style="color:#A81B1B; margin:0 0 5px 0;">Donor Details:</h4>
           <p style="margin:2px 0; font-size:14px;"><strong>Donor Name:</strong> ${name}</p>
           <p style="margin:2px 0; font-size:14px;"><strong>Blood Type:</strong> ${blood_type}</p>
           <p style="margin:2px 0; font-size:14px;"><strong>Contact Phone:</strong> <a href="tel:${phone}" style="color:#A81B1B; font-weight:bold;">${phone}</a></p>
         </div>
         <p>You can now reach out to them directly. We hope this helps!</p>`
      );
      await Request.findByIdAndUpdate(request._id, { status: 'notified' });
    }

    res.json({ status: 'success', message: 'Registered as donor successfully!' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Server error during registration' });
  }
});

module.exports = router;
