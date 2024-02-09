import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/User';

import Token from '../utils/Token';

/**
 * Controller class with static methods for handling user related requests.
 * @class
 */
class UserController {
    /**
     * Authenticates a user by checking if the provided username and password match an existing user in the database.
     * If the user is authenticated, a new session is created and a token is returned.
     * @function
     * @async
     * @param {Request} req - The request object containing the username and password in the request body.
     * @param {Response} res - The response object used to send the token and user data back to the client.
     * @throws {Error} If the username or password is missing, the user is not found, the user is inactive, the password needs to be changed, or the password is incorrect.
     * @returns {Promise<void>} A Promise that resolves when the session is regenerated and the token is sent back to the client.
     */
    public static loginUser = asyncHandler(async (req: Request, res: Response) => {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400);
            throw new Error('Please provide username and password');
        }

        // Check if user exists in the database
        const foundUser = await User.findOne({ username });

        if (!foundUser) {
            res.status(401);
            throw new Error('Invalid username or password');
        }

        // Check if user is active
        if (!foundUser.isActive) {
            res.status(401);
            throw new Error('User is not active');
        }

        // Compare password from request with the hashed password from the database
        const isPasswordMatch = await bcrypt.compare(password, foundUser.password);

        if (!isPasswordMatch) {
            res.status(401);
            throw new Error('Invalid username or password');
        }

