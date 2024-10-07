const express=require("express");

const router = express.Router({mergeParams:true});
const {listingSchema,reviewSchema}=require("../schema.js");
let wrapper=require("../utils/expressError.js");
let Errorexpress=require("../utils/Error_class.js");
let List=require("../models/models.js");
let Reviews=require("../models/review.js");



const reviewvalidate=(req,res,next)=>{
    let {error}= reviewSchema.validate(req.body);
    if(error){
      throw new Errorexpress(400,error);
    }else{
        next();
    }
  
  }

router.post("/",reviewvalidate,wrapper(async(req,res)=>{

    let ID=req.params.id;
    let l= await List.findById(ID);
    let newreview = new Reviews({
     rating: req.body.Review.rating,
     comment: req.body.Review.comment
   });
    await newreview.save();
    l.review.push(newreview);
    await l.save();
    req.flash("success","review posted successfully !");
    res.redirect(`/listing/${ID}`);
  }))
  router.delete("/:reviewid",async(req,res)=>{
    let {id,reviewid}=req.params;
    await List.findByIdAndUpdate(id,{$pull:{review:reviewid}});
    await Reviews.findByIdAndDelete(reviewid);
    req.flash("success","post deleted !");
    res.redirect(`/listing/${id}`);
  })

  module.exports=router;