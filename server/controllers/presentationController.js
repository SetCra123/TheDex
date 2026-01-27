const { Presentation, Template } = require('..models');



const createPresentation = async (req, res) => {
    try {
        const { figureId, templateId, title } = req.body;

        const template = await Template.findbyId(templateId); 
        if (!template) {
            return res.status(404).json({
                success: false,
                error: 'Template not found'
            });
        }

        const slides = template.slideStructure.map((slide, index) => ({
            slideNumber: index + 1,
            slideype: slide.slideType, 
            content: slide.defaultContent,
            backgroundTheme: template.colorSchemes[0]?.name || 'default'
        }));

        const presentation = await Presentation.create({
            userId: req.user.id,
            title,
            figureId,
            templateId, 
            slides,
            settings: {
                colorScheme: template.colorSchemes[0]?.name || 'default',
                fontFamily: 'Arial', 
                transitionStyle: 'fade',
            }
        });

        res.status(201).json({
            success: true, 
            data: presentation
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }

};


const getUserPresentation = async (req, res) => {
    try {
        const presentations = await Presentation.find({
           userId: req.user.id 
        })
        .populate('figureId', 'name imageUrl')
        .sort({ updatedAt: -1 });

        res.json({
            success: true,
            count: presentations.length,
            data: presentations
        });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
};


const getUserPresentationbyId = async (req, res) => {
    try {
        const presentation = await Presentation.findById(req.params.id)
            .populate('figureId')
            .populate('userId', 'username');

        if (!presentation) {
           return res.status(404).json({ success: false, error: 'Presentation not found'}) 
        }
        if (presentation.userId._id.toString() !== req.user.id && !presentation.isPublic) {
            return res.status(403).json({ success: false, error: 'Access denied'});
        }

        res.json({
            success: truen,
            data: presentation
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }  
};


const updatePresentation = async (req, res) => {
    try {
        const presentation = await Presentation.findById(req.params.id);

        if (!presentation) {
            return res.status(404).json({ success: false, error: 'Presentation not found'});
        }
        if (presentation.userId.toString() !== req.user.id) {
            return res.status(403).json({ success: false, error: 'Access denied' });
        }

        const updated = await Presentation.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            data: updated
        }); 
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }

};

const deletePresentation = async () => {
    try {
        const presentation = await Presentation.findById(req.params.id);

        if (!presentation) {
            return res.status(404).json({
                success: false,
                error: 'Presentation not found'
            });
        }

        if (presentation.userId.toString() !== req.user.id) {
            return res.status(403).json({ success: false, error: 'Access denied'});
        }

        await Presentation.deleteOne();

        res.json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
      }
};


module.exports = {
    createPresentation,
    getUserPresentation,
    getUserPresentationbyId,
    updatePresentation,
    deletePresentation,
};