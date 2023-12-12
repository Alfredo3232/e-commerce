import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});

    res.send(products);
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) return res.send(product);

    res.status(404);
    throw new Error("Resource not found");
});

const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name         : "Sample Name",
        price        : 0,
        user         : req.user._id,
        image        : "/images/sample.jpg",
        brand        : "Simple Brand",
        category     : "Sample category",
        countInStock : 0,
        numReviews   : 0,
        description  : "Sample description"
    });

    const createdProduct = await product.save();

    res.status(201).send(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock
    } = req.body;

    const product = await Product.findById(req.params.id);

    if(product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();

        res.send(updatedProduct);
    } else {
        res.status(404);
        throw new Error("Resource not found");
    }
});


export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct
};