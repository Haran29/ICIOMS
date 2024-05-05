const { response } = require("express");
const Payment = require("../models/Payment");
require("dotenv").config();
const nodemailer = require("nodemailer");

//creating transporter object
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "viji69024@gmail.com",
    pass: "rjqj wwgz eyac yvia",
  },
});

const handlePayment = (req, res) => {
  // Simulate a successful payment
  const simulatePayment = Math.random() < 0.8; // 80% chance of success

  if (simulatePayment) {
    res.status(200).json({
      success: true,
    });
  } else {
    res.status(400).json({ success: false, message: "Payment failed" });
  }
};

const savePayment = async (req, res) => {
  try {
    const { paymentId, userId, orderId, Method, amount } = req.body;

    let status;
    if (Method === "Card") {
      status = "Completed"; // Set status to "Completed" for Card payments
    } else if (Method === "Cash") {
      status = "Pending"; // Set status to "Pending" for Pay on Delivery payments
    } else {
      status = "Unknown"; // Handle other payment methods if needed
    }

    // Create a new Payment document
    const payment = new Payment({
      paymentId,
      userId,
      orderId,
      status,
      Method,
      amount,
    });

    // Save the payment details in the database
    await payment.save();

    // Send a success response
    res
      .status(201)
      .json({ message: "Payment details saved successfully", payment });
  } catch (error) {
    console.error("Error saving payment details:", error);
    // Send an error response
    res.status(500).json({
      message: "Failed to save payment details",
      error: error.message,
    });
  }
};

const getPaymentsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const payments = await Payment.find({ userId: userId }).sort({
      createdAt: "desc",
    });
    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ message: "Failed to fetch payments" });
  }
};

const fetchAllPayment = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: "desc" }); // Sort by createdAt in descending order
    res.status(200).json(payments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch payments", error: error.message });
  }
};

const updatePayment = async (req, res) => {
  try {
    const { status } = req.body;
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    if (status === "Completed") {
      const mailOptions = {
        from: "vinoicecream@gmail.com",
        to: "pramodravisanka.inno@gmail.com",
        subject: "Order Completed",
        html: `
        <h2>Your Payment Has Been Verified!</h2>
        <p>Dear valued customer,</p>
        <p>We're excited to inform you that your pending payment has been verified. <strong>
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

    res.status(200).json({ message: "Payment updated successfully", payment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update payment", error: error.message });
  }
};

const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete payment", error: error.message });
  }
};

module.exports = {
  handlePayment,
  savePayment,
  getPaymentsByUserId,
  fetchAllPayment,
  updatePayment,
  deletePayment,
};
