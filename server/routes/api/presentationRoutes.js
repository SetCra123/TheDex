const express = require('express');
const router = express.Router();
const {
    createPresentation,
    getUserPresentation,
    getUserPresentationById,
    updatePresentation,
    deletePresentation
} = require('../../controllers/presentationController');
const { protect } = require('../../utils/auth');

//---------------ALL ROUTES REQUIRE AUTHENTICATION----------------------//
router.use(protect);

// @route GET /api/presentations
// @desc Get all presentations for logged-in user
// @access Private
router.get('/', getUserPresentation);

// @route POST /api/presentations
// @desc Create new presentation
// @access Private
router.post('/', createPresentation);

// @route   GET /api/presentations/:id
// @desc    Get single presentation by ID
// @access  Private
router.get('/:id', getUserPresentationById);


// @route   PUT /api/presentations/:id
// @desc    Update presentation
// @access  Private (Owner only)
router.put('/:id', updatePresentation);


// @route   DELETE /api/presentations/:id
// @desc    Delete presentation
// @access  Private (Owner only)
router.delete('/:id', deletePresentation);


module.exports = router; 