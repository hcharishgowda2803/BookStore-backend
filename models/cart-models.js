import mongoose from "mongoose";



const cart_schema = new mongoose.Schema({
    _id :{
        type:String,
        require:true
    },
    cart_items:[
        {
            book_id:String,
            name:String,
            price:Number,
            quantity:Number,
            discount:Number,
            item_total:Number,
            item_total_discount:Number
        }
    ],
    total:{
        type:Number,
        require: true
    },
    sub_total:{
        type:Number,
        require:true
    }
})

let cartItems = new mongoose.model('cart',cart_schema,'cart-items')

export default cartItems
