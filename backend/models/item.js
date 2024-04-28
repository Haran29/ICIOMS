const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    flavor: {
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
    },
    image: {
        type: String,
        required: true
    },
    expiryDate: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },

});






const ItemModel = mongoose.model("Item", itemSchema);
module.exports = ItemModel;
