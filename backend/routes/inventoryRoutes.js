const express = require("express");

const {
    receiveStock,
    deliverStock,
    transferStock,
    adjustStock
} = require("../controllers/inventoryController");

const router = express.Router();

// Receive stock
router.post("/receipts", receiveStock);

// Deliver stock
router.post("/deliveries", deliverStock);

// Transfer stock
router.post("/transfers", transferStock);

// Adjust stock
router.post("/adjustments", adjustStock);

module.exports = router;