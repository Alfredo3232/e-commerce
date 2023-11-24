import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        process.stdout.write(`Connected Successfully to MongoDB: ${conn}\n`);
    } catch (error) {
        process.stderr.write(`\x1b[31mError connecting to MongoDB: ${error}\x1b[0m\n`);

        process.exit(1);
    }
};

export default connectDB;