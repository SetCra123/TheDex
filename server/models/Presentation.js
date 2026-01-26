const mongoose = require('mongoose');
const { Schema } = mongoose;


const presentationSchema = new Schema (
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: {
            type: String,
            required: true
        },
        figureId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'HistoricalFigure',
            required: true
        },
        templateId: {
            type: String,
            required: true,
        },
        slides: [{
            slideNumber: Number,
            slideType: String, 
            content: {
                title: String,
                body: String, 
                imageUrl: String, 
                bulletpoints: [String],
                quote: String
            },
            backgroundTheme: String
        }],
        settings: {
            colorScheme: String,
            fontFamily: String, 
            transitionStyle: String, 
        }, 
        isPublic: {
            type: Boolean,
            default: false
        }
    },
        {
        timestamps: true
        }

    
);


const Presentation = mongoose.model('Presentation', presentationSchema);

module.exports = Presentation;
