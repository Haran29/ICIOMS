// Import the Order model
const Order = require("../models/Order");
const OfflineOrder = require("../models/offlineOrder");
const nodemailer = require("nodemailer");
const User = require("../models/user");
const Item = require("../models/item");

//creating transporter object
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "viji69024@gmail.com",
    pass: "rjqj wwgz eyac yvia",
  },
});

// creating order and saving it in database
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

    const orderItems = items.map((item) => ({
      itemId: item.itemId,
      quantity: item.quantity,
      price: item.price,
      name: item.name,
      imageUrl: item.imageUrl,
    }));

    //upadting item qty
    for (const item of orderItems) {
      const existingItem = await Item.findById(item.itemId);
      if (existingItem && existingItem.quantity >= item.quantity) {
        existingItem.quantity -= item.quantity;
        await existingItem.save();
      } else {
        console.error(`Item ${item.itemId} is out of stock or not found`);
        return res
          .status(400)
          .json({ message: "Item out of stock or not found" });
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

    //creating mail format
    const mailOptions = {
      from: "vinoicecream@gmail.com",
      to: userEmail,
      subject: "Order Confirmation",
      html: `
        <h2>Thank you for your order!</h2>
        <p>Dear valued customer,</p>
        <p>We're excited to inform you that your order with ID <strong>${
          savedOrder._id
        }</strong>.</p>
        <h3>Order Details:</h3>
        <ul>
          ${orderItems
            .map(
              (item) => `
            <li>
              <strong>${item.name}</strong>
              <br />
              Quantity: ${item.quantity}
              <br />
              Price: ${item.price}
              <br />
              <img src="${item.imageUrl}" alt="${item.name}" width="100" />
            </li>
          `
            )
            .join("")}
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
        <p>Best regards,<br/>Vino Ice Cream Team</p>
      `,
    };

    //sending the mail to the user using node mail transporter
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).json({ orderId: savedOrder._id });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
};

// retrive order using userid
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

//retrive all orders
const getAllorder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

//update the order status and sending order status mail to custmer
const updateStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const result = await Order.updateOne({ _id: orderId }, { status });
    if (result.nModified === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const user = await User.findById(order.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userEmail = user.email;
    //sending mail only if status is completed
    if (status === "completed") {
      const mailOptions = {
        from: "vinoicecream@gmail.com",
        to: userEmail,
        subject: "Order Completed",
        html: `
          <h2>Your Order Has Been Completed!</h2>
          <p>Dear valued customer,</p>
          <p>We're excited to inform you that your order with ID <strong>${
            order._id
          }</strong> has been successfully completed and is now ready for delivery!</p>
          <h3>Order Details:</h3>
          <ul>
            ${order.items
              .map(
                (item) => `
              <li>
                <strong>${item.name}</strong>
                <br />
                Quantity: ${item.quantity}
                <br />
                Price: ${item.price}
                <br />
                <img src="${item.imageUrl}" alt="${item.name}" width="100" />
              </li>
            `
              )
              .join("")}
          </ul>
          <h3>Order Total: ${order.totalAmount}</h3>
          <p>Best regards,<br/>Vino Ice Cream Team</p>
        `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    }

    res.json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res
      .status(500)
      .json({ message: "Failed to update order status", error: error.message });
  }
};

// delete a order
const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await Order.deleteOne({ _id: orderId });

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Failed to delete order" });
  }
};

//creating and saving offline
const saveOfflineOrder = async (req, res) => {
  try {
    const { orderId, items, totalAmount } = req.body;

    const offlineOrder = new OfflineOrder({
      orderId,
      items,
      totalAmount,
    });
    const savedOrder = await offlineOrder.save();

    for (const item of items) {
      const existingItem = await Item.findById(item.itemId);
      if (existingItem && existingItem.quantity >= item.quantity) {
        existingItem.quantity -= item.quantity;
        await existingItem.save();
      } else {
        console.error(`Item ${item.itemId} is out of stock or not found`);
        return res
          .status(400)
          .json({ message: "Item out of stock or not found" });
      }
    }

    res.status(200).json({
      success: true,
      message: "Offline order saved successfully",
      order: savedOrder,
    });
  } catch (error) {
    // Handle  errors
    console.error("Error saving offline order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save offline order",
    });
  }
};

//updating order function
const updateOrder = async (req, res) => {
  const orderId = req.params.id;
  const updatedData = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(orderId, updatedData, {
      new: true,
    });

    if (updatedData.items) {
      let totalAmount = 0;
      updatedData.items.forEach((item) => {
        totalAmount += item.quantity * item.price;
      });
      updatedOrder.totalAmount = totalAmount;
      await updatedOrder.save();
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update order", error: error.message });
  }
};

//retriving offline order
const getofflineorder = async (req, res) => {
  try {
    const offlineOrders = await OfflineOrder.find();
    res.json(offlineOrders);
  } catch (error) {
    console.error("Failed to fetch offline orders:", error);
    res.status(500).json({ error: "Failed to fetch offline orders" });
  }
};

//deleitng offline order function
const deleteOfflineOrder = async (req, res) => {
  try {
    const deletedOrder = await OfflineOrder.findByIdAndDelete(
      req.params.orderId
    );
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(deletedOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete offline order" });
  }
};
//updating offline order
const updateOfflineOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const status = req.body;
    console.log(orderId, status);
    const updatedOrder = await OfflineOrder.updateOne(
      { _id: orderId },
      { status }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  handleOrder,
  getOrder,
  getAllorder,
  updateStatus,
  deleteOrder,
  saveOfflineOrder,
  updateOrder,
  getofflineorder,
  deleteOfflineOrder,
  updateOfflineOrder,
};
