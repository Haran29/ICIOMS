const { response } = require("express");
const Item = require("../models/item");

const addItem = async (req, res) => {
  try {
    const { name, flavor, quantity, price, image, expiryDate, productDescription } = req.body;
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }
    if (!flavor) {
      return res.json({
        error: "Flavor is required",
      });
    }
    if (!quantity) {
      return res.json({
        error: "Quantity is required",
      });
    }
    if (!price) {
      return res.json({
        error: "Price is required",
      });
    }
    if (!image) {
      return res.json({
        error: "Image is required",
      });
    }
    if (!expiryDate) {
      return res.json({
        error: "Expiry date is required",
      });
    }
    if (!productDescription) {
      return res.json({
        error: "Product description is required",
      });
    }
    const newItem = await Item.create({
      name,
      flavor,
      quantity,
      price,
      image,
      expiryDate,
      productDescription,
    });
    res.json({ message: "Item added successfully", newItem });
  } catch (error) {
    res.status(500).json({ error: "Failed to add item" });
  }
};

const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const deletedItem = await Item.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.json({ error: "Item not found" });
    }
    res.json({ message: "Item deleted successfully", deletedItem });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete item" });
  }
};

const updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const { name, flavor, quantity, price, image, expiryDate, productDescription } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      { name, flavor, quantity, price, image, expiryDate, productDescription },
      { new: true }
    );
    if (!updatedItem) {
      return res.json({ error: "Item not found" });
    }
    res.json({ message: "Item updated successfully", updatedItem });
  } catch (error) {
    res.status(500).json({ error: "Failed to update item" });
  }
};

const getMenuItem = async (req, res) => {
  try {
    const { flavor } = req.query;
    let menuItems;
    if (flavor) {
      menuItems = await Item.find({ flavor });
    } else {
      menuItems = await Item.find();
    }
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
};


const generateReport = async (req, res) => {
  try {
    const allItems = await Item.find();
    res.json(allItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate report" });
  }
};

module.exports = { addItem, deleteItem, updateItem, getMenuItem, generateReport };
