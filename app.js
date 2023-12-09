import path from "path";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from "./users/userRoutes.js";
import profileRoutes from "./users/profileRoutes.js";
import reviewRoutes from "./reviews/reviewRoutes.js";
import ProductRoutes from "./products/routes.js";
import OrderRoutes from "./orders/routes.js";
import UploadRoutes from "./upload/routes.js";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect("mongodb://localhost:27017/catShop");
const app = express();
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000', // Replace with the domain you want to allow
  credentials: true
}

));
app.use(express.json());
ProductRoutes(app);
OrderRoutes(app);
UploadRoutes(app);
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/reviews", reviewRoutes);
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use("/uploads", express.static("/var/data/uploads"));
} else {
  const __dirname = path.resolve();
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.listen(process.env.PORT || 8888);
