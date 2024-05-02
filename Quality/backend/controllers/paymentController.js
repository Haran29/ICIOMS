const { response } = require("express");
require("dotenv").config();
const handlePayment = (req, res) => {
    // Simulate a successful payment
    // You can add more conditions to simulate failures or other scenarios
    const simulatePayment = Math.random() < 0.8; // 80% chance of success
    
    if (simulatePayment) {
      res.status(200).json({ message: 'Payment successful' });
    } else {
      res.status(400).json({ message: 'Payment failed' });
    }
  }



module.exports = {
    handlePayment
  };
  