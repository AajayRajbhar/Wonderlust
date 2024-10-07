
const mongoose=require("mongoose");
let List=require("../models/models.js");
let initialiseData=require("./data.js");
main()
.then((res)=>{
    console.log("connected successfully");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
}

async function initDb(){
   await List.deleteMany({});
   await List.insertMany(initialiseData.data) ;
   console.log("done");
}

initDb();