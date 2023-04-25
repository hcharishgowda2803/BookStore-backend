
import express from "express";
import bodyParser from "body-parser";
import AdminRoute from "./routes/admin-route.js";
import mongoose from "mongoose";
import authRoute from "./routes/auth-route.js";
import booksRoute from "./routes/books-route.js";
import cartRoute from "./routes/cart-route.js";
import cors from "cors"
import {mongo, port} from "./config/config.js";


const PORT = port || 3001
const index = express();

index.use(bodyParser.json());
index.use(cors)


mongoose.connect(mongo ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('mongoDb connect successfully')
}).catch((err)=>{
    console.log('mongodb not connected')
})



index.get('/',(req, res)=>{
    res.send('server connected to'+PORT)
})

index.use('/auth',authRoute);

index.use('/admins',AdminRoute);

index.use('/books',booksRoute);

index.use('/cart',cartRoute);


index.listen(PORT,()=>{
    console.log('Sever is listing at',PORT)
})
