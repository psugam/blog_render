const express=require('express');
const router=express.Router();
const User=require('../models/User.js');
const bcrypt=require('bcrypt');
const Post=require('../models/Post.js');
const Comment=require('../models/Comment.js');
const verifyToken = require('../verifyToken.js');

//UPDATE
//path: ../api/users/:id

router.put('/:id', verifyToken, async(req, res)=>{
    try{
        if(req.body.password){
            const salt=await bcrypt.genSalt(10);
            req.body.password= await bcrypt.hashSync(req.body.password, salt);
        }
        const updatedUser=await User.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true});
        res.status(200).json(updatedUser);
    }
    catch(e){
        res.status(500).json(e);
    }
})

router.delete('/:id', async (req, res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        await Post.deleteMany({userId:req.params.id});
        await Comment.deleteMany({userId:req.params.id});
        res.status(200).json('User deleted');
    }
    catch(e){
        res.status(500).json(e);
    }
})


//GET USER


router.get('/:id', async (req, res)=>{
    try{
        const user=await User.findById(req.params.id);
        const{password, ...info}=user._doc;
        res.status(200).json(info);
    }
    catch(e){
        res.status(500).json(e);
    }
})

module.exports=router;