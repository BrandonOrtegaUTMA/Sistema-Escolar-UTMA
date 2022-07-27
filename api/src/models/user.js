const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true, 'Name required']
    },
    lastName:{
        type: String,
        required: [true, 'First lastname required']
    },
    email:{
        type: String,
        required: [true, 'Email required']
    },
    password:{
        type: String,
        default:'12345'
    },
    role:{
        type: String,
        required: [true, 'Role required']
    },
    status:{
        type: String,
        required: [true, 'status required'],
        default: 'Inactivo'
    }

});

userSchema.pre('save', async function (next) {
    console.log("Se metio al pre save apesar de que se corrio el comando create");
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

userSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password)
    return compare
}

module.exports = mongoose.model('users', userSchema);