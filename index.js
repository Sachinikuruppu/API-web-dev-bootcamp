require("dotenv").config(); //import environment variables to application
//import express
const express = require("express");
//mongoose connection,import
const connectDB=require("./connection");
//import model
const userModel=require("./user");

//initialize and return to app constant
const app = express() ;

//configuration
app.use(express.json());

//route:  /
//description:To get all user
//parameter:none

//request , reponse function from server to browser(HTTP Methods)
app.get("/", async (req, res) =>{ 
     //return res.json({"message":"Success"}); removed because no need later
    const user=await userModel.find(); //we use find because we need to get all data, findOne will get only one data
    return res.json({user}); //when we run in browser, will show user, in mongodb can see new collection
}); 

//route:  /user/type/:type
//description:To get all users of a type
//parameter:type
app.get("/user/type/:type",async(req,res) => {
const{type}= req.params;
const user=await userModel.find({ userType: type});
if(!user){
    return res.json({message: "User not found"});
}
return res.json({user});
});

//route:  /user/:_id
//description:To get all users based on id from MongoDB
//parameter:_id
app.get("/user/:_id", async(req,res) =>{
    //destructure id
    const {_id} = req.params;
    const user= await userModel.findById(_id); //findById because unique
    if(!user){
        return res.json({message: "User not found"});
    }
    return res.json({user});
});


/*app.post("/user/:id", (req,res) =>{
   return res.json(req.params);  
});*/

//route:  /user/new
//description:To add new user
//parameter:none
//request body:user object
//note:only get method can be run in browser, post method should be run on postman
app.post("/user/new", async (req,res) =>{
 //destructure user data
 const{newUser} = req.body;
 await userModel.create(newUser);
 return res.json({message:"User created"});
});
//server will display message after responding to created port
//only after server respond to port connection will be established
app.listen(4000, ()=> 
connectDB()
.then((data)=> console.log("Server is running")) //not adding data after message because taking space in terminal
.catch((error)=>console.log(error))                             
);
