const mongoose = require(mongoose);
const { Schema } = mongoose;


const userSchema = new Schema (
    {

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






module.exports = mongoose.model('User', userSchema);