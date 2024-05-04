// routes/promoCodeRoutes.js
const express = require("express");
const router = express.Router();
const PromoCode = require("../models/PromoCode");

// Route to create promo code
router.post("/api/create-promo-code", async (req, res) => {
  const { expiryDate, discountAmount, promoCode } = req.body;
  
  try {
    // Validate input
    if (!expiryDate || !discountAmount || !promoCode) {
      return res.status(400).json({ success: false, message: "Invalid input data" });
    }

    // Create new promo code
    const newPromoCode = new PromoCode({
      expiryDate,
      discountAmount,
      promoCode,
    });

    // Save promo code to database
    await newPromoCode.save();

    // Send success response
    res.status(201).json({ success: true, message: "Promo code created successfully" });
  } catch (error) {
    console.error("Error creating promo code:", error);
    res.status(500).json({ success: false, message: "Failed to create promo code" });
  }
});

// Validate user entered promocode
router.post("/api/validate-promo-code", async (req, res) => {
  const { promoCode } = req.body;

  try {
    // Fetch the promo code and discount amount from your database
    const promo = await PromoCode.findOne({ promoCode });
    if (promo) {
      // Return success with the fetched discount amount
      return res.status(200).json({ success: true, discount: promo.discountAmount });
    } else {
      // Return failure if the promo code is invalid
      return res.status(400).json({ success: false, message: "Invalid promo code" });
    }
  } catch (error) {
    console.error("Error validating promo code:", error);
    return res.status(500).json({ success: false, message: "Failed to validate promo code" });
  }
});

// Route to delete promo code
router.delete("/api/delete-promo-code", async (req, res) => {
  const { promoCode } = req.body;

  try {
    // Delete the promo code from the database
    const deletedPromoCode = await PromoCode.findOneAndDelete({ promoCode });

    if (!deletedPromoCode) {
      return res.status(404).json({ success: false, message: "Promo code not found" });
    }

    res.status(200).json({ success: true, message: "Promo code deleted successfully" });
  } catch (error) {
    console.error("Error deleting promo code:", error);
    res.status(500).json({ success: false, message: "Failed to delete promo code" });
  }
});

// Route to fetch all promo codes
router.get("/api/promo-codes", async (req, res) => {
  try {
    const promoCodes = await PromoCode.getAllPromoCodes();
    res.status(200).json(promoCodes);
  } catch (error) {
    console.error("Error fetching promo codes:", error);
    res.status(500).json({ success: false, message: "Failed to fetch promo codes" });
  }
});

module.exports = router;
