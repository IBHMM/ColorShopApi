import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./config/connection.js";
import { ProductRouter } from "./router/products.mjs";
import cors from "cors";
import { user } from "./router/user.mjs";

dotenv.config();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

const connection = connectDB();
if (connection) {
    console.log("Connected to MongoDB");
}

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/products', ProductRouter);
app.use('/api/users', user);

app.get("/", (req, res) => {
    res.send("Hello World");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});
