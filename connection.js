//connect to database
const mongoose=require("mongoose");
//export and use configuration for updated version
const connectToDB= async() => mongoose.connect(process.env.MONGODB_URL,{
   useNewUrlParser:true,
   useFindAndModify:false,
   useUnifiedTopology:true,
});
//export function
module.exports=connectToDB;