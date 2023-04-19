const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 5,
        max: 100,
        unique: true
    },
    author: {
        type: String,
        required: true,
    },
    des: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    downloadLink: {
        type: String,
        required: true,
    },
    NumberOfDownloads: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    isPrimium: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
    }
},{timestamps: true});

module.exports = mongoose.model('Book', BookSchema);