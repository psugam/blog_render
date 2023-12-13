const express = require("express");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv").config();
const cookieParser=require('cookie-parser');
const cors=require('cors');
const app = express();
const multer=require('multer');
app.use(
  cors({
    origin:'https://psugam.vercel.app', 
    credentials:true
  }));
app.use(express.json());

const port = process.env.PORT || 5000;
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_STRING);
    console.log(`Database Connected`);

  } catch (e) {
    console.log("Connection Failed");
    throw new Error("Database not connected");
  }
};
connectDB();

app.use(cookieParser());
app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/users.js'))
app.use('/api/post', require('./routes/posts.js'));
app.use('/api/comment', require('./routes/comments.js'));

//image upload
// const storage=multer.diskStorage({
//   destination:(req, file, fn)=>{
//     fn(null, 'images');
//   },
//   filename:(req, file, fn)=>{
//     fn(null, req.body.img);
//   }
// })

// const upload=multer({
//   storage:storage
// })
// app.post('/api/upload', upload.single('file'), (req, res)=>{
//   res.status(200).json('Image has been uploaded successfully');
// })


app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
