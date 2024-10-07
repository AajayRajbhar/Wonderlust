const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Reviews=require("./review.js");
let listingSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image:{
        type:String,
        filename: String,
        default:"https://vaarivana.com/wp-content/uploads/2023/05/Unveiling_the_Splendor.jpg.webp",
        set:(link)=> link===""?"https://vaarivana.com/wp-content/uploads/2023/05/Unveiling_the_Splendor.jpg.webp":link,
    },
    price:Number,
    location:String,
    country:String,
    review:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Reviews",
    }]
});

listingSchema.post("findOneAndDelete",async(List)=>{
if(List){
  await  Reviews.deleteMany({_id:{$in:List.review}});}

})

const List = mongoose.model('List', listingSchema);

module.exports=List;