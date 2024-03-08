import { Request } from 'express';
import { Document, ObjectId } from 'mongoose';

/**
 * Represents a user document in the database.
 */
declare interface UserDocument extends Document {
    role: 'system_administrator' | 'standard_user';
    isActive: boolean;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    lastLogin?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

/**
 * Represents a guest document in the database.
 */
interface HMIS {
    isValid: boolean;
    enterDate: Date
}

interface IAccommodation {
    hasAcc: boolean;
    accDesc?: string;
}

interface IBunkReservation {
    hasRes: boolean;
    resNum?: string;
}

interface IBX {
    warning: boolean;
    suspension: boolean;
    noTrespass: boolean;
    probation: boolean;
    bxNotes: string;
}

declare interface GuestDocument extends Document {
    firstName: string;
    lastName: string;
    DOB: Date;
    isActive: boolean;
    consecutiveDaysStayed: string; 
    latestCheckInDate: Date;
    HMIS : HMIS;
    accommodation: IAccommodation;
    bunkReservation: IBunkReservation;
    locker: string;
    laundry: boolean;
    Bx: IBX;
}

/**
 * Represents a request object with an authenticated user property.
 * @extends {Request}
 */
declare interface AuthenticatedRequest extends Request {
    user?: UserDocument;
}
