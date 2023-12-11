import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

import globals from "./globals.js";
import connectDB from "./config/db.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productsRoute from "./routes/productsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const start = async () => {
    await connectDB();

    // Express instance
    const app = express();
    const PORT = process.env.PORT || 3000;

    // Express plugins
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    // Routes
    app.get("/", (req, res) => {
        res.send("API is Running!");
    });
    app.get("/api/config/paypal", (req, res) => res.send({ clientId: process.env.PAYPAL_CLIENT_ID }));
    app.use("/api/products", productsRoute);
    app.use("/api/users", userRoutes);
    app.use("/api/orders", orderRoutes);

    // Handlers
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