        // Regenerate the session
        req.session.regenerate((err) => {
            if (err) {
                res.status(500);
                throw new Error('Session regeneration failed');
            }

            foundUser.lastLogin = new Date();
            foundUser.save();

            // Create a new token with specific user data for frontend decoding
            const token = new Token();

            // Sign the token with user data
            const signedToken = token.sign({ id: foundUser._id });

            if (token.isValid()) {
                res.cookie('token', signedToken, {
                    httpOnly: true,
                    secure: true
                });

                res.status(200).json({
                    user: {
                        id: foundUser._id,
                        role: foundUser.role,
                        firstName: foundUser.firstName,
                        lastName: foundUser.lastName,
                        username: foundUser.username,
                        lastLogin: foundUser.lastLogin,
                    }
                });
            } else {
                res.status(500);
                throw new Error('Token is not valid');
            }
        });
    });

    /**
     * Creates a new user with the provided user data
     * @function
     * @async
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<void>} - A promise that resolves with the created user data and a success message, or rejects with an error.
     * @throws {Error} - If any required fields are missing or if a user with the same username already exists.
     */
    public static createNewUser = asyncHandler(async (req: Request, res: Response) => {
        const { role, isActive, firstName, lastName, username, password} = req.body;

        if (!firstName || !lastName || !username || !role) {
            res.status(400);
            throw new Error('Please provide all required fields');
        }

        const userExists = await User.findOne({ username });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            role,
            isActive,
            firstName,
            lastName,
            username,
            password: hashedPassword
        });

        if (newUser) {
            res.status(201).json({
                user: {
                    id: newUser._id,
                    role: newUser.role,
                    isActive: newUser.isActive,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    username: newUser.username,
                    lastLogin: newUser.lastLogin,
                },
                message: 'User created successfully',
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    });

    /**
     * Get all users from the database
     * @function
     * @async
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @returns {Promise<void>} - Promise object represents the completion of the operation
     * @throws {Error} - If no users are found in the database
     */
    public static getAllUsers = asyncHandler(async (req: Request, res: Response) => {
        const users = await User.find({}).select('-password');

        const allUsers = users.map(user => ({
            id: user._id,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            lastLogin: user.lastLogin,
        }));


        if (allUsers) {
            res.status(200).json({
                users: allUsers,
            });
        } else {
            res.status(500);
            throw new Error('No users found');
        }
    });

    /**
     * Updates a user by their ID.
     * @function
     * @async
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object.
     * @returns {Promise<void>} - Promise that resolves with no value.
     * @throws Will throw an error if user ID is not provided or if user is not found.
     */
    public static updateUserById = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.query;
        const { isActive, role, firstName, lastName, username } = req.body;

        if (!id) {
            res.status(400);
            throw new Error('Please provide user id');
        }

        const foundUser = await User.findById(id);

        if (!foundUser) {
            res.status(404);
            throw new Error('User not found');
        }

        foundUser.isActive = isActive || foundUser.isActive;
        foundUser.role = role || foundUser.role;
        foundUser.firstName = firstName || foundUser.firstName;
        foundUser.lastName = lastName || foundUser.lastName;
        foundUser.username = username || foundUser.username;


        const updatedUser = await foundUser.save();

        if (updatedUser) {
            res.status(200).json({
                user: {
                    id: updatedUser._id,
                    isActive: updatedUser.isActive,
                    role: updatedUser.role,
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    username: updatedUser.username,
                    lastLogin: updatedUser.lastLogin,
                }
            });
        } else {
            res.status(500);
            throw new Error('User update failed');
        }
    });

    /**
     * Deletes a user by their ID.
     * @function
     * @async
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object.
     * @throws Will throw an error if user ID is not provided or if user deletion fails.
     * @returns {Promise<void>} - Promise that resolves with a success message if user is deleted successfully.
     */
    public static deleteUserById = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;

        if (!id) {
            res.status(400);
            throw new Error('Please provide user id');
        }

        const deletedUser = await User.findByIdAndDelete(id);

        if (deletedUser) {
            res.status(200).json({
                id: deletedUser._id,
                message: 'User deleted successfully',
            });
        } else {
            res.status(500);
            throw new Error('User deletion failed');
        }
    });

    /**
     * @todo Implement this method.
     * Changes the password of a user.
     * @param req - The request object.
     * @param res - The response object.
     */
    public static changePassword = asyncHandler(async (req: Request, res: Response) => {
    });

    /**
     * Get user by ID
     * @param req - Express Request object
     * @param res - Express Response object
     * @returns JSON response with user data
     * @throws Error if user ID is not provided or user is not found
     */
    public static getUserById = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.query;

        if (!id) {
            res.status(400);
            throw new Error('Please provide user id');
        }

        const foundUser = await User.findById(id);

        if (foundUser) {
            res.status(200).json({
                user: {
                    id: foundUser._id,
                    isActive: foundUser.isActive,
                    role: foundUser.role,
                    firstName: foundUser.firstName,
                    lastName: foundUser.lastName,
                    username: foundUser.username,
                    lastLogin: foundUser.lastLogin,
                }
            });
        } else {
            res.status(500);
            throw new Error('User not found');
        }
    });

    /**
     * Search for users based on provided query parameters.
     * @param req - The request object.
     * @param res - The response object.
     * @returns A JSON object containing an array of users matching the search criteria.
     * @throws 400 error if no search parameters are provided.
     * @throws 404 error if no users are found.
     */
    public static searchUsers = asyncHandler(async (req: Request, res: Response) => {
        const { firstName, lastName, username } = req.query;

        // Check if at least one query parameter is provided
        if (!firstName && !lastName && !username) {
            res.status(400);
            throw new Error('Please provide at least one search parameter');
        }

        // Create a filter object with $or operator
        const filter = {
            $or: []
        };

        // Add each query parameter to the filter if provided
        if (firstName) {
            filter.$or.push({ firstName: { $regex: firstName, $options: 'i' } });
        }
        if (lastName) {
            filter.$or.push({ lastName: { $regex: lastName, $options: 'i' } });
        }
        if (username) {
            filter.$or.push({ username: { $regex: username, $options: 'i' } });
        }

        // Query the database with the filter
        const users = await User.find(filter);

        if (users.length > 0) {
            res.status(200).json({
                users: users.map(user => {
                    return {
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                    };
                })
            });
        } else {
            res.status(404);
            throw new Error('No users found');
        }
    });

    /**
     * Logs out the user by destroying the session and clearing the token cookie.
     * 
     * @function
     * @async
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object.
     * @throws {Error} Logout failed.
     * @returns {Promise<void>} Promise object that represents the completion of the request.
     */
    public static logoutUser = asyncHandler(async (req: Request, res: Response) => {
        req.session.destroy((err) => {
            if (err) {
                res.status(500);
                throw new Error('Logout failed');
            }

            res.clearCookie('token');
            res.status(200).json({
                success: true,
            });
        });
    });

    /**
     * Creates a development user with the username 'dev' and password 'password'.
     * If the dev user already exists, throws an error.
     * 
     * @function
     * @async
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object.
     * @throws {Error} Dev user already exists or invalid user data.
     * @returns {Promise<void>} Promise object that represents the completion of the request.
     */
    public static createDevUser = asyncHandler(async (req: Request, res: Response) => {
        // Check if dev user already exists
        const devUserExists = await User.findOne({ username: 'dev' });

        if (devUserExists) {
            res.status(400);
            throw new Error('Dev user already exists');
        }

        const password = 'password';

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const devUser = await User.create({
            isActive: true,
            role: 'system_administrator',
            firstName: 'Dev',
            lastName: 'User',
            username: 'dev',
            password: hashedPassword,
        });

        if (devUser) {
            res.status(200).json({
                message: 'Dev user created',
                devUser: {
                    id: devUser._id,
                    role: devUser.role,
                    firstName: devUser.firstName,
                    lastName: devUser.lastName,
                    username: devUser.username,
                }
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data.');
        }
    });
}

export default UserController;