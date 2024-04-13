const mongoose = require("mongoose");

//Creating the backend of the database

const ProductSchema = mongoose.Schema(
  {
    batchID: {
      type: String,
      required: [true, "Please enter Batch ID"],
      unique: true, //Making the Batch ID Unique for each batch
    },

    batchName: {
      type: String,
      required: [true, "Please enter the Batch Name"],
    },

    quantity: {
      type: Number,
      required: [true, "Please enter the Quantity"],
    },

    CurrentDate: {
      type: Date,
      default: Date.now, //this will automatically set the current date when the document is created
    },

    receivedDate: {
      type: Date,
      required: [true, "Please enter the Batch Received Date"],
    },

    intensity: {
      type: Number,
      min: 0,
      max: 10,
    },

    aroma: {
      type: Number,
      min: 0,
      max: 10,
    },

    sweetness: {
      type: Number,
      min: 0,
      max: 10,
    },

    aftertaste: {
      type: Number,
      min: 0,
      max: 10,
    },

    consistency: {
      type: Number,
      min: 0,
      max: 10,
    },

    appearence: {
      type: Number,
      min: 0,
      max: 10,
    },

    packageQuality: {
      type: Number,
      min: 0,
      max: 10,
    },

    melting: {
      type: Number,
      min: 0,
      max: 10,
    },

    overallScore: {
      type: Number,
      min: 0,
      max: 100,
    },

    status: {
      type: String,
      enum: ["Approved", "Rejected"],
    },
  },

  {
    timestamps: true,
  }
);

// Define a pre-save hook to determine the status
ProductSchema.pre("save", function (next) {
  this.status = this.overallScore >= 64 ? "Approved" : "Rejected";
  next();
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
