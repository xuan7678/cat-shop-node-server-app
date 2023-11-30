import * as dao from "./dao.js";
import * as productDao from "../products/dao.js";

function OrderRoutes(app) {
  const createOrder = async (req, res) => {
    const { user, product, quantity } = req.body;
    const productFromDB = await productDao.findProductById(product);
    if (!productFromDB) {
      res.status(404).json({ message: "Product not found" });
      throw new Error("Product not found");
    }
    const productPrice = productFromDB.price;
    const itemsPrice = Number((productPrice * quantity).toFixed(2));
    const taxPrice = Number((0.1 * itemsPrice).toFixed(2));
    const totalPrice = Number((itemsPrice + taxPrice).toFixed(2));
    const order = {
      user,
      product,
      quantity,
      productPrice,
      image: productFromDB.image,
      itemsPrice,
      taxPrice,
      totalPrice,
    };
    try {
      const result = await dao.createOrder(order);
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
      res.sendStatus(404);
      throw new Error("Order not found");
    }
    await dao.deleteOrder(orderId);
    res.json({ message: "Order removed" });
  };

  app.post("/api/orders", createOrder);
  app.get("/api/orders/:orderId", findOrderById);
  app.delete("/api/orders/:orderId", deleteOrder);
}

export default OrderRoutes;
