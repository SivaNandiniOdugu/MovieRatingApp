const mongoose=require("mongoose");

const movieSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    year:Number,
    genre:String,
    rating:Number,
    director:String,
    description:String,
    cast:[String],
    duration:Number,
    numberOfReviews:Number 
});
module.exports=mongoose.model("Movie",movieSchema)