import mongoose, { Schema, Model } from 'mongoose';
import { GuestDocument } from '../types';

const GuestSchema: Schema<GuestDocument> = new Schema<GuestDocument>({
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
        required: true
    },
    checkInDate : {
        type: Date,
        required: true
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
})

const Guest = mongoose.model<GuestDocument>('Guest', GuestSchema);

export default Guest;
