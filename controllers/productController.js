const Product=require('../model/product');

exports.createProduct=async(req,res)=>{
    try{
        const addNew= await Product.create(req.body);
        res.status(201).json({message:"Product created succesfully", product: addNew});
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.getALLProducts=async (req,res)=>{
    try{
        const page=Number((req.query.page) || 1);
        const limit= Math.min(Number(req.query.limit) || 10, 50);
        const skip=(page-1)*limit;

        const products= await Product.find()
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit)

        res.json(products);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

exports.getProductById= async(req,res)=>{
    try{
        const id= req.params.id;
        const product=await Product.findById(id);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        res.json(product);
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.updateProduct=async(req,res)=>{
    try{
        const id=req.params.id;
        const data=req.body;
        const updatedProduct=await Product.findByIdAndUpdate(
            id,
            data,
            { new:true,
                runValidators: true
            }
        );
        if(!updatedProduct){
            return res.status(404).json({message:"Product not found"});
        }
        res.json({message:"Product updated succesfully", product: updatedProduct});
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.deleteProduct= async(req,res)=>{
    try{
        const id=req.params.id;
        const deletedProduct= await Product.findByIdAndDelete(id);
        if(!deletedProduct){
            return res.status(404).json({message:"Product not found"});
        }
        res.json({message:"Product deleted succesfully"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
};