import express from "express";
const router = express.Router();

import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getTopProducts
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";


router
    .post("/:id/reviews", protect, createProductReview)
    .get("/top", getTopProducts);

router.route("/")
    .post(protect, admin, createProduct)
    .get(getProducts);

router.route("/:id")
    .get(getProductById)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);

export default router;