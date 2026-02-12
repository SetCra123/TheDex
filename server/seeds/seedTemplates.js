// seeds/seedTemplates.js
require('dotenv').config();
const mongoose = require('mongoose');
const Template = require('../models/Template');

const templates = [
  {
    name: 'Modern Minimal',
    description: 'Clean, contemporary design with bold typography and ample whitespace. Perfect for showcasing powerful stories with maximum visual impact.',
    category: 'Modern',
    slideStructure: [
      {
        slideType: 'title',
        defaultContent: {
          title: 'Title Slide',
          layout: 'hero-centered'
        }
      },
      {
        slideType: 'biography',
        defaultContent: {
          title: 'Life Story',
          layout: 'text-image-split'
        }
      },
      {
        slideType: 'timeline',
        defaultContent: {
          title: 'Key Moments',
          layout: 'vertical-timeline'
        }
      },
      {
        slideType: 'achievements',
        defaultContent: {
          title: 'Major Achievements',
          layout: 'grid-cards'
        }
      },
      {
        slideType: 'quotes',
        defaultContent: {
          title: 'Words of Wisdom',
          layout: 'large-quote-centered'
        }
      },
      {
        slideType: 'impact',
        defaultContent: {
          title: 'Legacy & Impact',
          layout: 'full-width-text'
        }
      }
    ],
    colorSchemes: [
      {
        name: 'Purple Gradient',
        primary: '#667eea',
        secondary: '#764ba2',
        accent: '#f093fb',
        background: '#ffffff'
      },
      {
        name: 'Blue Ocean',
        primary: '#4facfe',
        secondary: '#00f2fe',
        accent: '#667eea',
        background: '#ffffff'
      }
    ],
    isActive: true
  },
  {
    name: 'Classic Elegant',
    description: 'Timeless design with serif fonts and traditional layouts. Inspired by classic literature and academic presentations for a sophisticated feel.',
    category: 'Traditional',
    slideStructure: [
      {
        slideType: 'title',
        defaultContent: {
          title: 'Title Page',
          layout: 'formal-title'
        }
      },
      {
        slideType: 'biography',
        defaultContent: {
          title: 'Biography',
          layout: 'two-column-text'
        }
      },
      {
        slideType: 'timeline',
        defaultContent: {
          title: 'Timeline of Events',
          layout: 'horizontal-timeline'
        }
      },
      {
        slideType: 'achievements',
        defaultContent: {
          title: 'Notable Achievements',
          layout: 'numbered-list'
        }
      },
      {
        slideType: 'quotes',
        defaultContent: {
          title: 'Notable Quotations',
          layout: 'sidebar-quote'
        }
      },
      {
        slideType: 'impact',
        defaultContent: {
          title: 'Historical Impact',
          layout: 'essay-style'
        }
      },
      {
        slideType: 'gallery',
        defaultContent: {
          title: 'Gallery',
          layout: 'photo-grid'
        }
      }
    ],
    colorSchemes: [
      {
        name: 'Dark Sophistication',
        primary: '#2c3e50',
        secondary: '#34495e',
        accent: '#e74c3c',
        background: '#ecf0f1'
      },
      {
        name: 'Vintage Brown',
        primary: '#654321',
        secondary: '#8b4513',
        accent: '#d4af37',
        background: '#f5f5dc'
      }
    ],
    isActive: true
  },
  {
    name: 'Vibrant Creative',
    description: 'Bold colors and dynamic layouts for an engaging presentation. Designed to captivate audiences with vibrant visuals and interactive storytelling.',
    category: 'Creative',
    slideStructure: [
      {
        slideType: 'title',
        defaultContent: {
          title: 'Dynamic Title',
          layout: 'bold-overlay'
        }
      },
      {
        slideType: 'biography',
        defaultContent: {
          title: 'The Story',
          layout: 'zigzag-layout'
        }
      },
      {
        slideType: 'timeline',
        defaultContent: {
          title: 'Journey Through Time',
          layout: 'circular-timeline'
        }
      },
      {
        slideType: 'achievements',
        defaultContent: {
          title: 'Breakthrough Moments',
          layout: 'spotlight-cards'
        }
      },
      {
        slideType: 'quotes',
        defaultContent: {
          title: 'Inspiring Words',
          layout: 'animated-quote'
        }
      },
      {
        slideType: 'impact',
        defaultContent: {
          title: 'Changing the World',
          layout: 'visual-impact'
        }
      },
      {
        slideType: 'gallery',
        defaultContent: {
          title: 'Visual Journey',
          layout: 'masonry-grid'
        }
      }
    ],
    colorSchemes: [
      {
        name: 'Pink Sunset',
        primary: '#f093fb',
        secondary: '#f5576c',
        accent: '#4facfe',
        background: '#ffffff'
      },
      {
        name: 'Tropical Paradise',
        primary: '#ff6b6b',
        secondary: '#feca57',
        accent: '#48dbfb',
        background: '#ffffff'
      },
      {
        name: 'Neon Nights',
        primary: '#a29bfe',
        secondary: '#fd79a8',
        accent: '#fdcb6e',
        background: '#2d3436'
      }
    ],
    isActive: true
  }
];

const seedTemplates = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing templates
    await Template.deleteMany({});
    console.log('🗑️  Cleared existing templates');

    // Insert seed data
    const createdTemplates = await Template.insertMany(templates);
    console.log(`✅ Successfully seeded ${createdTemplates.length} templates`);

    // Display summary
    console.log('\n📊 Template Seed Summary:');
    console.log(`   - Total Templates: ${createdTemplates.length}`);
    
    createdTemplates.forEach((template, index) => {
      console.log(`\n   ${index + 1}. ${template.name}`);
      console.log(`      - Category: ${template.category}`);
      console.log(`      - Slides: ${template.slideStructure.length}`);
      console.log(`      - Color Schemes: ${template.colorSchemes.length}`);
      console.log(`      - ID: ${template._id}`);
    });

    console.log('\n🎉 Template seeding complete!');
    console.log('\n💡 Tip: Use these template IDs when creating presentations');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding templates:', error);
    process.exit(1);
  }
};

// Run the seed function
seedTemplates();