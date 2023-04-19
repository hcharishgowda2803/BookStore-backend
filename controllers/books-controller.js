import book from "../models/book-model.js";
import {errorHandler, mongooseErrorHandler, response} from "../utils/response.js";


export const getAllBooks = (req,res)=>{
        book.find().exec().then((books) => {
            return response(200, books, res)
        }).catch((err) => {
            return mongooseErrorHandler(err, res)
        })
}

const validate = function (body){
    if(!body.book_title){
        return false
    }else if (!body.book_isbn){
        return false
    }else if (!body.book_genre){
        return false
    }else if (!body.price){
        return false
    }else if (!body.description){
        return false
    }else if (!body.cover_image){
        return false
    }else if (!body.discount){
        return false
    }else if (!body.published_year){
        return false
    }else if (!body.author_name){
        return false
    }else{
        return true
    }
}


export const addNewBook = (req,res)=>{
    book.findOne({book_isbn: req.body.book_isbn}).exec().then((doc)=>{
        if(doc){
            return errorHandler(409,'Already existed',res)
        }else{
            if(validate(req.body)){
                const new_book = new book({
                    book_title: req.body.book_title,
                    author_name: req.body.author_name,
                    book_genre:req.body.book_genre,
                    published_year:req.body.published_year,
                    price:req.body.price,
                    discount:req.body.discount,
                    cover_image:req.body.cover_image,
                    description:req.body.description,
                    book_isbn:req.body.book_isbn,
                })
                new_book.save().then(()=>{
                    return response(201, {new_book:new_book}, res)
                }).catch((err)=>{
                    mongooseErrorHandler(err,res);
                    console.log(err)
                })
            }
        }
    })
}


export const getBookById = (req,res)=>{
    console.log(req.params.id)
    book.findById(req.params.id).then((abook)=>{
       return  response(200,abook,res)
    }).catch((err)=>{
       return  mongooseErrorHandler(err,res)
    })
}

export const updateBook = (req,res)=>{
    book.findByIdAndUpdate(req.params.id,req.body).then((abook)=>{
        return response(200,abook,res)
    }).catch((err)=>{
        return  mongooseErrorHandler(err,res)
    })
}

export const deleteBook = (req,res)=>{
    book.findByIdAndDelete(req.params.id).then((doc)=>{
        return  response(200,{book_id:doc._id},res)
    }).catch((err)=>{
        return  mongooseErrorHandler(err,res)
    })
}
