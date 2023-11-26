import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

       log(["white"], "Connected Successfully to MongoDB!");
    } catch (error) {
        log.error(["red", "bold"], `${error}`, "Error connecting to MongoDB: ");
        process.exit(1);
    }
};

export default connectDB;