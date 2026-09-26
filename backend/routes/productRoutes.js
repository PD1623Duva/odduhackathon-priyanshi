const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// Create a product
router.post("/", async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Search products by name or SKU
router.get("/search", async (req, res) => {
    try {
        const query = req.query.q || "";

        const products = await Product.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { sku: { $regex: query, $options: "i" } }
            ]
        });

        res.json({
            success: true,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;