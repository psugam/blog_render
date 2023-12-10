const express=require('express');
const router=express.Router();
const User=require('../models/User.js');
const bcrypt=require('bcrypt');
const Post=require('../models/Post.js');
const Comment=require('../models/Comment.js');
const verifyToken =require('../verifyToken.js');

//CREATE POST
//path: ..

// router.post('/create', async (req, res)=>{
//     try{
//        const newComment= await Comment.create(req.body);
//        res.status(200).json(newComment);

//     }catch(e){
//         res.status(400).json('Error-could not post comment');
//     }
    

// })

router.post("/create",async (req,res)=>{
    try{
        const {comment, userId, postId, author}=req.body;
        const newComment=new Comment({comment, userId, postId, author});
        const savedComment=await newComment.save()
        res.status(200).json(savedComment)
    }
    catch(err){
        res.status(500).json(err)
    }
   

})



router.put('/:id', async(req, res)=>{
    try{
        const updatedComment=await Comment.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true});
        res.status(200).json(updatedComment);
    }
    catch(e){
        res.status(500).json(e);
    }
})

router.delete('/:id', async (req, res)=>{
    try{
       const deleted= await Comment.findByIdAndDelete(req.params.id);
       // console.log(deleted); 
       res.status(200).json('Post has been deleted');
    }
    catch(e){
        res.status(500).json(e);
    }
})


//GET POST COMMENTS
router.get("/post/:postId",async (req,res)=>{
    try{
        const comments=await Comment.find({postId:req.params.postId})
        res.status(200).json(comments)
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports=router;