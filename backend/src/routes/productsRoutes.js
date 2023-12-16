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
import checkObjectId from "../middleware/checkObjectId.js";


router
    .post("/:id/reviews", protect, checkObjectId, createProductReview)
    .get("/top", getTopProducts);

router.route("/")
    .post(protect, admin, createProduct)
    .get(getProducts);

router.route("/:id")
    .get(checkObjectId, getProductById)
    .put(protect, admin, checkObjectId, updateProduct)
    .delete(protect, admin, checkObjectId, deleteProduct);

export default router;