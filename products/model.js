import mongoose from "mongoose";
import schema from "./schema.js";

const model = mongoose.model("products", schema);

export default model;
