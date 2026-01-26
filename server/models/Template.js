const mongoose = require('mongoose');
const { Schema } = mongoose;


const templateSchema = new Schema (
    {
        name: {
          type: String,
          required: true
        },
        description: String,
        category: String,
        slideStructure: [{
          slideType: {
            type: String,
            enum: ['title', 'biography', 'timeline', 'achievements', 'quotes', 'impact', 'gallery']
          },
          defaultContent: {
            title: String,
            layout: String
          }
        }],
        colorSchemes: [{
          name: String,
          primary: String,
          secondary: String,
          accent: String,
          background: String
        }],
        isActive: {
          type: Boolean,
          default: true
        }
      }, {
        timestamps: true
      
    });
      




const Template = mongoose.model('Template', templateSchema);


module.exports = Template;