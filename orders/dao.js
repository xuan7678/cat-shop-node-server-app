import model from "./model.js";

export const createOrder = (order) => model.create(order);
export const findOrderById = (orderId) => model.findById(orderId);
export const deleteOrder = (orderId) => model.deleteOne({ _id: orderId });
