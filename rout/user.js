let passport=require("passport");
const express=require("express");

const router = express.Router();
let User=require("../models/user.js");

router.get("/signup",(req,res)=>{
    res.render("./User/signup");
})

router.post("/signup",async(req,res)=>{
    try{
    let {username,email,password}=req.body;
    let newuser=new User({
        username,
        email
    })
     await User.register(newuser,password);
    req.flash("success","welcome to wonderlust");
    res.redirect("/listing");
}
catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
}
})

router.get("/login",(req,res)=>{
    res.render("./User/login");
})
router.post("/login", passport.authenticate('local', { failureRedirect: '/login' ,failureFlash:true}),(req,res)=>{

    req.flash("success","WELCOME TO WONDERLUST");
    res.redirect("/listing");

})
module.exports=router;