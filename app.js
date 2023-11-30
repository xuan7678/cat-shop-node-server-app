import path from "path";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import ProductRoutes from "./products/routes.js";
import OrderRoutes from "./orders/routes.js";
import UploadRoutes from "./upload/routes.js";

mongoose.connect("mongodb://localhost:27017/catShop");
const app = express();
app.use(cors());
app.use(express.json());
ProductRoutes(app);
OrderRoutes(app);
UploadRoutes(app);
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

app.listen(process.env.PORT || 4000);
