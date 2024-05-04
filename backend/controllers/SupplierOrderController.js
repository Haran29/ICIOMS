const asyncHandler = require("express-async-handler");
const Supplier = require("../models/SupplierModel");
const SupplierOrder = require("../models/SupplierOrderModule");
const sendEmail = require("../utils/sendEmail");

const CreateOrder = asyncHandler(async(req,res)=>{
    
    try{
        const  {OrderQuantity} = req.body

        const supplier = await Supplier.findById(req.params.supplierid)

        const orderAmount = OrderQuantity * supplier.SupplierProductPrice

        const  order = await SupplierOrder.create({
            ProductName:supplier.ProductName,
            ProductId:supplier.ProductId,
            SupplierProductPrice:supplier.SupplierProductPrice,
            SupplierName:supplier.SupplierName,
            SupplierID:supplier.SupplierID,
            OrderQuantity,
            Amount:orderAmount
        })

        const message = `
            <h1>Order Confirmation - VINO Ice Cream Pvt<h1>
            <h2> Dear Supplier, ${supplier.SupplierName}</h2>
            <p>You have a order for ${supplier.ProductName}</p>
            <p>Qantity:${OrderQuantity}</p>
            <p>we are paying for you Rs.${orderAmount}</p>

            <p>Best,
            Management
            VINO Ice Cream Pvt</p>
        `

        const subject = "You have a Order"
        const send_to = supplier.SupplierEmail
        const sent_from = process.env.EMAIL_USER

        await sendEmail(subject, message, send_to, sent_from, )
        res.status(201).json(order)

    }catch (error) {
        console.error("Error occour creating new order:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
})



const getOngoingOrder = asyncHandler(async(req,res)=>{
    try{
        const order = await SupplierOrder.find({OrderStatus:false}).sort({OrderDate:-1});
        res.status(200).json(order)
    }catch (error) {
    console.error("Error occour getting ongoing order:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
}
})

const getConformedOrder = asyncHandler(async(req,res)=>{
    try{
        const order = await SupplierOrder.find({OrderStatus:true}).sort({OrderDate:-1});
        res.status(200).json(order)

    }catch (error) {
    console.error("Error occour getting conformed order:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
}
})



const conformeOrder = asyncHandler(async(req,res)=>{
    try{
        const order = await SupplierOrder.findOneAndUpdate(
            { _id: req.params.orderid},
            { $set: {"OrderStatus":true}}
            )

    }catch (error) {
    console.error("Error occour getting conform order:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
}
})


module.exports = {
    CreateOrder,
    getOngoingOrder,
    getConformedOrder,
    conformeOrder,
}

