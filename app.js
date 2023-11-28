import express from "express";
import cors from "cors";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/catShop");
const app = express();
app.use(cors());
app.use(express.json());
app.listen(process.env.PORT || 4000);
