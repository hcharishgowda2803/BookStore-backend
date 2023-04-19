import express from "express";
import {addNewBook, deleteBook, getAllBooks, getBookById, updateBook} from "../controllers/books-controller.js";
import {getById} from "../controllers/admin-controller.js";


const router = express.Router();


router.get('/',getAllBooks);
router.get('/:id',getBookById);
router.post('/',addNewBook);
router.delete('/:id',deleteBook);
router.put('/:id',updateBook)







export default router
