const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true, 'Name required']
    },
    firstLastName:{
        type: String,
        required: [true, 'Name first lastname']
    },
    secondLastName:{
        type: String,
        required: [true, 'Name second lastname']
    },
    email:{
        type: String,
        required: [true, 'Email required']
    },
    age:{
        type: Number,
        required: [true, 'Age required']
    },
    phone:{
        type: Number,
        required: [true, 'Phone required']
    },
    emergenciesPhone:{
        type: Number,
        required: [true, 'Emergencies phone required']
    },
    address:{
        type: String,
        required: [true, 'Address required']
    },
    birthDate:{
        type: Date,
        required: [true, 'Emergencies phone required']
    },
    documents:{
        birthCertificate:{
            type: String,
            required: [false, 'Birth certificate required']
        },
        studiesCertificate:{
            type: String,
            required: [false, 'Studies certificate required']
        },
        curp:{
            type: String,
            required: [false, 'CURP is required']
        },
        socialSecurityNumber:{
            type: String,
            required: [false, 'Social security number is required']
        },
        photographs:{
            type: String,
            required: [false, 'Photographs are required']
        },
        proofOfAddress:{
            type: String,
            required: [false, 'Proof of address required']
        },
        recommendationLetter:{
            type: String,
            required: [false, 'Recommendation letter required']
        }
    }


});

module.exports = mongoose.model('teachers', teacherSchema);