import mongoose from 'mongoose';

const { Schema } = mongoose;

const BunkSchema = new Schema({
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

const Bunk = mongoose.model('Bunk', BunkSchema);

export default Bunk;