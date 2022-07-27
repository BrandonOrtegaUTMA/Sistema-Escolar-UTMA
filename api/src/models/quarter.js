const mongoose = require('mongoose');

const quarterSchema = new mongoose.Schema({

    number:{
        type: Number,
        required: [true, 'number required']
    },
    payments:[
        { 
            concept:{
                type: String,
                required: [true, 'concept required']
            },
            price:{
                type: Number,
                required: [true, 'price required']
            }
        
        }
    ],
    career_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'careers',
        required: [true, "Career ID is requiered"]
    }
});

module.exports = mongoose.model('quarters', quarterSchema);