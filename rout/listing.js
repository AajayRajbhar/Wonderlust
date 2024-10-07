const express=require("express");

const router = express.Router();

const {listingSchema,reviewSchema}=require("../schema.js");
let wrapper=require("../utils/expressError.js");
let Errorexpress=require("../utils/Error_class.js");
let List=require("../models/models.js");
let Reviews=require("../models/review.js");

const schemavalidate=(req,res,next)=>{
  console.log(req.body);
  let {error}= listingSchema.validate(req.body);
  if(error){
   
    throw new Errorexpress(400,error);
  }else{
      next();
  }

}




router.get("/", async (req,res)=>{
    let all_lists= await List.find({});
    res.render("index.ejs",{all_lists});
  });
  router.get("/new",(req,res)=>{
    
    res.render("new.ejs");
  })
  router.get("/:id", wrapper(async (req,res)=>{
    let {id}=req.params;
    let obj= await List.findById(id).populate("review");
    if(!obj){
      req.flash("error","listing you requested for not existed !");
      res.redirect("/listing");
    }
    res.render("show.ejs",{obj});
  }));

  router.post("/new",schemavalidate,wrapper( async (req,res,next)=>{

    let {title,description,image,price,location,country}=req.body.List;
    let newListing = new List({
      title,
      description,
      image,
      price,
      location,
      country
    });
    await newListing.save();
    req.flash("success","New Listing created !");
    res.redirect("/listing");}
  )
  )

  router.get("/:id/edit",wrapper( async(req,res)=>{
    let {id}=req.params;
    let home= await List.findById(id);
    res.render("edit.ejs",{home});
  })
  )
  router.put("/:id",schemavalidate,wrapper(async (req,res,next)=>{
    
    try{
    let {id}=req.params;
    let {title,description,image,price,location,country}=req.body.List;
     await List.findByIdAndUpdate(id,{title:title,description:description,image:image,price:price,location:location,country:country})
     req.flash("success","Updated successfully!");
     res.redirect("/listing");}
     catch(err){
      next(err);
     }
  }))
  
  router.delete("/:id/delete",wrapper(async (req,res)=>{
    let {id}=req.params;
     await List.findByIdAndDelete(id);
     req.flash("success","deleted successfully !");
     res.redirect("/listing");
  }))

  module.exports=router;