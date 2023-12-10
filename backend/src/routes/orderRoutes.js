import express from "express";
const router = express.Router();

import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// Single Routes
router
    .get("/mine", protect, getMyOrders)
    .get("/:id", protect, getOrderById)
    .put("/:id/pay", protect, updateOrderToPaid)
    .put("/:id/deliver", protect, admin, updateOrderToDelivered);

// Group Routes
router.route("/")
    .post(protect, addOrderItems)
    .get(protect, admin, getOrders);

export default router;