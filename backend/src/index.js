import path from "path";
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
import uploadRoutes from "./routes/uploadRoutes.js";


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
    app.get("/api/config/paypal", (req, res) => res.send({ clientId: process.env.PAYPAL_CLIENT_ID }));
    app.use("/api/products", productsRoute);
    app.use("/api/users", userRoutes);
    app.use("/api/orders", orderRoutes);
    app.use("/api/upload", uploadRoutes);

    const __dirname = path.resolve();
    app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

    // Production
    if(process.env.NODE_ENV === "production") {
        // Set Paths to project
        let projectPath = __dirname;
        projectPath = projectPath.replace("/backend", "");

        let buildPath = projectPath + "/frontend/dist";

        // Set Routes for frontend
        app.use("/images", express.static(path.join(__dirname, "/images")));

        app.use(express.static(buildPath));

        app.get("*", (req, res) =>
            res.sendFile(path.resolve(projectPath, "frontend", "dist", "index.html"))
        );
    } else {
        app.get("/", (req, res) => {
            res.send("API is Running!");
        });
    }

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
