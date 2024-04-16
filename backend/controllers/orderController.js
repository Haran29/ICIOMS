// Import the Order model
const Order = require("../models/Order");

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

    const newOrder = new Order({
      userId,
      phoneNumber,
      postalCode,
      city,
      streetAddress,
      items,
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

module.exports = {
  handleOrder,
  getOrder,
  getAllorder,
  updateStatus
};
