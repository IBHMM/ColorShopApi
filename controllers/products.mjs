import { Product } from "../models/Product.js";

export const GetAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const GetProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({id});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const PostProduct = async (req, res) => {
    try {
        const { price, category, discount, image, title } = req.body;
        console.log(req.body);
        if (!price || !category || !image || !title) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const EditProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOneAndUpdate({id}, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const DeleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOneAndDelete({id});
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}