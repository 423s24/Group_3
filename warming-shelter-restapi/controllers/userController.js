const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const createNewUser = asyncHandler(async (req, res) => {
    const { isAdmin, firstName, lastName, username, password } = req.body;

    if (!isAdmin || !firstName || !lastName || !username || !password) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    const userExists = await User.findOne({ username });

    if (userExists) {
        res.status(400);
        throw new Error(`Username ${username} already exists`);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        isAdmin,
        firstName,
        lastName,
        username,
        password: hashedPassword
    });

    if (newUser) {
        res.status(201).json(
            {
                message: "User created successfully",
                newUser: {
                    _id: newUser._id,
                    isAdmin: newUser.isAdmin,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    username: newUser.username
                }
            }

        );
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400);
        throw new Error('Please provide username and password');
    }

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            isAdmin: user.isAdmin,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
        });
    } else {
        res.status(401);
        throw new Error('Invalid username or password');
    }
});

const getUserDetails = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        isAdmin: req.user.isAdmin,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        username: req.user.username
    }

    res.status(200).json(user);
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.remove();
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password');

    if (users) {
        res.status(200).json(users);
    } else {
        res.status(404);
        throw new Error('Users not found');
    }
});

const updateUser = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {isAdmin, firstName, lastName, username } = req.body;

    const user = await User.findById(id);

    if (user) {
        user.isAdmin = isAdmin || user.isAdmin;
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.username = username || user.username;

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            isAdmin: updatedUser.isAdmin,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            username: updatedUser.username
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = { createNewUser, loginUser, getUserDetails, deleteUser, getAllUsers, updateUser };