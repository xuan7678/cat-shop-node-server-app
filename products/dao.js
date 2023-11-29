import model from "./model.js";

export const createProduct = (product) => model.create(product);
export const findAllProductsBySeller = (userId) => model.find({ user: userId });
export const findProductById = (productId) => model.findById(productId);
export const updateProduct = (productId, product) =>
  model.updateOne({ _id: productId }, { $set: product });
export const deleteProduct = (productId) => model.deleteOne({ _id: productId });
export const findProductsByKeyword = (keyword) =>
  model.find({ title: { $regex: new RegExp(keyword, "i") } });
