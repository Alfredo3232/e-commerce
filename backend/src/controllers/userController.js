import jwt from "jsonwebtoken";

import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

// Public Routes
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d"
        });

        res.cookie("jwt", token, {
            httpOnly   : true,
            secure     : process.env.NODE_ENV !== "development",
            sameStrict : "strict",
            maxAge     : 30 * 24 * 60 * 60 * 1000
        });

        res.send({
            _id     : user._id,
            name    : user.name,
            email   : user.email,
            isAdmin : user.isAdmin
        });
    } else {
        res.status(404);

        throw new Error("Invalid username or password");
    }
});

const registerUser = asyncHandler(async (req, res) => {
    res.send("register user");
});

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly : true,
        expires  : new Date(0)
    });

    res.status(200).send({
        message: "Logged out successfully"
    });
});

const getUserProfile = asyncHandler(async (req, res) => {
    res.send("get user profile");
});

const updateUserProfile = asyncHandler(async (req, res) => {
    res.send("update user profile");
});

// Admin Routes
const getUsers = asyncHandler(async (req, res) => {
    res.send("get users");
});

const getUserById = asyncHandler(async (req, res) => {
    res.send("get user by id");
});

const deleteUser = asyncHandler(async (req, res) => {
    res.send("delete users");
});

const updateUser = asyncHandler(async (req, res) => {
    res.send("update user");
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser
};