import User from './schema.js';
import asyncHandler from '../middleware/asyncHandler.js'
import generateToken from "./generateToken.js";
import { ObjectId } from "mongodb";

// log in
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.json({
            _id: user._id,
            name: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            isAdmin: user.isAdmin,
            admin: user.admin
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});


// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, firstName, lastName, role, admin } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        username,
        firstName,
        lastName,
        email,
        password,
        isAdmin: false,
        role,
        admin: admin ? new ObjectId(admin) : null,
    });

    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findOne(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            userName: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            role: user.role,
            admin: user.admin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getOtherUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findOne(req.params.id);
    if (user) {
        res.json({
            _id: user._id,
            userName: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            role: user.role,
            admin: user.admin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;

        if (req.body.password) {
            user.password = req.body.password;
        }

        if (req.body.admin) {
            user.admin = new ObjectId(req.body.admin);
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            role: user.role,
            admin: user.admin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        if (user.isAdmin) {
            res.status(400);
            throw new Error('Can not delete admin user');
        }
        await User.deleteOne({ _id: user._id });
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// find users by admin id
const findUsers = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user.isAdmin) {
        res.status(400);
        throw new Error('user is not admin');
    }

    const users = await User.find({ admin: user._id})

    res.json(users.map(u => {
       return {
           _id: u._id,
           username: u.username,
           firstName: u.firstName,
           lastName: u.lastName,
           email: u.email,
           isAdmin: u.isAdmin,
           role: u.role,
           admin: u.admin,
       }
    }));
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUsers,
    getUserProfile,
    updateUserProfile,
    deleteUser,
    findUsers,
    getOtherUserProfile
};