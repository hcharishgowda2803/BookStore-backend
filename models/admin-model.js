import mongoose from "mongoose"

let admin_schema = new mongoose.Schema({
    first_name:{
        type:String,
        require:true
    },
    last_name:{
        type:String,
        require:true
    },
    phone_number:{
        type:String,
        require:true
    },
    email_address:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    _id:{
        type:String,
        require:true
    }
})

const Admins = mongoose.model('admins',admin_schema,"admins")

export default Admins
