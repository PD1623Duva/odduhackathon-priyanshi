const Product = require("../models/Product");
const StockLedger = require("../models/StockLedger");

const calculateAdjustment = (systemStock, physicalCount) => {
    return Number(physicalCount) - Number(systemStock);
};

const validateQuantity = (quantity) => {
    return Number(quantity) > 0;
};

const getStockDifference = (previousStock, newStock) => {
    return Number(newStock) - Number(previousStock);
};

const createLedgerData = ({
    productId,
    type,
    quantity,
    previousStock,
    newStock,
    fromLocation,
    toLocation,
    note
}) => {
    return {
        product: productId,
        type,
        quantity,
        previousStock,
        newStock,
        ...(fromLocation && { fromLocation }),
        ...(toLocation && { toLocation }),
        note
    };
};

const getProduct = async (productId) => {
    const product = await Product.findById(productId);

    if (!product) {
        throw new Error("Product not found");
    }

    return product;
};

const getInventorySummary = async () => {
    const products = await Product.find();

    const totalProducts = products.length;

    const totalStock = products.reduce(
        (total, product) => total + Number(product.stock || 0),
        0
    );

    const lowStockProducts = products.filter(
        (product) =>
            product.reorderLevel !== undefined &&
            Number(product.stock || 0) <= Number(product.reorderLevel)
    );

    const outOfStockProducts = products.filter(
        (product) => Number(product.stock || 0) === 0
    );

    return {
        totalProducts,
        totalStock,
        lowStockItems: lowStockProducts.length,
        outOfStockItems: outOfStockProducts.length
    };
};

module.exports = {
    calculateAdjustment,
    validateQuantity,
    getStockDifference,
    createLedgerData,
    getProduct,
    getInventorySummary
};