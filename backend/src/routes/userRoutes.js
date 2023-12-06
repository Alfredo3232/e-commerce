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
import { protect, admin } from "../middleware/authMiddleware.js";

// Single Routes
router
    .post("/logout", logoutUser)
    .post("/login", authUser);

// Group Routes
router.route("/")
    .post(registerUser)
    .get(protect, admin, getUsers);

router.route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.route("/:id")
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)
    .delete(protect, admin, deleteUser);

export default router;