import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import products from "./data/products.js";

// Start env
dotenv.config();

connectDB();
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
    process.stdout.write("Running at ---------------> " + `\x1b[3m\x1b[96mhttp://localhost:${PORT}\x1b[39m\x1b[23\x1b[0m` + "\n");
});
