const User = require("../models/user")
const validate =require('../utils/validator')
const bcrypt = require("bcrypt")
const jwt =require('jsonwebtoken');


const register = async(req,res)=>{
    
    try{
        //validate the data 
        validate(req.body);
        const {firstName, emailId ,password} =req.body;
        
        //hash the password
        req.body.password = await bcrypt.hash(password,10);


        const user =await User.create(req.body);

       //token creation 
       const token = jwt.sign({_id:user._id,emailId : emailId},process.env.JWT_KEY,{expiresIn : 60*60});

       res.cookie('token',token,{maxAge:60*60*1000});
       res.status(201).send("User Registered Successfully");

    }
    catch(err){
       res.status(400).send("Error" + err);
    }
}

const login = async(req,res)=>{

    try{
        const {emailId, password}= req.body;
        
        if(!emailId)
         throw new Error(" Invalid Credential ");

         if(!password)
         throw new Error(" Invalid Credential ");

         const user = await User.findOne({emailId});

        const match = bcrypt.compare(password, user.password);

        if(!match)
        throw new Error(" Invalid Credential ");
 

        const token = jwt.sign({_id:user._id , emailId:user.emailId} ,process.env.JWT_KEY,{expiresIn : 60*60});
        res.cookie('token',token,{maxAge:60*60*1000});
        res.status(200).send("Logged in successfully")
    }
    catch(err){
            res.status(401).send("Error "+err);
    }
}

const logout = async(req,res)=>{
    try{
        
    }
    catch(err){

    }
}