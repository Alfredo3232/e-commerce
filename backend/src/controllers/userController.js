import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// Public Routes
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

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
    const {
        name,
        email,
        password
    } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        generateToken(res, user._id);

        res.status(201).send({
            _id     : user._id,
            name    : user.name,
            email   : user.email,
            isAdmin : user.isAdmin
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
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