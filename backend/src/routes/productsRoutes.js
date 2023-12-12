import express from "express";
const router = express.Router();

import {
    getProducts,
    getProductById,
    createProduct
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";


router.get("/:id", getProductById);

router.route("/")
    .post(protect, admin, createProduct)
    .get(getProducts);

export default router;