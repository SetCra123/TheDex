const express = require('express');
const router = express.Router();
const {
    register, 
    login,
    logout,
    getAuthenticatedUser,
    updatePassword,
    forgotPassword,
    resetPassword,
} = require('../controllers/authController');
const { protect } = require('..middleware/auth');

//----------------PUBLIC ROUTES-------------//

// @route POST /api/auth/register
// @desc Register new user
// @access Public
router.post('/register', register);

// @route POST /api/auth/login
// @desc Login user
// @access Public
router.post('/login', login);

// @route   POST /api/auth/forgotpassword
// @desc    Generate password reset token
// @access  Public
router.post('/forgotpassword', forgotPassword);

// @route   PUT /api/auth/resetpassword/:resetToken
// @desc    Reset password using token
// @access  Public
router.put('/resetpassword/:resetToken', resetPassword);

//-----------------PROTECTED ROUTES-------------------//

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', protect, logout);

// @route   GET /api/auth/me
// @desc    Get currently authenticated user
// @access  Private
router.get('/me', protect, getAuthenticatedUser);

// @route PUT /api/auth/updatepassword
// @desc Update password
// @access Private
router.put('/updatepassword', protect, updatePassword);


module.exports = router;
