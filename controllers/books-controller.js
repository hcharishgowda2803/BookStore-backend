import book from "../models/book-model.js";
import {mongooseErrorHandler, response} from "../utils/response.js";


export const getAllBooks = (req,res)=>{
        book.find().exec().then((books) => {
            return response(200, books, res)
        }).catch((err) => {
            return mongooseErrorHandler(err, res)
        })
}
