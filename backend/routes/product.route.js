const express = require("express");
const Product = require("../models/product.model.js");
const router = express.Router();
const {
  getProducts,
  getOneProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  generateReport,
} = require("../controllers/product.controller.js");

//View Products or a Product based on the Batch ID

router.get("/view-batch", getProducts);
router.get("/view-batch/:batchID", getOneProduct);

//Create a Product

router.post("/create-batch", addProduct);

//Update a Product

router.put("/update-batch/:batchID", updateProduct);

//Delete a Product

router.delete("/delete-batch/:batchID", deleteProduct);

// Generate a Report
router.get("/generate-report", generateReport);

module.exports = router;
