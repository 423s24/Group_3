import mongoose from 'mongoose';

const { Schema } = mongoose;

const LockerSchema = new Schema({
    lockerNumber: {
        type: String,
        required: true
    },
    lockerOccupant: {
        type: String,
        required: false
    }
});

const Locker = mongoose.model('Locker', LockerSchema);

export default Locker;