// Import the Order model
const Order = require("../models/Order");
const OfflineOrder = require("../models/offlineOrder")
const nodemailer = require('nodemailer');
const User = require("../models/user");
const Item = require("../models/item");


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'viji69024@gmail.com',
    pass: 'rjqj wwgz eyac yvia',
  },
});

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

    const orderItems = items.map(item => ({
      itemId: item.itemId,
      quantity: item.quantity,
      price: item.price,
      name: item.name,
      imageUrl: item.imageUrl,
    }));

    // Update the item quantities in the database
    for (const item of orderItems) {
      const existingItem = await Item.findById(item.itemId);
      if (existingItem && existingItem.quantity >= item.quantity) {
        existingItem.quantity -= item.quantity;
        await existingItem.save();
      } else {
        console.error(`Item ${item.itemId} is out of stock or not found`);
        return res.status(400).json({ message: 'Item out of stock or not found' });
      }
    }

    const newOrder = new Order({
      userId,
      phoneNumber,
      postalCode,
      city,
      streetAddress,
      items: orderItems,
      totalAmount,
      status,
    });

    const savedOrder = await newOrder.save();

    const user = await User.findById(userId);
    const userEmail = user.email;

    
    const mailOptions = {
      from: 'vinoicecream@gmail.com', // Update with your Gmail address
      to: userEmail,
      subject: 'Order Confirmation',
      html: `
        <h2>Thank you for your order!</h2>
        <p>Your order ID is <strong>${savedOrder._id}</strong>.</p>
        <h3>Order Details:</h3>
        <ul>
          ${orderItems.map(item => `
            <li>
              <strong>${item.name}</strong>
              <br />
              Quantity: ${item.quantity}
              <br />
              Price: ${item.price}
              <br />
              <img src="${item.imageUrl}" alt="${item.name}" width="100" />
            </li>
          `).join('')}
        </ul>
        <h3>Order Total: ${totalAmount}</h3>
        <h3>Shipping Address:</h3>
        <p>
          ${streetAddress},
          <br />
          ${city},
          <br />
          ${postalCode}
        </p>
        <p>We will notify you once your order has been shipped. Thank you for shopping with us!</p>
      `,
    };
    

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json({ orderId: savedOrder._id });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
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

const updateOrder = async (req, res) => {
  const orderId = req.params.id;
  const updatedData = req.body;

  try {
    // Validate if order exists
    const order = await Order.findById(orderId); // Use Order here
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update the order
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updatedData, { new: true }); // Use Order here

    // Calculate total amount if items are updated
    if (updatedData.items) {
      let totalAmount = 0;
      updatedData.items.forEach(item => {
        totalAmount += item.quantity * item.price;
      });
      updatedOrder.totalAmount = totalAmount;
      await updatedOrder.save();
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Failed to update order', error: error.message });
  }
};
module.exports = {
  handleOrder,
  getOrder,
  getAllorder,
  updateStatus,
  deleteOrder,
  saveOfflineOrder,
  updateOrder 
};
