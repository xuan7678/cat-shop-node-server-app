import * as dao from "./dao.js";
import * as productDao from "../products/dao.js";

function OrderRoutes(app) {
  const createOrder = async (req, res) => {
    const { user, product, quantity } = req.body;
    const productFromDB = await productDao.findProductById(product);
    if (!productFromDB) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    if (productFromDB.countInStock < quantity) {
      res.status(400).json({
        message: "Not enough quantity in stock",
        stock: productFromDB.countInStock,
      });
      return;
    }
    const seller = productFromDB.user;
    const productPrice = productFromDB.price;
    const itemsPrice = Number((productPrice * quantity).toFixed(2));
    const taxPrice = Number((0.1 * itemsPrice).toFixed(2));
    const totalPrice = Number((itemsPrice + taxPrice).toFixed(2));
    const order = {
      user,
      product,
      seller,
      quantity,
      productPrice,
      image: productFromDB.image,
      itemsPrice,
      taxPrice,
      totalPrice,
    };
    try {
      const result = await dao.createOrder(order);
      await productDao.updateProduct(product, {
        countInStock: productFromDB.countInStock - quantity,
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  const findOrderById = async (req, res) => {
    const orderId = req.params.orderId;
    const result = await dao.findOrderById(orderId);
    res.json(result);
  };
  const deleteOrder = async (req, res) => {
    const orderId = req.params.orderId;
    const order = await dao.findOrderById(orderId);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    await dao.deleteOrder(orderId);
    res.json({ message: "Order removed" });
  };
  const findOrderByBuyer = async (req, res) => {
    const userId = req.params.userId;
    const result = await dao.findOrderByBuyer(userId);
    res.json(result);
  };
  const findOrderBySeller = async (req, res) => {
    const sellerId = req.params.sellerId;
    const result = await dao.findOrderBySeller(sellerId);
    res.json(result);
  };

  app.post("/api/orders", createOrder);
  app.get("/api/orders/:orderId", findOrderById);
  app.delete("/api/orders/:orderId", deleteOrder);
  app.get("/api/profile/buyer/:userId/orders", findOrderByBuyer);
  app.get("/api/profile/seller/:sellerId/orders", findOrderBySeller);
}

export default OrderRoutes;
