const mongoose = require("mongoose");

const lockerSchema = mongoose.Schema({
    lockerNumber: {
        type: String,
        required: true
    },
    lockerOccupant: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("Locker", lockerSchema);