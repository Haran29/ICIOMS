const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  streetAddress: {
    type: String,
    required: true
  },
  items: [{
    itemId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'pending'
  }
}, {
  timestamps: true
});

const OrderModel = mongoose.model('Order', orderSchema);
module.exports = OrderModel;
