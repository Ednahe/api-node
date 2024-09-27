const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true, 
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(v) {
            if(!validator.isEmail(v)) throw new Error('Email non valide');
        }
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamp: true,
});

userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        if(!validator.isLength(this.password, { min: 4, max: 20})) {
            throw new Error('Le mot de passe doit avoir entre 4 et 20 caractères.')
        }
        // hasher le mdp
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.isPasswordValid = function(password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);