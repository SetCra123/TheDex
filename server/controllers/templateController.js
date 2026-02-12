const { Template } = require('../models');


const getAllTemplates = async (req, res) => {
    try {
        const templates = await Template.find({ isActive: true })
           .select('name description category slideStructure colorSchemes');

        res.json({
            success: true,
            count: templates.length,
            data: templates
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }

};


const getTemplatesById = async (req, res) => {
    try {
        const template = await Template.findById(req.params.id);
        

        if (!template) {
            return res.status(404).json({
                success: false,
                error: 'Template not found'
            })
        }

        res.json ({
            success: true,
            data: template
        });
    } catch (err) {
        res.status(500).json({
            success: false, 
            error: err.message
        });
    }

};



module.exports = {
    getAllTemplates,
    getTemplatesById,
}