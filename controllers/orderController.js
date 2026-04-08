const Order= require('../model/Order');

exports.createOrder= async(req,res)=>{
   
    try{
        const{items, totalAmount, shippingAddress}=req.body;

        if(!items || items.length===0){
            return res.status(400).json({message:"Order items are required"});
        }
        const newOrder= await Order.create({
            user:req.user._id,
            items:req.body.items,
            totalAmount:req.body.totalAmount,
            shippingAddress:req.body.shippingAddress
        });
        res.status(201).json({message:"Order created succefully",order: newOrder});
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.getMyOrders=async(req,res)=>{
    try{
        const getOrder=await Order.find({user:req.user._id});

        res.status(200).json({orders:getOrder});
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.getOrderById=async(req,res)=>{
    try{
        const order=await Order.findById(req.params.id);
        if(!order){
            return res.status(404).json({message:"Order Not Found"});
        }
        if(order.user.toString()!==req.user._id.toString() && req.user.role!=='admin'){
            return res.status(403).json({message:"Access denied"});
        }
        res.status(200).json({message:"Order fetched", order:order});
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.updateOrderById=async(req,res)=>{
    try{
        const orderId=req.params.id;
        const {orderStatus,paymentStatus}=req.body;
        const updateData={};
        if(orderStatus){
            updateData.orderStatus=orderStatus;
        }
        if(paymentStatus){
            updateData.paymentStatus=paymentStatus;
        }

        if(Object.keys(updateData).length===0){
            return res.status(400).json({message:"Nothing to update"});
        }
        const updateOrder= await Order.findByIdAndUpdate(
            orderId,
            updateData,
            {
                new:true,
                runValidators:true
            }
        );
        if(!updateOrder){
            return res.status(404).json({message:"Order Not Found"});
        }
        res.status(200).json({message:"Order updated successfully", order:updateOrder});
    }catch(err){
        res.status(500).json({message:err.message});
    }
    
};

exports.deleteOrderById=async(req,res)=>{
    try{
        const orderId=req.params.id;
        const deleteOrderById=await Order.findByIdAndDelete(orderId);
        if(!deleteOrderById){
            return res.status(404).json({message:"Order Not Found"});
        }
        res.status(200).json({message:"Order deleted succesfully"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
};