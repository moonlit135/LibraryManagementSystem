const express = require('express');
const router = express.Router();
const { 
  sendOTP, 
  verifyOTP, 
  resendOTP 
} = require('../controllers/otpController');

// @route   POST /api/otp/send
// @desc    Send OTP to user's email
// @access  Public
router.post('/send', sendOTP);

// @route   POST /api/otp/verify
// @desc    Verify OTP
// @access  Public
router.post('/verify', verifyOTP);

// @route   POST /api/otp/resend
// @desc    Resend OTP
// @access  Public
router.post('/resend', resendOTP);

module.exports = router;
