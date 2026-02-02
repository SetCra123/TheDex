const express = require('express');
const router = express.Router();
const {
    getAllTemplates,
    getTemplatesById
} = require('../../controllers/templateController');

// @route   GET /api/templates
// @desc    Get all active templates
// @access  Public
router.get('/', getAllTemplates);

// @route   GET /api/templates/:id
// @desc    Get single template by ID
// @access  Public
router.get('/:id', getTemplatesById);


module.exports = router;