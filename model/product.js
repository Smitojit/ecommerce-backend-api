const mongoose= require('mongoose');

const productSchema=new mongoose.Schema({
    name:{type:String,
          required:[true,"Product name is required"],
          trim:true,
    },
    description:{type:String,
                 required:[true,"Product description is required"],
                 trim:true,        
    },
    price:{type:Number,
        required:[true,"Product price is required"],
        min:0,
    },
    category:{type:String,
              required:[true,"Product category is required"],
              trim:true,
    },
    stock:{type:Number,
        required:true,
        min:0,
        default:0,
    },
    image:{type:String,
           default:"",
    },
},{timestamps:true});

module.exports=mongoose.model("Product",productSchema);