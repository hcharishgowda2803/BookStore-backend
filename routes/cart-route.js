import express from "express";
import {addItemsCart, getCartItems} from "../controllers/cart-controllers.js";


const router = express.Router();



router.get('/:id',getCartItems);
router.post('/:id',addItemsCart);




export default router
