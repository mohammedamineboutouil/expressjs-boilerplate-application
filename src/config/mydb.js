import mongoose from 'mongoose';
import env from "../config";

export const connectToMongo = async () => {
    try {
        await mongoose.connect(env.DB_URI);
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};
