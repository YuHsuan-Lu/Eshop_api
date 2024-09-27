const express = require('express')
const router = express()
const User = require('../Models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
router.get('',async(req,res)=>{
    const userList = await User.find()//.select("name")
    res.send(userList)
})
router.get('/:userId',async(req,res)=>{
    //!!when userId NOT exist 
    const user = await User.findById(req.params.userId).select("-passwordHash")
    if(!user){res.status(404).send({success:false, message:"user not found"})}
    res.send(user)
})
router.get('/get/count',async(req,res)=>{
    const usercount = await User.countDocuments()
    if(!usercount){res.status(400).send({success:false})}
    res.send({usercount})
})
router.post('/signup',async(req,res)=>{
    const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone:req.body.phone,
        street:req.body.street,
        appartment:req.body.appartment,
        zip:req.body.zip,
        city:req.body.city,
        country:req.body.country
    })
    const createdUser = await newUser.save()
    if(!createdUser){res.status(400).send({success:false, message:"user creation fails"})}
    res.status(200).send({success:true, message:"user creation success"})
})
router.post('/login',async(req,res)=>{
    //!!lack catch error
    const user = await User.findOne({email:req.body.email})
    const secret = process.env.JWT_SECRET
    if(!user){res.status(404).send({success:false, message:"user not found"})}
    if(user && bcrypt.compareSync(req.body.password,user.passwordHash)){
        const token = jwt.sign(
            {userId:user.id, isAdmin:user.isAdmin},
            secret,
            {expiresIn:"1d"}
        )
        res.status(200).send({user:user.email,token})
    }else{
        res.status(400).send({success:false, message:"password is wrong"})
    }
})
router.delete('/:userId',async(req,res)=>{
    const user = await User.findByIdAndDelete(req.params.userId)
    if(!user){res.status(404).send({success:false, message:"user not found"})}
    res.send(user)
})

module.exports = router
