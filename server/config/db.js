import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Db Connected");
    } catch(err){
        console.error(`Error while connecting to Database: ${err}`);
        process.exit(1);
    }
};
export default connectDB;