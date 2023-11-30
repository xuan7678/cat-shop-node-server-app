import mongoose from "mongoose";
import schema from "./schema.js";

const model = mongoose.model("orders", schema);

export default model;
