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
    try{
     //return res.json({"message":"Success"}); removed because no need later
    const user=await userModel.find(); //we use find because we need to get all data, findOne will get only one data
    return res.json({user}); //when we run in browser, will show user, in mongodb can see new collection
    } catch(error){
        return res.status(500).json({error: error.message});
    }
}); 

//route:  /user/type/:type
//description:To get all users of a type
//parameter:type
app.get("/user/type/:type",async(req,res) => {
    try{
        const{type}= req.params;
        const user=await userModel.find({ userType: type});
         if(!user){
          return res.json({message: "User not found"});
         }
        return res.json({user});
    } catch(error){
    return res.status(500).json({error: error.message});
}
});

//route:  /user/:_id
//description:To get all users based on id from MongoDB
//parameter:_id
app.get("/user/:_id", async(req,res) =>{
    try{
      //destructure id
       const {_id} = req.params;
       const user= await userModel.findById(_id); //findById because unique
        if(!user){
        return res.json({message: "User not found"});
       }
     return res.json({user});
    } catch(error){
        return res.status(500).json({error: error.message}); 
     }
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
    try{
     //destructure user data
     const{newUser} = req.body;
     await userModel.create(newUser);
     return res.json({message:"User created"});
    } catch(error){
        return res.status(500).json({error: error.message}); 
     }
});

//route:  /user/update
//description:To add new user(should first select id and details we need to edit)
//parameter:_id
//request body:user object
app.put("/user/update/:_id", async(req,res)=>{
 try{   
    //destructure
    const{_id}= req.params;
    const{userData}= req.body;
    //note:line 77:findOneAndUpdate can be used
    const updateUser= await userModel. findByIdAndUpdate (_id,     
    { $set: userData},
    { new:true}
    ); 
   return res.json({user: updateUser});
 } catch(error){
    return res.status(500).json({error: error.message}); 
 }
});

//route:  /user/delete/_id
//description:To delete user for id
//parameter:_id
//request body:none
app.delete("/user/delete/:_id", async(req, res) =>{
    try{
       //destructure
       const{_id}= req.params;  
       await userModel.findByIdAndDelete(_id);

       return res.json({message: "User deleted!"});
   } catch(error){
    return res.status(500).json({error: error.message}); 
   }
});

//route:  /user/delete/type/:userType
//description:To delete user for userType
//parameter: userType
//request body:none
app.delete("/user/delete/type/:userType", async(req,res)=>{
    try{
  //destructure
       const{userType}= req.params;  
       await userModel.findOneAndDelete({userType});

        return res.json({message: "User deleted!"});
   } catch(error){
    return res.status(500).json({error: error.message}); 
    }

});



//server will display message after responding to created port
//only after server respond to port connection will be established
app.listen(4000, ()=> 
connectDB()
.then((data)=> console.log("Server is running")) //not adding data after message because taking space in terminal
.catch((error)=>console.log(error))                             
);
