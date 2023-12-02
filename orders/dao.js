import model from "./model.js";

export const createOrder = (order) => model.create(order);
export const findOrderById = (orderId) => model.findById(orderId);
export const deleteOrder = (orderId) => model.deleteOne({ _id: orderId });
export const findOrderByBuyer = (userId) => model.find({ user: userId });
export const findOrderBySeller = (sellerId) => model.find({ seller: sellerId });
