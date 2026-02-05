const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');


const userSchema = new Schema (
    {
        username: {
          type: String,
          required: true,
          unique: true
        },
        email: {
          type: String,
          required: true,
          unique: true
        },
        password: {
          type: String,
          required: true
        },
        role: {
          type: String,
          enum: ['user', 'admin'],
          default: 'user'
        },
        savedFigures: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'HistoricalFigure'
        }],
        presentations: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Presentation'
        }]
      }, {
        timestamps: true
      }
);


//Hash password
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


//Compare passwords
userSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
};



const User = mongoose.model('User', userSchema);

module.exports = User;