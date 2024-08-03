import { Router } from "express";
import { DeleteProduct, EditProduct, GetAllBestSellers, GetAllNewArrivals, GetAllProducts, GetProductById, PostProduct } from "../controllers/products.mjs";

const pr = Router();

pr.get("/", (req, res) => GetAllProducts(req, res));

pr.get("/newarrivals", (req, res) => GetAllNewArrivals(req, res));

pr.get("/bestsellers", (req, res) => GetAllBestSellers(req, res));

pr.get("/:id", (req, res) => GetProductById(req,res));

pr.post("/add", (req, res) => PostProduct(req, res));

pr.patch("/:id", (req, res) => EditProduct(req, res));

pr.delete("/:id", (req, res) => DeleteProduct(req, res));

const ProductRouter = pr;

export {ProductRouter}