import express from "express";
const router = express.Router();

import { getProducts, getProductById } from "../controllers/productController.js";


router
    .get("/", getProducts)
    .get("/:id", getProductById);

export default router;