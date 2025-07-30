const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP to user's email
const sendOTPEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: `"Library Management System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your OTP for Registration',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Email Verification</h2>
          <p>Your OTP for registration is:</p>
          <div style="
            background: #f4f4f4;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
            font-size: 24px;
            letter-spacing: 5px;
            font-weight: bold;
            color: #1a365d;
          ">
            ${otp}
          </div>
          <p>This OTP is valid for 10 minutes.</p>
          <p>If you didn't request this OTP, please ignore this email.</p>
          <hr>
          <p style="color: #666; font-size: 12px;">This is an automated message, please do not reply.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return { 
      success: false, 
      error: 'Failed to send OTP email. Please try again later.' 
    };
  }
};

// Set OTP expiry time (10 minutes from now)
const getOTPExpiryTime = () => {
  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + 10);
  return expiry;
};

// Verify if OTP is valid and not expired
const verifyOTP = (storedOTP, storedExpiry, providedOTP) => {
  const now = new Date();
  if (!storedOTP || !storedExpiry) {
    return { valid: false, message: 'OTP not found or expired' };
  }
  
  if (new Date(storedExpiry) < now) {
    return { valid: false, message: 'OTP has expired' };
  }
  
  if (storedOTP !== providedOTP) {
    return { valid: false, message: 'Invalid OTP' };
  }
  
  return { valid: true, message: 'OTP verified successfully' };
};

module.exports = {
  generateOTP,
  sendOTPEmail,
  getOTPExpiryTime,
  verifyOTP
};
