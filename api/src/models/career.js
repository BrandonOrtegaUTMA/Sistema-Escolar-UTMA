const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true, 'name required']
    },
    head_career:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'administratives',
        required: [true, 'head_career required']
    },
    type_career:{
        type: String,
        required: [true, 'type_career required']
    },
});

module.exports = mongoose.model('careers', careerSchema);