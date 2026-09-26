const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        sku: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        unit: {
            type: String,
            required: true,
            trim: true
        },

        stock: {
            type: Number,
            default: 0,
            min: 0
        },

        location: {
            type: String,
            default: "Main Warehouse",
            trim: true
        },

        lowStockThreshold: {
            type: Number,
            default: 10,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Product", productSchema);