const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    isAdmin: {
        type: Boolean,
        required: [true, 'Admin status is required'],
        default: false
    },
    firstName: {
        type: String,
        required: [true, 'Please provide a first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please provide a last name']
    },
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);