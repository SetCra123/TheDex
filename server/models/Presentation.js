const mongoose = require(mongoose);
const { Schema } = mongoose;


const presentationSchema = new Schema (
    {

    }
);


const Presentation = mongoose.model('Presentation', presentationSchema);

module.exports = Presentation;
