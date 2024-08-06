import { Router } from "express";
import { addToCard, addToWishlist, GetCard, GetWishList, removeFromCard, removeFromWishlist, signIn, signUp, signInAsAdmin } from "../controllers/user.mjs";

const user = Router();

user.post("/signin", (req, res) => signIn(req, res));

user.post("/admin", (req, res) => signInAsAdmin(req, res));

user.post("/signup", (req, res) => signUp(req, res));

user.get("/card/:id", (req, res) => GetCard(req, res));

user.patch("/card", (req, res) => addToCard(req, res));

user.delete("/card", (req, res) => removeFromCard(req, res));

user.get("/wishlist/:id", (req, res) => GetWishList(req, res));

user.patch("/wishlist", (req, res) => addToWishlist(req, res));

user.delete("/wishlist", (req, res) => removeFromWishlist(req, res));


export { user };
