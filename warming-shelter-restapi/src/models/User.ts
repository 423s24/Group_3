import mongoose, { Schema, Model } from 'mongoose';
import { UserDocument } from '../types';

const UserSchema: Schema<UserDocument> = new Schema<UserDocument>({
    role: {
        type: String,
        enum: ['system_administrator', 'standard_user'],
        default: 'standard_user'
    },
    isActive: {
        type: Boolean,
        default: true
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
    },
    lastLogin: {
        type: Date,
    }
}, {
    timestamps: true
});

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;