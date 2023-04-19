import cartItems from "../models/cart-models.js";
import {mongooseErrorHandler, response} from "../utils/response.js";


export const getCartItems = (req,res)=>{
    cartItems.find({user_id:req.params.id},'cart_items').then((cartItem)=>{
        return response(200,cartItem,res)
    }).catch((err)=>{
      return   mongooseErrorHandler(err,res)
    })
}


export const addItemsCart = async (req,res)=>{
    const {user_id}=req.params.id;
    const {id,name,price,quantity,discount} = req.body;
    let order = await cartItems.findOne({_id:req.params.id});
    console.log(order)
    let new_order = null ;
    if(!order){
        new_order = new cartItems({
         _id:user_id,
           cart_items:[{
              _id:id,
               name:name,
               price: price,
               quantity:quantity,
               discount:discount
          }],
            sub_total:price*quantity,
           total: (price*quantity)*(1-discount/100)
       })
    }else{
        let item = order.cart_items.find((item)=>item._id === id);
        console.log(item)
        if(item){
            item.quantity += quantity;
            item.sub_total = item.quantity * item.price
            item.total = (item.quantity * item.price)*(1-item.discount/100)
        }else{
            const new_item = {id,name,price,quantity}
            order.cart_items.push(new_item);
            order.sub_total += price*quantity;
            order.total += price*quantity*(1-discount/100);
        }
        new_order = order
    }

    await new_order.save().then(()=>{
          return response(201,{user_id:user_id},res)
    }).catch((err)=>{
        // console.log(err)
        mongooseErrorHandler(err,res)
    })
}
