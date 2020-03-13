const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
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
    avatar: {
        type: String,
        trim: true
    },
    userType:{
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date
    }


})

userSchema.pre('save', function (next) {
    if (!this.isModified('password'))
        return next();
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next()
        })
    })

})

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password,this.password)
}

module.exports = mongoose.model('User', userSchema);