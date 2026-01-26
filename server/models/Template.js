const mongoose = require(mongoose);
const { Schema } = mongoose;


const templateSchema = new Schema (
    {

    }
);



const Template = mongoose.model('Template', templateSchema);


module.exports = Template;