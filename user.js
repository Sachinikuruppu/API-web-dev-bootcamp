//import  mongoose
const mongoose=require("mongoose");
//instantiating a copy of mongoose chema with our schema
const userSchema= new mongoose.Schema({
    //pass object and data type
    name:String,
    email:String,
    phno:Number,
    userType:String,
});
//convert schema to model
const userModel= mongoose.model("User", userSchema);
//user is collection name
//export model
module.exports=userModel;                   