const express = require('express');
const router = express.Router();
const {
    getAllTemplates,
    getTemplateById
} = require('../controllers/templateController');

// @route   GET /api/templates
// @desc    Get all active templates
// @access  Public
router.get('/', getAllTemplates);

// @route   GET /api/templates/:id
// @desc    Get single template by ID
// @access  Public
router.get('/:id', getTemplateById);


module.exports = router;