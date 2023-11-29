import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import ProductRoutes from "./products/routes.js";

mongoose.connect("mongodb://localhost:27017/catShop");
const app = express();
app.use(cors());
app.use(express.json());
ProductRoutes(app);
app.listen(process.env.PORT || 4000);
