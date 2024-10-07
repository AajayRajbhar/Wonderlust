const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');
let userSchema=new Schema({
    email:{
        type:String,
        required:true
    }

})

userSchema.plugin(passportLocalMongoose); // we will not add field for username and password because
// passportlocal mongoose add automatically it also hashed and salt the password.

let User=mongoose.model('User', userSchema);
module.exports=User;