import { Router } from "express";
import { addToCard, addToWishlist, GetCard, GetWishList, removeFromCard, removeFromWishlist, signIn, signUp } from "../controllers/user.mjs";

const user = Router();

user.post("/signin", (req, res) => signIn(req, res));

user.post("/signup", (req, res) => signUp(req, res));

user.get("/card", (req, res) => GetCard(req, res));

user.post("/card", (req, res) => addToCard(req, res));

user.delete("/card", (req, res) => removeFromCard(req, res));

user.get("/wishlist", (req, res) => GetWishList(req, res));

user.post("/wishlist", (req, res) => addToWishlist(req, res));

user.delete("/wishlist", (req, res) => removeFromWishlist(req, res));


export { user };