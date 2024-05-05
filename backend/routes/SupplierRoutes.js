const express =require("express");
const { CreateSupplier, updateSupplier, getAllSuppliers, getByIdSupplier, DeleteSupplier } = require("../controllers/SupplierController");
const router = express.Router();

router.post("/",CreateSupplier);
router.patch("/:suplierid",updateSupplier);
router.get("/",getAllSuppliers);
router.get("/:supplierid",getByIdSupplier);
router.delete("/:supplierid",DeleteSupplier);


module.exports = router;