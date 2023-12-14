const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const verifyToken = require("../verifyToken");
const cookieParser =require('cookie-parser')

//REGISTER
//registering the user
//path: ../api/auth/register
//access:public

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(401).json("All fields are required");
      //res.status(401);
     // throw new Error("All fields are required");
    }
    const userEmailAvailable = await User.findOne({ email });
    const userNameAvailable = await User.findOne({ username });
    if (userEmailAvailable || userNameAvailable) {
      return res.status(402).json("Username or Email already taken");
     // throw new Error("Enter valid credentials");
    }
    //hashing Password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(200).json({
        _id: user.id,
        email: user.email,
        username: user.username,
      });
    } else {
      res.status(400);
      throw new Error("User not created");
    }
  } catch (e) {
    res.status(e.status);
    console.log(e);
  }
});

router.get("/register", (req, res) => {
  res.json("Hello");
});

//LOGIN
//logging in the user
//path: ../api/auth/login
//access: public

router.post("/login", async (req, res, next) => {
  try {
    // const { username, password } = req.body;
    const user = await User.findOne({ email:req.body.email });
    if (!user) {
      res.status(404).json("User not found");
      next();
    }
    const match =  bcrypt.compareSync(req.body.password, user.password);
    if (!match) {
      res.status(401).json("Wrong credentials");
    }
    const token=jwt.sign({
      _id:user._id,
      username:user.username,
      email:user.email

  }, process.env.SECRET, {expiresIn:'3d'});
  const{password, ...info}=user._doc;
  res.cookie('token', token, {
    httpOnly: true, 
    secure: true,
     maxAge:10*600000, 
     sameSite: 'none'
  }).status(200).json(info);

    
  } catch (e) {
    res.status(404);
    next();
  }
});

//LOGOUT
//logging out the user
//path:../api/auth/logout
//access:private

router.get('/logout',verifyToken, async(req, res)=>{
    try{
        res.clearCookie('token',{sameSite:"none", secure:true}).status(200).json('Logged out successfully');
    }catch(e){
        res.status(500).json(e);
    }
})


//REFETCH USER

router.get("/refetch",verifyToken, (req,res)=>{
  const token=req.cookies.token
  //console.log(token);
  jwt.verify(token,process.env.SECRET,{},async (err,data)=>{
      if(err){
          return res.status(404).json(err)
      }
      res.status(200).json(data)
  })
})



module.exports = router;

//"email":"pokharelsugam19@gmail.com",
