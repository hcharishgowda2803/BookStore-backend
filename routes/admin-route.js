import express from "express";
import {addAdmin, getAllAdmins, getById, updateAdmin} from "../controllers/admin-controller.js";
import {authenticatejwt} from "../controllers/auth-controller.js";


const router = express.Router()


router.get('/',authenticatejwt, getAllAdmins);

router.get('/:id',authenticatejwt,getById);

router.post('/',authenticatejwt,addAdmin);

router.put('/:id',authenticatejwt,updateAdmin);


export default router
