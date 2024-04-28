const { response } = require("express");
const Item = require("../models/item");
const CartItem = require("../models/cartItem");

const addItem = async (req, res) => {
  try {
    const { name, price, image } = req.body;
    if (!name) {
      return res.json({
        error: "name is required",
      });
    }
    if (!price) {
      return res.json({
        error: "price is required",
      });
    }
    if (!image) {
      return res.json({
        error: "image is required",
      });
    }
    const newItem = await Item.create({ name, price, image });
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
    const { name, price, image } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      { name, price, image },
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

const getmenuItem = async (req, res) => {
  try {
    const menuItems = await Item.find();
    res.json(menuItems); // Send menuItems as the response
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
};

const test = () =>
{
  consloe.log("Testing2")
}


const availableQuantity =  async (req, res) => {
  try {
    const { itemId } = req.params;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const cartItems = await CartItem.find({ itemId });
    let totalInCart = 0;
    cartItems.forEach(cartItem => {
      totalInCart += cartItem.quantity;
    });

    const availableQuantity = item.quantity - totalInCart;

    res.json({ quantity: availableQuantity });
  } catch (error) {
    console.error("Error getting available quantity:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
module.exports = { addItem, deleteItem, updateItem ,getmenuItem,test,availableQuantity};
