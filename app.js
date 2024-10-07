const express=require("express");
let app=express();

const mongoose=require("mongoose");

let path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
engine = require('ejs-mate');
app.engine('ejs', engine);
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")))

// authentication
let User=require("./models/user.js");
const passport=require("passport");
const LocalStrategy=require("passport-local")

// session
const session = require('express-session');
const sessionOptions={
  secret: 'Ajay',
  resave: false,
  saveUninitialized: true,
  cookie :{
    expires :Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
  }
}
// connect flash
const flash = require('connect-flash');



main()
.then((res)=>{
    console.log("connected successfully");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
}

app.listen("8080",()=>{
    console.log("listenning");
});
app.get("/",(req,res)=>{
    res.send("hello everyone");
});

app.use(session(sessionOptions));
app.use(flash());
// pasport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//<*--------------------------------------------------*>//

app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  next();
})

// app.get("/listing",async (req,res)=>{
//    let listing1=new List({
//    title: "my new villa",
//    description:"five star villa",
//    location:"Near Ghazipur City",
//    country:"india",
//    price:1000000
//    });
//    await listing1.save();
//    console.log("successfully saved");
//    res.send("successfull");
// });

const listing=require("./rout/listing.js");
const review=require("./rout/review.js");
const user=require("./rout/user.js");
app.use("/listing",listing);
app.use("/listing/:id/review",review);
app.use("/",user);



app.all("*",(req,res,next)=>{
  next(new Errorexpress(404,"Page not Found"));
})
app.use((err,req,res,next)=>{
  let {statusCode=501,message="error occur"}=err;
  res.status(statusCode).render("error.ejs",{message});
})

