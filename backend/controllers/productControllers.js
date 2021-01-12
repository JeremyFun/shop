import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc     Fetch all products
// @route    GET /api/products?keyword="keyword"&pageNumber="pageNumber"
// @access   Public
export const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))

    res.json({products, page, pages: Math.ceil(count / pageSize)})
})



// @desc     Fetch single product
// @route    GET /api/products/id
// @access   Public
export const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error("Product not found")
    }

})

// @desc     Delete product
// @route    DELETE /api/products/id
// @access   Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({message: "Product removed"})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc     Create product
// @route    POST /api/products
// @access   Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        user: req.user._id,
        name: 'Sample name',
        price: 0,
        image: '/images/sample.jpg',
        description:
            'Sample description',
        brand: 'Sample',
        category: 'Sample',
        countInStock: 0,
        numReviews: 0,
    })
    if (product) {
        const createdProduct = await product.save()
        res.status(201).json(createdProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc     Update product
// @route    POST /api/products/id
// @access   Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    const {
        name,
        image,
        description,
        brand,
        category,
        countInStock,
        numReviews,
        price
    } = req.body
    if (product) {
        product.name = name
        product.price = price
        product.image = image
        product.description = description
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        product.numReviews = numReviews
        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc     Update product
// @route    POST /api/products/id
// @access   Private/Admin
export const createProductReviews = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    const {
        rating, comment
    } = req.body
    if (product) {
        const alreadyReviews = product.reviews.find(p => p.user.toString() === req.user.user._id.toString())

        if (alreadyReviews) {
            res.status(401).json({message: "Reviews already"})
        }

        const reviews = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }
        product.reviews.push(reviews)
        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.numReviews
        await product.save()
        res.status(201).json({message: "Reviews add"})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc     get rating top products
// @route    GET /api/products/top
// @access   Public
export const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({rating: -1}).limit(3)
    res.json(products)
})

export default { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReviews, getTopProducts }