const { response } = require("express");
const CartItem = require("../models/CartItem");


const addToCart = async (req, res) => {
  try {
    const { itemId, userId } = req.body;

    // Validate if itemId and userId are provided
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

    // Check if the item already exists in the cart for the user
    let cartItem = await CartItem.findOne({ itemId, userId });

    if (cartItem) {
      // If the item exists, increase its quantity
      cartItem.quantity += 1;
    } else {
      // If the item doesn't exist, create a new cart item
      cartItem = new CartItem({
        userId,
        itemId,
        quantity: 1
      });
    }

    // Save the cart item to the database
    await cartItem.save();

   
    res.json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};


const getcartitems = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Find cart items associated with the user ID
    const cartItems = await CartItem.find({ userId }).populate('itemId');
    res.json(cartItems);
  } catch (error) {
    console.error('Failed to fetch cart items:', error);
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
}



// Update quantity of an individual item in the cart
const updateCartItemQuantity = async (req, res) => {
  try {
    const { cartItemId, quantity } = req.body;
    // Update the quantity of the specified item for the user
   
    await CartItem.updateOne({ _id: cartItemId  }, { quantity });
    res.status(200).json({ message: 'Quantity updated successfully' });
  } catch (error) {
    console.error('Failed to update quantity:', error);
    res.status(500).json({ error: 'Failed to update quantity' });
  }
};

// Delete an individual item from the cart
const deleteCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.body;
    console.log( req.body)
    
    // Delete the specified item from the user's cart
    await CartItem.deleteOne({_id: cartItemId  });
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Failed to delete item:', error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
};

// Clear the entire cart for a user
const clearCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Delete all items from the user's cart
    await CartItem.deleteMany({ userId });
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Failed to clear cart:', error);
    res.status(500).json({ error: 'Failed to clear cart' });
  }
};

const removefromcart  = async (req, res) => {
  const { itemId, userId } = req.body;

  try {
    // Find the cart item in the database
    const cartItem = await CartItem.findOne({ itemId, userId });

    // If the item exists in the cart, decrement its quantity
    if (cartItem) {
      // If quantity is already 0, do nothing
      if (cartItem.quantity === 0) {
        return res.status(400).json({ message: "Item quantity is already 0." });
      }
      cartItem.quantity--; // Decrement quantity
      await cartItem.save(); // Save the updated cart item
      res.status(200).json({ message: "Item removed from cart successfully.", cartItem });
    } else {
      // If the item is not found in the cart, return an error
      res.status(404).json({ message: "Item not found in the cart." });
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

const getcartitemsfororderpage =async (req, res) => {
  try {
    const userId = req.params.userId;
    // Find cart items associated with the user ID
    const cartItems = await CartItem.find({ userId });
    res.json(cartItems);
  } catch (error) {
    console.error('Failed to fetch cart items:', error);
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
}

module.exports = { addToCart,getcartitems,updateCartItemQuantity,
  deleteCartItem,
  clearCart,removefromcart,getcartitemsfororderpage };
