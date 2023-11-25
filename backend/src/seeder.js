import mongoose from "mongoose";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import users from "./data/users.js";
import products from "./data/products.js";



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

        process.stdout.write("Successfully created data!\n");
        process.exit();
    } catch (error) {
        process.stderr.write(`\x1b[31mError while creating data --> ${error}\x1b[0m\n`);
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

        process.stdout.write("Successfully destroyed data!\n");
        process.exit();
    } catch (error) {
        process.stderr.write(`\x1b[31mError while destroying data --> ${error}\x1b[0m\n`);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    createData();
}