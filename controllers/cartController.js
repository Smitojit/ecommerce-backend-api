const Cart=require('../model/Cart');
const product= require('../model/product');

exports.getMyCart=async(req,res)=>{
    try{
        const cart= await Cart.findOne({user:req.user._id}).populate("items.product","name price image");
        if(!cart){
            return res.status(200).json({message:"Cart is empty", 
                items:[],
                totalPrice:0
            });
        }

        res.status(200).json(cart);
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.addToCart=async(req,res)=>{
    try{
        const{productId, quantity}=req.body;

        const productData=await product.findById(productId);
        if(!productData){
            return res.status(404).json({message:"Product not found"});
        }

        const cart=await Cart.findOne({user:req.user._id});
        if(!cart){
            const newCart=await Cart.create({
                user:req.user._id,
                items:[{
                    product:productId,
                    quantity:quantity || 1,
                    price: productData.price,
                    }],
                totalPrice:(quantity || 1)*productData.price
            });

            return res.status(201).json(newCart);
        }

       const itemIndex=cart.items.findIndex(
        item=>item.product.toString()===productId.toString()
       );

       if(itemIndex>-1){
        cart.items[itemIndex].quantity+=quantity || 1;
       }else{
        cart.items.push({
            product:productData._id,
            quantity:quantity ||1,
            price:productData.price
        });
       }

       cart.totalPrice= cart.items.reduce(
        (total,item)=>total+item.price*item.quantity,
        0
       );

       await cart.save();
       res.status(200).json(cart);
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.removeFromCart=async(req,res)=>{
    try{
        const{productId}=req.params;
        const cart=await Cart.findOne({user:req.user._id});
        if(!cart){
            return res.status(404).json({message:"Cart Not Found"});
        }

        const originalLength=cart.items.length;

        cart.items= cart.items.filter(
            item=>item.product.toString()!==productId.toString()
        );

        if(cart.items.length===originalLength){
            return res.status(404).json({message:"Product not found in cart"});
        }

        cart.totalPrice=cart.items.reduce(
            (total,item)=> total+item.price*item.quantity,
            0
        );

        await cart.save();
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.clearCart=async(req,res)=>{
    try{
        const cart=await Cart.findOne({user:req.user._id});
        if(!cart){
            return res.status(404).json({message:"Cart Not Found"});
        }
        cart.items=[];
        cart.totalPrice=0;

        await cart.save();
        res.status(200).json({message:"Cart cleared succesfully"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
};