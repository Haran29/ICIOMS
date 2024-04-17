const mongoose = require('mongoose');
const offlineOrderSchema = new mongoose.Schema({
    orderId: {
      type: String,
      required: true,
      unique: true
    },
    items: [
      {
        itemId: {
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        total: {
          type: Number,
          required: true
        }
      }
    ],
    totalAmount: {
      type: Number,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  // Create offlineOrder model
  const OfflineOrder = mongoose.model('OfflineOrder', offlineOrderSchema);
  
  module.exports = OfflineOrder;