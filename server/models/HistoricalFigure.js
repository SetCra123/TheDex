const mongoose = require('mongoose');
const { Schema } = mongoose;

const historicalFigureSchema = new Schema (
  {
    name: {
        type: String,
        required: true,
        trim: true
    },
    birthyear: Number,
    deathYear: String,
    birthPlace: String,
    nationality: String,
    occupation: [String],
    knownFor: [String],
    biography: { 
        type: String,
        required: true
    },
    achievements: [String],
    quotes: [{
        text: String,
        context: String
    }],
    imageUrl: String,
    timeliePeriod: String,
    category: {
        type: String,
        enum: ['scientist', 'artist', 'leader', 'writer', 'inventor', 'philosopher', 'other']
    },
    searchCount: {
        type: Number,
        default: 0
    }
  }, {
    timestamps: true
  });

historicalFigureSchema.index({ name: 'text', biography: 'text', knownFor: 'text'});

const HistoricalFigure = mongoose.model('HistoricalFigure', historicalFigureSchema);

module.exports = HistoricalFigure; 