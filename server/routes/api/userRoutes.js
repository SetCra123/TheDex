const express = require('express');
const router = express.Router();
const {
    getProfile,
    updateProfile,
    deleteAccount,
    saveFigure,
    removeSavedFigure,
    getSavedFigures
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

//------------------ALL ROUTES PROTECTED------------------//
router.use(protect);

// @route GET /api/users/profile
// @desc Get user profile with saved
// @access Private
router.get('/profile', getProfile);

// @route PUT /api/users/profile
// @desc Update user profile
// @access Private
router.put('/profile', updateProfile);

// @route DELETE /api/users/profile
// @desc Delete user account
// @access Private
router.delete('/profile', deleteAccount);

// @route GET /api/users/saved
// @desc Get all saved figures
// @access Private
router.get('/saved', getSavedFigures);

// @route POST /api/user/saved/:figureId
// @desc Save a historical figure to a user's list
// @access Private
router.post('/saved/:figureId', saveFigure);

// @route DELETE /api/users/saved/:figureId
// @desc  Remove figure from saved list
// @access Private
router.delete('/saved/:figureId', removeSavedFigure);


module.exports = router; 
