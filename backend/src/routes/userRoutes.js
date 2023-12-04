import express from "express";
const router = express.Router();

import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser
} from "../controllers/userController.js";


// Single Routes
router
    .post("/logout", logoutUser)
    .post("/login", authUser);

// Group Routes
router.route("/")
    .post(registerUser)
    .get(getUsers);

router.route("/profile")
    .get(getUserProfile)
    .put(updateUserProfile);

router.route("/:id")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

export default router;