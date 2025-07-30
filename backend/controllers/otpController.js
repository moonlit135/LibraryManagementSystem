const { Student } = require('../models');
const { 
  generateOTP, 
  sendOTPEmail, 
  getOTPExpiryTime, 
  verifyOTP 
} = require('../utils/otpUtils');

// @desc    Send OTP to user's email
// @route   POST /api/otp/send
// @access  Public
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Check if user with this email already exists
    const existingUser = await Student.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Generate OTP and set expiry time
    const otp = generateOTP();
    const otpExpiry = getOTPExpiryTime();

    // Save OTP to the database (create or update existing user with this email)
    const [user, created] = await Student.upsert({
      email,
      otp,
      otpExpiry,
      // Set temporary values (will be updated during final registration)
      name: 'Temporary',
      roll_no: 'temp-' + Date.now(),
      password: 'temp-password',
      department: 'CSE',
      course: 'Btech'
    }, {
      where: { email },
      returning: true
    });

    // Send OTP to user's email
    const emailResult = await sendOTPEmail(email, otp);
    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        message: emailResult.error || 'Failed to send OTP email'
      });
    }

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      email: user.email
    });

  } catch (error) {
    console.error('Error in sendOTP:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Verify OTP
// @route   POST /api/otp/verify
// @access  Public
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required'
      });
    }

    // Find user by email
    const user = await Student.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify OTP
    const verification = verifyOTP(user.otp, user.otpExpiry, otp);
    if (!verification.valid) {
      return res.status(400).json({
        success: false,
        message: verification.message
      });
    }

    // Clear OTP after successful verification
    await user.update({ otp: null, otpExpiry: null });

    res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
      email: user.email
    });

  } catch (error) {
    console.error('Error in verifyOTP:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Resend OTP
// @route   POST /api/otp/resend
// @access  Public
exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Generate new OTP and set expiry time
    const otp = generateOTP();
    const otpExpiry = getOTPExpiryTime();

    // Update user with new OTP
    const [user, created] = await Student.upsert({
      email,
      otp,
      otpExpiry,
      // Set temporary values if creating new user
      ...(created && {
        name: 'Temporary',
        roll_no: 'temp-' + Date.now(),
        password: 'temp-password',
        department: 'CSE',
        course: 'Btech'
      })
    }, {
      where: { email },
      returning: true
    });

    // Send new OTP to user's email
    const emailResult = await sendOTPEmail(email, otp);
    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        message: emailResult.error || 'Failed to resend OTP'
      });
    }

    res.status(200).json({
      success: true,
      message: 'OTP resent successfully',
      email: user.email
    });

  } catch (error) {
    console.error('Error in resendOTP:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
