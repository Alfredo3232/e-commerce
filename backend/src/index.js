import express from "express";
import dotenv from "dotenv";
dotenv.config();

import globals from "./globals.js";
import connectDB from "./config/db.js";
import productsRoute from "./routes/productsRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";


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
    app.use("/api/products", productsRoute);
    app.use(notFound);
    app.use(errorHandler);

    // Startup application
    app.listen(PORT, () => {
        log("#00EFFF", `http://localhost:${PORT}`, "Running at ------> ");
    });
};

// Runs if importing or running with node
if (import.meta.url === `file://${process.argv[1]}`) {
    // Setting up functions
    globals();

    log(["underline"], "Starting Server");
    start();
}
