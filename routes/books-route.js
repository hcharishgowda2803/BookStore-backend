import express from "express";
import book from "../models/book-model.js";
import {mongooseErrorHandler} from "../utils/response.js";
import {getAllBooks} from "../controllers/books-controller.js";


const router = express.Router();


router.get('/',getAllBooks);
