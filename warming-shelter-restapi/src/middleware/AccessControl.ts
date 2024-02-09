import { NextFunction, Response } from 'express';
import asyncHandler from 'express-async-handler';

import User from '../models/User';
import { AuthenticatedRequest } from '../types';
import Token from '../utils/Token';

/**
 * A class that provides methods for verifying access control for authenticated requests.
 */
class AccessControl {
    /**
     * Verifies that the request contains a valid JWT token and sets the `user` property on the request object.
     * @param {AuthenticatedRequest} req - The authenticated request object.
     * @param {Response} res - The response object.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the token is verified.
     */
    public static verifyToken = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        // Check if the HTTPOnly cookie is present
        const userCookie = req.cookies.token;

        // If the cookie is present, use it to extract the user's ID
        if (userCookie) {
            const token = new Token();
            const decoded = token.verify(userCookie);

            const user = await User.findById(decoded.id);

            if (user) {
                req.user = user;
                next();
            } else {
                res.status(404);
                throw new Error('User not found');
            }
        } else {
            res.status(401);
            throw new Error('Not authorized, no token');
        }
    });

    /**
     * Middleware function that checks if the authenticated user has one of the specified roles.
     * @param {string[]} roles - An array of roles that are allowed to access the resource.
     */
    public static containsRole = (roles: string[]) => {
        return asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
            if (roles.includes(req.user.role)) {
                next();
            } else {
                res.status(403);
                throw new Error('Not authorized, invalid role');
            }
        });
    };

    /**
     * Middleware function that checks if the authenticated user is the owner of the account being accessed.
     * @param {AuthenticatedRequest} req - The authenticated request object.
     * @param {Response} res - The response object.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the user is verified as the account owner.
     */
    public static isAccountOwner = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const accountId = req.params.userId;
        if (req.user.id === accountId) {
            next();
        } else {
            res.status(403);
            throw new Error('Not authorized, not the account owner');
        }
    });
}

export default AccessControl;