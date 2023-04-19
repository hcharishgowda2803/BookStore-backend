import express from "express";
import bodyParser from "body-parser";
import AdminRoute from "./routes/admin-route.js";
import mongoose from "mongoose";
import authRoute from "./routes/auth-route.js";
import booksRoute from "./routes/books-route.js";
import cartRoute from "./routes/cart-route.js";
// import cors from "cors"



const app = express();
const PORT = 3200

app.use(bodyParser.json());
// app.use(cors)


mongoose.connect('mongodb+srv://root:root123@harish.tabtvlq.mongodb.net/bookstore01',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('mongoDb connect successfully')
}).catch((err)=>{
    console.log('mongodb not connected')
})



app.get('/',(req,res)=>{
    res.send('server connected to'+PORT)
})

app.use('/auth',authRoute)

app.use('/admins',AdminRoute)

app.use('/books',booksRoute)

app.use('/cart',cartRoute)


app.listen(PORT,()=>{
    console.log('Sever is listing at',PORT)
})
