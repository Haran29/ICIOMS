const asyncHandler = require("express-async-handler");
const Supplier = require("../models/SupplierModel");


const CreateSupplier = asyncHandler(async(req,res)=>{
    try{
        const {
            SupplierName, 
            SupplierID, 
            SupplierEmail, 
            SupplierContact, 
            ProductName, 
            ProductId, 
            SupplierProductPrice, 
            SupplierOrderStatus, 
            MaxSupply
        } =req.body

        const newSupplier = await Supplier.create({
            SupplierName, 
            SupplierID, 
            SupplierEmail, 
            SupplierContact, 
            ProductName, 
            ProductId, 
            SupplierProductPrice, 
            SupplierOrderStatus, 
            MaxSupply
        })

        res.status(201).json(newSupplier);

    }catch (error) {
        console.error("Error occour creating new supplier:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
// } catch (error) {
//     // Check if the error is due to duplicate SupplierID
//     if (error.code === 11000 && error.keyPattern && error.keyPattern.SupplierID) {
//         alert("suplier id already exists");
//     } else {
//         console.error("Error occurred creating new supplier:", error);
//         res.status(500).json({ success: false, error: "Internal Server Error" });
//     }
// }
})


const updateSupplier = asyncHandler(async(req,res)=>{
    try{
        const supplier = await Supplier.findById(req.params.suplierid)
        console.log(supplier);
        const {
            SupplierName, 
            SupplierID, 
            SupplierEmail, 
            SupplierContact, 
            ProductName, 
            ProductId, 
            SupplierProductPrice, 
            SupplierOrderStatus, 
            MaxSupply
        } =supplier
        

        supplier.SupplierName = req.body.SupplierName  || SupplierName 
        supplier.SupplierID = req.body.SupplierID  || SupplierID 
        supplier.SupplierEmail = req.body.SupplierEmail  || SupplierEmail 
        supplier.SupplierContact = req.body.SupplierContact  || SupplierContact 
        supplier.ProductName = req.body.ProductName  || ProductName 
        supplier.ProductId = req.body.ProductId  || ProductId 
        supplier.SupplierProductPrice = req.body.SupplierProductPrice  || SupplierProductPrice 
        supplier.SupplierOrderStatus = req.body.SupplierOrderStatus  || SupplierOrderStatus 
        supplier.MaxSupply = req.body.MaxSupply  || MaxSupply

        const updateSupplier  = await supplier.save()
        console.log("updated");
        res.status(200).json(updateSupplier)


    }catch (error) {
        console.error("Error occour updating supplier:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
})



const getAllSuppliers = asyncHandler(async(req,res)=>{
    try{
        const supplier = await Supplier.find();
        res.status(200).json(supplier)

    }catch (error) {
    console.error("Error occour getting all suppliers:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
}
})


const getByIdSupplier = asyncHandler(async(req,res)=>{
    try{
        const supplierId = req.params.supplierid
        const supplier = await Supplier.findById(supplierId)
        res.status(200).json(supplier)

    }catch (error) {
    console.error("Error occour Getting by params:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
}
})

const DeleteSupplier = asyncHandler(async(req,res)=>{
    try{
        const supplierId = req.params.supplierid
        await Supplier.deleteOne({_id:supplierId})
        res.status(200).json({message:"Supplier deleted Successfull"})

    }catch (error) {
    console.error("Error occour Getting by params:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
}
})


module.exports = {
    CreateSupplier,
    updateSupplier,
    getAllSuppliers,
    getByIdSupplier,
    DeleteSupplier
}

