const express = require('express');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');
const { sendEmail } = require('../lib/email');
const auth    = require('../middleware/auth');
const router  = express.Router();

// SIGNUP
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      console.log('Signup fail: Missing fields', { name: !!name, email: !!email, pass: !!password });
      return res.status(400).json({ status: 'error', message: 'All fields are required' });
    }

    if (password.length < 8)
      return res.status(400).json({ status: 'error', message: 'Password must be at least 8 characters' });
    
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing)
      return res.status(400).json({ status: 'error', message: 'Email already registered' });
    
    const userCount = await User.countDocuments();
    const role = (userCount === 0) ? 'admin' : 'user';

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email: email.toLowerCase(), password: hashed, role });
    
    res.json({ status: 'success', message: `Account created! You have been registered as an ${role}.` });
  } catch (err) {
    console.error('SIGNUP ERROR:', err);
    res.status(500).json({ status: 'error', message: 'Server error during signup: ' + err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ status: 'error', message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log('Login fail: User not found', email);
      return res.status(401).json({ status: 'error', message: 'No account found with this email' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log('Login fail: Incorrect password', email);
      return res.status(401).json({ status: 'error', message: 'Incorrect password' });
    }

    if (!process.env.JWT_SECRET) {
      console.error('CRITICAL: JWT_SECRET is missing from environment variables!');
      return res.status(500).json({ status: 'error', message: 'Server configuration error: Missing JWT_SECRET' });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({ status: 'success', token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error('LOGIN ERROR:', err);
    res.status(500).json({ status: 'error', message: 'Server error: ' + err.message });
  }
});

// TEST EMAIL (development only)
router.post('/test-email', auth, async (req, res) => {
  const { to } = req.body;
  if (!to) return res.status(400).json({ status: 'error', message: 'to is required' });
  const ok = await sendEmail(to, 'AstraVita Test Email', '<p>If you see this, Nodemailer is working!</p>');
  res.json({ status: ok ? 'success' : 'error', message: ok ? 'Email sent!' : 'Email failed — check logs' });
});

module.exports = router;
