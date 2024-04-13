const Product = require("../models/product.model");

//View All Products

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//View a Product based on the Batch ID

const getOneProduct = async (req, res) => {
  try {
    const { batchID } = req.params;
    const product = await Product.findOne({ batchID: batchID });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Creating a Product

const addProduct = async (req, res, next) => {
  try {
    const { batchID } = req.body;

    // Check if batch ID already exists
    const existingProduct = await Product.findOne({ batchID });
    if (existingProduct) {
      return res.status(409).json({ error: "Batch ID already exists" });
    }

    // If batch ID is unique, proceed with creating the product
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update a Product

const updateProduct = async (req, res) => {
  try {
    const { batchID } = req.params;
    const product = await Product.findOneAndUpdate(
      { batchID: batchID },
      req.body
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findOne({ batchID: batchID });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete a Product

const deleteProduct = async (req, res) => {
  try {
    const { batchID } = req.params;

    const product = await Product.findOneAndDelete({ batchID: batchID });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const generateReport = async (req, res) => {
  try {
    let query = {};

    if (req.query.startDate && req.query.endDate) {
      query.receivedDate = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate),
      };
    }

    if (req.query.status) {
      // Adjust the query to filter by status
      query.status = req.query.status;
    }

    const reportData = await Product.find(query);

    res.status(200).json(reportData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getOneProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  generateReport,
};
