import mongoose from "mongoose";


let book_schema = new mongoose.Schema({
       book_title:{
           type:String,
           require:true
       },
      author_name:{
           type:String,
          require: true
      },
     book_genre:{
           type:String,
         require:true
     },
     published_year:{
           type:String,
         require:true
     },
     price:{
           type:Number,
         require:true
     },
    discount:{
      type:Number,
      require:true
    },
    cover_image:{
           type:String,
        require:true
    },
    description:{
           type:String,
        require:true
    },
    book_isbn:{
       type:String,
        require:true
    },
    review:{
           type:String,
        require:false
    },
    rating:{
           type:Number,
           require:false
    }
})

const book = new mongoose.model('books',book_schema,'books')

export default book
