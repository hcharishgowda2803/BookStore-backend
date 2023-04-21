import express from "express";
import {addItemsCart, getCartItems,updateCart} from "../controllers/cart-controllers.js";


const router = express.Router();



router.get('/:id',getCartItems);
router.post('/:id',addItemsCart);
router.put('/:id',updateCart)




export default router
