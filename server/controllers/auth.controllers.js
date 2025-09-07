import mongoose from "mongoose"
import User from "../models/user.model";
import generateToken from "../config/token";

const signUp = async (req, res) => {
    const { name, username, email, password } = req.body;
    try {
        // validate the credientials provided by the new user to sign in
        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already registed with this email" });
        }
        const existingUserName = await User.findOne({ username })
        if (existingUserName) {
            return res.status(400).json({ message: "Username already exists" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password length must be atleast 6 characters long" })
        }
        // user regex to check the strength of the password
        const regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
        if (!regex.exec(password)) {
            return res.status(400).json({
                message: "Password must have at least 8 characters, one uppercase, one lowercase, one number, and one special character."
            });
        }

        // create salt and hash the password with the salt
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // create new user
        const newUser = await User.create({name, email, username, password: hashPassword});

        // create a token for the user
        const token = generateToken(newUser._id);

        // remove password before sending the response
        const safeUser = newUser.toObject();
        delete safeUser.password;

        return res.status(200).json({message: "New User created successfully", user: safeUser});

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
}