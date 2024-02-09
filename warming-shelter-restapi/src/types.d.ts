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
 * Represents a request object with an authenticated user property.
 * @extends {Request}
 */
declare interface AuthenticatedRequest extends Request {
    user?: UserDocument;
}