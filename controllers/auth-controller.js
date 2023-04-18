import Admins from "../models/admin-model.js";
import {errorHandler, mongooseErrorHandler} from "../utils/response.js";
import bycrpt from "bcrypt";
import {sign, decode} from "../utils/jwt.js"


export const login = (req, res) => {
    let {email_address, password} = req.body
    const adminData = Admins.findOne({email_address}).exec().then(async (admin) => {
        if (adminData) {
            const passwordMatch = await bycrpt.compare(password, admin.password,)
            if (passwordMatch) {
                const token = await sign(email_address);
                res.json({token})
            } else {
                return errorHandler(404, 'password is incorrect', res)
            }
        } else {
            errorHandler(404, 'User doesnt exist')
        }

    }).catch((err) => {
        return mongooseErrorHandler(err, res)
    })
}

export const authenticatejwt = async (req, res, next) => {
    const header = req.headers.authorization;
    await decode(header).then((user) => {
        next()
    }).catch((err) => {
        throw err
    })
}
