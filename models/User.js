const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 5,
        max: 20,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    downloaded: {
        type: [String]
    },
    favourites: {
        type: [String]
    },
    isPrimiumUser: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},{timestamps: true});

module.exports = mongoose.model('User',UserSchema);
