const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
    },
    isActive: {
        type: Boolean,
        default: false
    },
    consecutiveDaysStayed: {
        type: String,
        default: "0"
    },
    latestCheckInDate: {
        type: Date
    },
    HMIS:{
        isValid: {
            type: Boolean,
            default: false
        },
        enterDate: {
            type: Date
        }
    },
    accommodation: {
        hasAcc: {
            type: Boolean,
            default: false
        },
        accDesc: {
            type: String
        }
    },
    bunkReservation: {
        hasRes: {
            type: Boolean,
            default: false
        },
        resNum: {
            type: String
        }
    },
    locker: {
        type: String
    },
    laundry: {
        type: Boolean,
        default: false
    },
    Bx: {
        warning: {
            type: Boolean,
            default: false
        },
        suspension: {
            type: Boolean,
            default: false
        },
        noTrespass: {
            type: Boolean,
            default: false
        },
        probation: {
            type: Boolean,
            default: false
        },
        bxNotes: {
            type: String
        }
    }
});

module.exports = mongoose.model('Guest', guestSchema);