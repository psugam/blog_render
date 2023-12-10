const mongoose =require('mongoose');


const PostSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    subtitle:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
    },
    username:{
        type:String, 
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    categories:{
        type:Array,
    },
    content:{
        type:String,
        required:true,
    }


}, {
    timestamps:true
})

module.exports= mongoose.model('Post', PostSchema);