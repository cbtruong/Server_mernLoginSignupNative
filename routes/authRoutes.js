const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');
// 
require('dotenv').config();
// 
const bcrypt = require('bcrypt');
//const nodemailer = require("nodemailer");

router.post('/signup',(req,res)=>{
    //res.send("This is singup page!");
    console.log("sent by client - ",req.body);
    const {name,email,password,dob}=req.body;
    if (!email || !name || !password || !dob)
        {
            return res.status(422).send({error:"Please fill all the fields"});
        }
    User.findOne({email:email})
        .then(
            async(savedUser)=>{
                if (savedUser)
                    {
                        return res.status(422).send({error:"Invalid credentials"})
                    }
                const user=new User({name,email,password,dob});

                try {
                    await user.save();
                    //res.send({message:"User save successfully"});
                    const token=jwt.sign({_id:user._id}, process.env.JWT_SECRET);
                    res.send({token});
                }
                catch(err) {
                    console.log('db error ',err)
                    return res.status(422).send({error:err.message});
                }
            }
        )
    /*console.log("sent by client - ",req.body);
    const { name, email, password, dob} = req.body;
    if (!name || !email || !password || !dob)
        return res.status(422).json({err: "Please add all the fields"});

    User.findOne({email:email})
    .then(async(savedUser)=>{
        if (savedUser) {
            return res.status(422).json({err:"Invalid Credentials"});
        }
        const user = new User({
            name,
            email,
            password,
            dob
        })
        try {
            await user.save();
            //res.send({message:"User saved successfully!"})
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            res.send({ message: "User Registered Successfully", token });
        }
        catch (err) {
            console.log(err);
        }
    })*/
})

module.exports=router;