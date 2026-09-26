const Product = require("../models/Product");
const StockLedger = require("../models/StockLedger");

// Receive stock
const receiveStock = async (req, res) => {
    try {
        const { productId, quantity, note } = req.body;

        if (!productId || !quantity || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Product ID and a positive quantity are required"
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const previousStock = product.stock;
        const newStock = previousStock + Number(quantity);

        product.stock = newStock;
        await product.save();

        await StockLedger.create({
            product: product._id,
            type: "RECEIPT",
            quantity: Number(quantity),
            previousStock,
            newStock,
            toLocation: product.location,
            note: note || "Stock received"
        });

        res.status(200).json({
            success: true,
            message: "Stock received successfully",
            product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Deliver stock
const deliverStock = async (req, res) => {
    try {
        const { productId, quantity, note } = req.body;

        if (!productId || !quantity || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Product ID and a positive quantity are required"
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (product.stock < Number(quantity)) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock"
            });
        }

        const previousStock = product.stock;
        const newStock = previousStock - Number(quantity);

        product.stock = newStock;
        await product.save();

        await StockLedger.create({
            product: product._id,
            type: "DELIVERY",
            quantity: Number(quantity),
            previousStock,
            newStock,
            fromLocation: product.location,
            note: note || "Stock delivered"
        });

        res.status(200).json({
            success: true,
            message: "Stock delivered successfully",
            product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Transfer stock to another location
const transferStock = async (req, res) => {
    try {
        const { productId, toLocation, note } = req.body;

        if (!productId || !toLocation) {
            return res.status(400).json({
                success: false,
                message: "Product ID and destination location are required"
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const fromLocation = product.location;
        const previousStock = product.stock;

        product.location = toLocation;
        await product.save();

        await StockLedger.create({
            product: product._id,
            type: "TRANSFER",
            quantity: product.stock,
            fromLocation,
            toLocation,
            previousStock,
            newStock: previousStock,
            note: note || "Stock transferred"
        });

        res.status(200).json({
            success: true,
            message: "Stock transferred successfully",
            product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Adjust stock
const adjustStock = async (req, res) => {
    try {
        const { productId, countedQuantity, note } = req.body;

        if (!productId || countedQuantity === undefined || countedQuantity < 0) {
            return res.status(400).json({
                success: false,
                message: "Product ID and a valid counted quantity are required"
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const previousStock = product.stock;
        const newStock = Number(countedQuantity);

        product.stock = newStock;
        await product.save();

        await StockLedger.create({
            product: product._id,
            type: "ADJUSTMENT",
            quantity: newStock - previousStock,
            previousStock,
            newStock,
            note: note || "Stock adjusted"
        });

        res.status(200).json({
            success: true,
            message: "Stock adjusted successfully",
            product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    receiveStock,
    deliverStock,
    transferStock,
    adjustStock
};