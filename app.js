import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from './users/userRoutes.js';

mongoose.connect("mongodb://127.0.0.1:27017/catShop");
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.listen(process.env.PORT || 4000);
