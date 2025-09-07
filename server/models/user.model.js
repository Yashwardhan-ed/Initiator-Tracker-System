import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },  
    password: {
        type: String,
        required: true,
    },
}, {Timestamp: true})

const User = mongoose.model("User", userSchema);
export default User;