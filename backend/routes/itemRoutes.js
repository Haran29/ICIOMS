const express = require("express");
const router = express.Router();


const { addItem, deleteItem, updateItem, getMenuItem, generateReport,updateItems ,getItemDetails} = require('../controllers/itemsController');
const { getItemById } = require('../controllers/itemsController');

// Add Item Route
router.post('/add-item', addItem);
// Read Item Route
router.get('/get-menuItem', getMenuItem)
// Delete Item Route
router.delete('/delete-item/:id', deleteItem);
// Update Item Route
router.put('/update-item/:id', updateItem);
// Generate Report Route
router.get('/generate-report', generateReport);
// Get single item by ID
router.get('/get-item/:id', getItemById);

router.get('/get-menuItem/:id',getItemDetails );

// Route to update a product
router.put('/update-item/:id',updateItems );


module.exports = router;
