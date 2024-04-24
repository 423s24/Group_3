const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const requireAuth = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Get user from token
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            res.status(401);
            throw new Error('Invalid or expired token. Please login again.');
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized')
    }
})

const requireAdmin = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403);
        throw new Error('Not authorized as an admin');
    }
})

module.exports = {requireAuth, requireAdmin}