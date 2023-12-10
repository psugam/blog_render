const express=require('express');
const router=express.Router();
const User=require('../models/User.js');
const bcrypt=require('bcrypt');
const Post=require('../models/Post.js');
const Comment=require('../models/Comment.js');
const verifyToken = require('../verifyToken.js');

//CREATE POST
//path: ../api/post/write

router.post('/create', verifyToken,async (req, res)=>{
    try{
       const newPost= await Post.create(req.body);
       res.status(200).json(newPost);

    }catch(e){
        res.status(400).json(e);
    }
    

})



router.put('/:id',verifyToken, async(req, res)=>{
    try{
        const updatedPost=await Post.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true});
        res.status(200).json(updatedPost);
    }
    catch(e){
        res.status(500).json(e);
    }
})

router.delete('/:id', async (req, res)=>{
    try{
        await Post.findByIdAndDelete(req.params.id);
        await Comment.deleteMany({postId:req.params.id});
        res.status(200).json('Post has been deleted'+req.params.id);
    }
    catch(e){
        res.status(500).json(e);
    }
})


//GET post details


router.get('/:id', async (req, res)=>{
    try{
        const post=await Post.findById(req.params.id);
        res.status(200).json(post);
    }
    catch(e){
        res.status(500).json(e);
    }
})

//GET ALL POSTS

// router.get('/', async (req, res)=>{
//     try{

//        const posts=await Post.find();
//         res.status(200).json(posts);
//     }
//     catch(e){
//         res.status(500).json(e);
//     }
// })

router.get('/', async(req, res)=>{
  
    const query=req.query;
   // console.log(query);
    try{
        const searchFilter={
            title:{$regex:query.search, $options:'i'}
        }
        //console.log(searchFilter);
        // res.json('Hello');
   const posts=await Post.find(query.search? searchFilter: null);
   posts.sort(sortPostByDate);
   res.status(200).json(posts);

    }catch(e){
        res.status(500).json(e);
    }
})

function sortPostByDate(a, b){
    
    const dateA=a.createdAt;
    const dateB=b.createdAt;
    if(dateA<dateB){
      return 1;
    }
    if(dateA>dateB){
      return -1;
    }
    return 0;
}



//gET user posts
router.get("/user/:userId",async (req,res)=>{
    try{
        const posts=await Post.find({userId:req.params.userId})
       posts.sort(sortPostByDate);
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})


//Search 





module.exports=router;