import * as dao from "./dao.js";

function ProductRoutes(app) {
  const createProduct = async (req, res) => {
    const product = req.body;
    const result = await dao.createProduct(product);
    res.json(result);
  };
  const findAllProductsBySeller = async (req, res) => {
    const userId = req.params.userId;
    const result = await dao.findAllProductsBySeller(userId);
    res.json(result);
  };
  const findProductById = async (req, res) => {
    const productId = req.params.productId;
    const result = await dao.findProductById(productId);
    res.json(result);
  };
  const updateProduct = async (req, res) => {
    const productId = req.params.productId;
    const product = req.body;
    const result = await dao.updateProduct(productId, product);
    res.json(result);
  };
  const deleteProduct = async (req, res) => {
    const productId = req.params.productId;
    const product = await dao.findProductById(productId);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    await dao.deleteProduct(productId);
    res.json({ message: "Product removed" });
  };
  const findProductsByKeyword = async (req, res) => {
    const keyword = req.params.keyword;
    console.log("keyword", keyword);
    const result = await dao.findProductsByKeyword(keyword);
    res.json(result);
  };
  const findAllProducts = async (req, res) => {
    const result = await dao.findAllProducts();
    res.json(result);
  };

  app.post("/api/products", createProduct);
  app.get("/api/products", findAllProducts);
  app.get("/api/profile/:userId/products", findAllProductsBySeller);
  app.get("/api/products/:productId", findProductById);
  app.put("/api/products/:productId", updateProduct);
  app.delete("/api/products/:productId", deleteProduct);
  app.get("/api/search/:keyword", findProductsByKeyword);
}

export default ProductRoutes;
