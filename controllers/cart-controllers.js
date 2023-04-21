import cartItems from "../models/cart-models.js";
import {errorHandler, mongooseErrorHandler, response} from "../utils/response.js";
import mongoose from "mongoose";


export const getCartItems = (req, res) => {
    cartItems.find({user_id: req.params.id}, 'cart_items').then((cartItem) => {
        return response(200, cartItem, res)
    }).catch((err) => {
        return mongooseErrorHandler(err, res)
    })
}


export const addItemsCart = async (req, res) => {
    const {id} = req.params;
    const {book_id, name, price, quantity, discount} = req.body;
    let order = await cartItems.findOne({_id: id})
    let new_order = null;
    if (!order) {
        new_order = new cartItems({
            _id: id,
            cart_items: [{
                _id: book_id,
                name: name,
                price: price,
                quantity: quantity,
                discount: discount,
                item_total: (price * quantity),
                item_total_discount: (price * quantity) * (1 - discount / 100)
            }],
        })
    } else {
        let item = await order.cart_items.find((item) => item._id.toString() === new mongoose.Types.ObjectId(book_id).toString())
        if (item) {
            item.quantity += Number(quantity),
                item.item_total = (item.price * item.quantity),
                item.item_total_discount = (item.price * item.quantity) * (1 - discount / 100)
        } else {
            order.cart_items.push({
                _id: book_id,
                name: name,
                price: price,
                quantity: quantity,
                discount: discount,
                item_total: (price * quantity),
                item_total_discount: (price * quantity) * (1 - discount / 100)
            })
        }
        new_order = order
    }
    let subtotal = 0;
    let total = 0;
    new_order.cart_items.map((item) => {
        if (item && item.item_total && item.item_total_discount) {
            subtotal += item.item_total;
            total += item.item_total_discount
            // new_order.sub_total += item.item_total
            // new_order.sub_total += (price * quantity)
            // new_order.total += item.item_total_discount
            // new_order.total += (price * quantity) * (1 - discount / 100)
        }
    })
    new_order.sub_total = subtotal
    new_order.total = total

    await new_order.save().then(() => {
        return response(201, {}, res)
    }).catch((err) => {
        // console.log(err)
        mongooseErrorHandler(err, res)
    })
}


export const updateCart = async (req, res) => {
    const {id} = req.params
    const {book_id} = req.body;
    cartItems.findById(id).then(async (userCart) => {
        if (userCart && userCart.cart_items) {
             userCart.cart_items.map(async (item, index) => {
                if (item._id.toString() === new mongoose.Types.ObjectId(book_id).toString()) {
                    if (item.quantity > 1) {
                        item.quantity -= 1;
                        item.item_total = (item.price * item.quantity),
                            item.item_total_discount = (item.price * item.quantity) * (1 - item.discount / 100)
                    } else {
                        userCart.cart_items.splice(index, 1)
                    }
                    let subtotal = 0;
                    let total = 0;
                    userCart.cart_items.map((item) => {
                        if (item && item.item_total && item.item_total_discount) {
                            subtotal += item.item_total;
                            total += item.item_total_discount
                        }
                    })
                    userCart.sub_total = subtotal
                    userCart.total = total
                    await userCart.save()
                }
            })
            response(200, userCart, res)
        }
    }).catch((err) => {
        mongooseErrorHandler(err, res)
    })

}
