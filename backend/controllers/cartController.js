const { response } = require("express");
const CartItem = require("../models/cartItem");


//adding Item to  user Specfic cart
const addToCart = async (req, res) => {
  try {
    const { itemId, userId } = req.body;

    if (!itemId) {
      return res.json({
        error: "Item ID is required",
      });
    }
    if (!userId) {
      return res.json({
        error: "User ID is required",
      });
    }
    let cartItem = await CartItem.findOne({ itemId, userId });

    if (cartItem) {
      
      cartItem.quantity += 1;
    } else {
      
      cartItem = new CartItem({
        userId,
        itemId,
        quantity: 1,
      });
    }

    await cartItem.save();

    res.json({ message: "Item added to cart successfully" });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
};

//getting cart item using userid
const getcartitems = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartItems = await CartItem.find({ userId }).populate("itemId");
    res.json(cartItems);
  } catch (error) {
    console.error("Failed to fetch cart items:", error);
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
};


//updating cart qty 
const updateCartItemQuantity = async (req, res) => {
  try {
    const { cartItemId, quantity } = req.body;
    

    await CartItem.updateOne({ _id: cartItemId }, { quantity });
    res.status(200).json({ message: "Quantity updated successfully" });
  } catch (error) {
    console.error("Failed to update quantity:", error);
    res.status(500).json({ error: "Failed to update quantity" });
  }
};


//deleting the cart Item
const deleteCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.body;
    console.log(req.body);

    await CartItem.deleteOne({ _id: cartItemId });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Failed to delete item:", error);
    res.status(500).json({ error: "Failed to delete item" });
  }
};

//clear a cart function
const clearCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    await CartItem.deleteMany({ userId });
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Failed to clear cart:", error);
    res.status(500).json({ error: "Failed to clear cart" });
  }
};

const removefromcart = async (req, res) => {
  const { itemId, userId } = req.body;

  try {
    
    const cartItem = await CartItem.findOne({ itemId, userId });

   
    if (cartItem) {
      
      if (cartItem.quantity === 0) {
        return res.status(400).json({ message: "Item quantity is already 0." });
      }
      cartItem.quantity--; 
      await cartItem.save(); 
      res
        .status(200)
        .json({ message: "Item removed from cart successfully.", cartItem });
    } else {
      // If item  not found ,  error
      res.status(404).json({ message: "Item not found in the cart." });
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// grtting order for 
const getcartitemsfororderpage = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Find  items with the user ID
    const cartItems = await CartItem.find({ userId });
    res.json(cartItems);
  } catch (error) {
    console.error("Failed to fetch cart items:", error);
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
};

//getting cartitem of specifc user

const getUserCart = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find  items of the user
    const userCartItems = await CartItem.find({ userId }).populate("itemId");
    res.json(userCartItems);
    
  } catch (error) {
    console.error("Failed to fetch user's cart items:", error);
    res.status(500).json({ error: "Failed to fetch user cart items" });
  }
};

// removing tje item from database
const removeItemFromDataBase =  async (req, res) => {
  const { userId, itemId } = req.params;

  try {
    // Find item to be removed
    const cartItem = await CartItem.findOne({ userId, itemId });

    // If  item not found,  error
    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in the cart" });
    }

    // Remove item from the database
    await CartItem.deleteOne({ userId, itemId });

    res.status(200).json({ message: "Item removed from the cart in the database" });
  } catch (error) {
    console.error("Error removing item from the cart in the database:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  addToCart,
  getcartitems,
  updateCartItemQuantity,
  deleteCartItem,
  clearCart,
  removefromcart,
  getcartitemsfororderpage,
  getUserCart,
  removeItemFromDataBase
};
