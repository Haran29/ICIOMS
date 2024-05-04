const mongoose = require("mongoose");

const promoCodeSchema = new mongoose.Schema({
  promoCode: {
    type: String,
    required: true,
    unique: true,
  },
  discountAmount: {
    type: Number,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
});

promoCodeSchema.statics.getAllPromoCodes = async function () {
  return await this.find({});
};

module.exports = mongoose.model("PromoCode", promoCodeSchema);
