import mongoose from "mongoose";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import users from "./data/users.js";
import products from "./data/products.js";

import globals from "./globals.js";
globals();

const createData = async () => {
    dotenv.config();
    await connectDB();

    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => ({ ...product, user: adminUser }));

        await Product.insertMany(sampleProducts);

        log(["green"], "Successfully created data!");
        process.exit(0);
    } catch (error) {
        log.error(["bold", "red"], `Error while creating data --> ${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    dotenv.config();
    await connectDB();

    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        log(["green"], "Successfully destroyed data!");
        process.exit(0);
    } catch (error) {
        log.error(["bold", "red"], `Error while destroying data --> ${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    createData();
}