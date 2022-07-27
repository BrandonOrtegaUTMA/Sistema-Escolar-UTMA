const mongoose = require('mongoose');

const documentsStruture = {
    url:{
        type: String,
        required: [true, 'url required']
    },
    public_id:{
        type: String,
        required: [true, 'public_id required']
    },
    resource_type:{
        type: String,
        required: [true, 'resource_type required']
    },
}

const addressStruture ={
    suburb:{
        type: String,
        required: [true, 'suburb required']
    },
    street:{
        type: String,
        required: [true, 'street required']
    },
    house_number:{
        type: Number,
        required: [true, 'house_number required']
    },
}

const studentsSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true, 'Name required']
    },
    apepat:{
        type: String,
        required: [true, 'apepat required']
    },
    apemat:{
        type: String,
        required: [true, 'apemat required']
    },
    mail:{
        type: String,
        required: [true, 'mail required']
    },
    age:{
        type: Number,
        required: [true, 'Age required']
    },
    phone:{
        type: Number,
        required: [true, 'Phone required']
    },
    phone_emergency:{
        type: Number,
        required: [true, 'phone_emergency required']
    },
    address:addressStruture,
    DOB:{
        type: Date,
        required: [true, 'birthDate required']
    },
    type_career:{
        type: String,
        required: [true, 'type_career is required']
    },
    career:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'careers',
        required: [true, 'career is required']
    },
    grade:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'quarters',
        required: [true, 'grade is required']
    },
    documents:{
        birth_certificate:documentsStruture,
        studies_certificate:documentsStruture,
        curp:documentsStruture,
        no_security:documentsStruture,
        photos:documentsStruture,
        proof_of_address:documentsStruture,
        exanii:documentsStruture,
        letter_good_conduct:documentsStruture,
    }


});

module.exports = mongoose.model('students', studentsSchema);