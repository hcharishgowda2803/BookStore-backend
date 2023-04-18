import jwt from "jsonwebtoken";
import {promise, reject} from "bcrypt/promises.js";


const secretKey = 'BookStoreApp123'


export const sign = function (user_id) {
    return new Promise((resolve, reject) => {
        let payload = {
            email_address: user_id
        }
        const accessToken = jwt.sign(payload, secretKey, {expiresIn: 30 * 24 * 60 * 60})
        resolve(accessToken)
    })
}

export const decode = function (token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, {}, (err, user) => {
            if (err) {
                reject(err)
            } else {
                resolve(user)
            }
        })
    })
}
