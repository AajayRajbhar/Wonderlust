const mongoose=require("mongoose");

const Schema=mongoose.Schema;

let reviewSchema=new Schema({
    comment:String,
    rating:{
        type:Number,
        min :1,
        max:5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

})


const Reviews=mongoose.model("Reviews",reviewSchema);
module.exports=Reviews;