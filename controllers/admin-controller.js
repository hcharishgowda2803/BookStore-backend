import Admins from "../models/admin-model.js";
import {errorHandler, mongooseErrorHandler, response} from "../utils/response.js";
import {bycrptPassword} from "../utils/bycrpto.js";



export const getAllAdmins = (req, res) => {
    Admins.find({},'first_name last_name phone_number email_address').exec().then((admins) => {
        response(200, admins, res)
    }).catch((err) => {
        mongooseErrorHandler(err, res)
    })
}

export const addAdmin = (req, res) => {
    let {first_name, last_name, phone_number ,email_address, password} = req.body
    Admins.findOne({email_address: email_address}).exec().then(async (doc) => {
        if (doc) {
            return errorHandler(409, 'Already exists', res);
        } else {
            const generateIds = () => {
                const randomNumbers = Math.floor(Math.random() * 10000);
                return `admin-${randomNumbers}`
            }
            const admin_id = generateIds();
            const hashedPassword = await bycrptPassword(password)

            const new_admin = new Admins({
                first_name: first_name,
                last_name: last_name,
                phone_number: phone_number,
                email_address: email_address,
                password: hashedPassword,
                _id: admin_id
            })
            new_admin.save().then(() => {
                return response(201, {new_admin:new_admin}, res)
            }).catch((err) => {
                console.log(err)
                mongooseErrorHandler(err, res)
            })
        }
    }).catch(err => {
        return mongooseErrorHandler(err, res)
    })
}


export const getById = (req,res)=>{
    Admins.findById(req.params.id,'first_name last_name phone_number email_address').exec().then((admin)=>{
        return response(200,admin,res)
    }).catch((err)=>{
       return  mongooseErrorHandler(err,res)
    })
}

export const updateAdmin = (req,res)=>{
    Admins.findByIdAndUpdate(req.params.id,req.body).exec().then((admin)=>{
         return response(200,admin,res)
    }).catch((err)=>{
       return mongooseErrorHandler(err,res)
    })
}
