const User= require('../model/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const generateToken= (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'7d'});
};

exports.register= async(req,res)=>{
    const{name,email,password,role}=req.body;
    try{
        if(!name || !email || !password || !role){
            return res.status(400).json({message:"All fields are required"});
        }
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        const user= await User.create({
            name,
            email,
            password,
            role
        });
        const token=generateToken(user._id);
        res.status(201).json({
            message:"User registered successfully",
            token,
            user:{
                id: user._id.toString(),
                name: user.name,
                email:user.email,
                role:user.role
            }
       });
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.login=async(req,res)=>{
    const{email, password}=req.body;
    try{
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Inavlid email"});
        }
        const isMatch= await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid Password"});
        }
        const token= generateToken(user._id);
        res.status(200).json({
            message:"User logged in succesfully",
            token,
            user:{
                id:user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    }catch(err){
        return res.status(500).json({message:err.message});
    }
};

exports.getProfile=async(req,res)=>{
    res.json(req.user);
};
