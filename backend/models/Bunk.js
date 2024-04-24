const mongoose = require('mongoose');

const bunkSchema = mongoose.Schema({
    bunkNumber: {
        type: String,
        required: true
    },
    bunkOccupant: {
        type: String,
        required: false
    },
    isMen: {
        type: Boolean,
        required: true
    },
    isWomen: {
        type: Boolean,
        required: true
    },
    isObservation: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Bunk', bunkSchema);