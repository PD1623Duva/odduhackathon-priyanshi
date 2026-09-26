const mongoose = require("mongoose");

const stockLedgerSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        type: {
            type: String,
            enum: [
                "RECEIPT",
                "DELIVERY",
                "TRANSFER",
                "ADJUSTMENT"
            ],
            required: true
        },

        quantity: {
            type: Number,
            required: true
        },

        fromLocation: {
            type: String,
            default: null
        },

        toLocation: {
            type: String,
            default: null
        },

        previousStock: {
            type: Number,
            required: true
        },

        newStock: {
            type: Number,
            required: true
        },

        note: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("StockLedger", stockLedgerSchema);