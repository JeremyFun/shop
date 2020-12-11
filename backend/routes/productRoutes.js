import {Router} from 'mongoose'
import asyncHandler from "express-async-handler";
import Product from "../models/productModel";
const router = Router()

router.get('/api/products', asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
}))

router.get('/api/products/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    res.json(product)
}))

export default router