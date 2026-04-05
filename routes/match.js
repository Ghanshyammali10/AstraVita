const express = require('express');
const Donor   = require('../models/Donor');
const Request = require('../models/Request');
const auth    = require('../middleware/auth');
const { sendEmail } = require('../lib/email');
const router  = express.Router();

// Blood compatibility map
const compatible = {
  'O-':  ['O-'],
  'O+':  ['O-', 'O+'],
  'A-':  ['O-', 'A-'],
  'A+':  ['O-', 'O+', 'A-', 'A+'],
  'B-':  ['O-', 'B-'],
  'B+':  ['O-', 'O+', 'B-', 'B+'],
  'AB-': ['O-', 'A-', 'B-', 'AB-'],
  'AB+': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
};

router.post('/find', auth, async (req, res) => {
  try {
    const { name, email, blood_type, pin } = req.body;
    const acceptableTypes = compatible[blood_type] || [blood_type];

    const donors = await Donor.find({
      blood_type: { $in: acceptableTypes }, pin
    }).select('name email blood_type pin address phone -_id');

    if (donors.length > 0) {
      // Build detailed HTML list of matching donors
      const donorList = donors.map(d => `
        <div style="border-bottom:1px solid #fee2e2; padding:12px 0; margin-bottom:10px;">
          <h4 style="color:#A81B1B; margin:0 0 5px 0;">${d.name}</h4>
          <p style="margin:2px 0; font-size:14px;"><strong>Blood Type:</strong> ${d.blood_type}</p>
          <p style="margin:2px 0; font-size:14px;"><strong>Location:</strong> ${d.address}</p>
          <p style="margin:2px 0; font-size:14px;"><strong>Phone:</strong> <a href="tel:${d.phone}" style="color:#A81B1B; font-weight:bold;">${d.phone}</a></p>
        </div>
      `).join('');

      // Send email to requester
      await sendEmail(email, 'Urgent: Blood Donor Matches Found - AstraVita', 
        `<h3>Hello ${name},</h3>
         <p>Great news! We found <strong>${donors.length} potential donor(s)</strong> matching your request for <strong>${blood_type}</strong> blood in your area (PIN: ${pin}).</p>
         <div class="info-box">
           ${donorList}
         </div>
         <p><strong>Note:</strong> We recommend contacting these donors by phone as soon as possible for your emergency request.</p>`
      );

      return res.json({ status: 'success', message: 'Match found!', donors });
    }

    await Request.create({ name, email, blood_type, pin, status: 'pending' });
    res.json({ status: 'pending', message: 'No match found yet. We will email you when a donor registers in your area.' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

module.exports = router;
