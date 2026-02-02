const express = require('express');
const router = express.Router();
const {
    searchFigures,
    getFigureById,
    createFigure,
    getPopularFigures 
} = require('../../controllers/figureController');
const { protect, authorize } = require('../../utils/auth');


// @route GET /api/figures/search
// @desc Search historical figures with filters
// @ access Public
router.get('/search', searchFigures);

// @route GET /api/figures/popular
// @desc Get yop 10 most viewed figures
// @access Public
router.get('/popular', getPopularFigures);

// @route GET /api/figures/:id
// @desc Get single figure by ID
// @access Public 
router.get('/:id', getFigureById);


// @route POST /api/figures
// @desc Create new historical figure
// @access Private/Admin
router.post('/', protect, authorize('admin'), createFigure);




module.exports = router;