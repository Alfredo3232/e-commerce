import express from "express";
import dotenv from "dotenv";

import products from "./data/products.js";

// Start env
dotenv.config();

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
    process.stdout.write(`Server is running at http://localhost:${PORT}\n`);
});
