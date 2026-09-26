const express = require("express");

const {
    receiveStock,
    deliverStock,
    transferStock,
    adjustStock,
    getInventory,
    getLedger
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
// Get current inventory
router.get("/", getInventory);

// Get stock ledger
router.get("/ledger", getLedger);

module.exports = router;