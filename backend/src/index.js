import express from "express";
import dotenv from "dotenv";
dotenv.config();

import globals from "./globals.js";
import connectDB from "./config/db.js";
import products from "./data/products.js";

const start = async () => {
    await connectDB();

    // Express instance
    const app = express();
    const PORT = process.env.PORT || 3000;

    // Express plugins
    app.use(express.json());

    // Routes
    app.get("/", (req, res) => {
        res.send("API is Running!");
    });
    app.get("/api/products", (req, res) => {
        res.send(products);
    });
    app.get("/api/products/:id", (req, res) => {
        const product = products.find(p => p._id === req.params.id);

        res.send(product);
    });

    // Startup application
    app.listen(PORT, () => {
        log("#00EFFF", `Running at ------> http://localhost:${PORT}`);
    });
};

// Runs if importing or running with node
if (import.meta.url === `file://${process.argv[1]}`) {
    // Setting up functions
    globals();

    log(["underline"], "Starting Server");
    start();
}
