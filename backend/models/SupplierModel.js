const mongoose = require("mongoose");

const SupplierSchema= mongoose.Schema(
    {
        SupplierName: {
            type: String,
            required: [true, "Please enter  supplier Name"],
          
          },  
      
          SupplierID: {
            type: String,
            required: [true, "Please enter the supplier ID"],
            unique :[true,"Supply ID cannot be same"]
          },
      
          SupplierEmail: {
            type: String,
            required: [true, "Please enter the supplier Email"],
          },
      
          SupplierContact: {
            type: Number,
            required: true,
          },
      
          ProductId: {
            type: String,
         
          },
          
          ProductName: {
            type:String,
            required: [true, "Please enter the Product Name"],
          },
      
        SupplierProductPrice: {
            type: Number,
            required: true
        },
      

        MaxSupply:{
         type:Number,
        },
    },
    {
        timestamps: true
    }
);



const Supplier = mongoose.model("suppliers",SupplierSchema)

module.exports = Supplier;
