import mongoose from "mongoose";

const connectDB = async () => {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        throw new Error(
            "MONGODB_URI is not set."
        );
    }

    const connectionInstance = await mongoose.connect(mongoUri);

    console.log(
        `MongoDB connected: ${connectionInstance.connection.host}`
    );
};

export default connectDB;