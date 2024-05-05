const express =require("express");
const { CreateOrder, getOngoingOrder, getConformedOrder, conformeOrder } = require("../controllers/SupplierOrderController");
const router = express.Router();

router.post("/:supplierid",CreateOrder);
router.get("/ongoing-order",getOngoingOrder);
router.get("/conformed-order",getConformedOrder);
router.patch("/:orderid",conformeOrder);



module.exports = router;