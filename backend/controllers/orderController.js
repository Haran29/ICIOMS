// Import the Order model
const Order = require("../models/Order");
const OfflineOrder = require("../models/offlineOrder")
// Handle order creation
const handleOrder = async (req, res) => {
  try {
    const {
      userId,
      phoneNumber,
      postalCode,
      city,
      streetAddress,
      items,
      totalAmount,
      status,
    } = req.body;

    // Map through the items to extract itemId, quantity, price, name, and imageUrl
    const orderItems = items.map(item => ({
      itemId: item.itemId,
      quantity: item.quantity,
      price: item.price,
      name: item.name,      // Add name
      imageUrl: item.imageUrl // Add imageUrl
    }));

    const newOrder = new Order({
      userId,
      phoneNumber,
      postalCode,
      city,
      streetAddress,
      items: orderItems, // Use the updated orderItems array
      totalAmount,
      status,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
};

const getOrder = async (req, res) => {
  const userId = req.params.userId;

  try {
    const orders = await Order.find({ userId: userId }).populate(
      "items.itemId"
    );

    if (!orders) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getAllorder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

const updateStatus =  async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const result = await Order.updateOne({ _id: orderId }, { status });
    if (result.nModified === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: 'Failed to update order status', error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await Order.deleteOne({ _id: orderId });

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Failed to delete order' });
  }
}


const saveOfflineOrder =  async (req, res) => {
  try {
    const { orderId, items, totalAmount } = req.body;
    // Create a new offline order document
    const offlineOrder = new OfflineOrder({
      orderId,
      items,
      totalAmount
    });

    // Save the offline order to the database
    const savedOrder = await offlineOrder.save();

    // Respond with a success message and the saved order
    res.status(200).json({
      success: true,
      message: 'Offline order saved successfully',
      order: savedOrder
    });
  } catch (error) {
    // Handle any errors
    console.error('Error saving offline order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save offline order'
    });
  }
};
module.exports = {
  handleOrder,
  getOrder,
  getAllorder,
  updateStatus,
  deleteOrder,
  saveOfflineOrder
};
