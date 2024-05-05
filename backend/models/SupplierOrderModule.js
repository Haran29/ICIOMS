const mongoose = require("mongoose");

const SupplierOrderSchema= mongoose.Schema(
    {   
        OrderDate: {
          type: Date,
          required: [true, "Please enter the order date"],
          default: Date.now,
        },

        ProductName: {
          type: String,
          required: [true, "Please enter the product name"],
        },
            
        ProductId: {
          type: String,
        },
        
        SupplierProductPrice: {
          type: Number,
          required: [true, "Please enter the product price"],
        },
        
        OrderQuantity: {
          type: Number,
          required: [true, "Please enter the order quantity"],
        },
        
        OrderStatus: {
          type: Boolean,
          default:false
        },
        
        Amount: {
          type: Number,
        },

        SupplierName: {
          type: String,
        },
        SupplierID: {
          type: String,
        },

    },
    {
        timestamps: true
    }
);

const SupplierOrder = mongoose.model("supplierOrders",SupplierOrderSchema)
module.exports = SupplierOrder;
