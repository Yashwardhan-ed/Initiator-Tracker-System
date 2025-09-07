import mongoose from "mongoose";
import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log(`Server is running on the Port: ${PORT}`)
})