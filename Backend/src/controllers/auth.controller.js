import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

 export const signup = async (req,res)=>{
    const{fullName, email, password} =req.body;
//check if all feilds are filled or not
try{
if(!fullName, ! email, !password){
    return res.status(400).json({ message:"all feilds are requires"});
}
if(password.length < 6){
    res.status(400).json({ message: "Passwords must be at least 6 characters"});
}
//chech if email is vaild 
const regex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if(!regex.test(email)){
    return res.status(400).json({ message:" Invaild email format"});
}
//chech if user already exist or not
const existingUser= await User.findOne({email});
if(existingUser){
    return res.status(400).json({
        message: "user already exists"
    });
}
// hash password
const hashedPassword= await bcrypt.hash(password,10);

//new user
const newUser= new User({
    fullName,
email,
password: hashedPassword
})

//jwt 
if(newUser){
 
}else{
    res.status(400).json({message: "invaild user data"})
}

}catch(error){
console.log("error in signup controller:", error);
res.status(500).json({message: "Internal server error"});
}

}



//login controller
export const login = async  (req,res)=>{
    res.send("login endpoint");
}


//logout controller
export const logout = async  (req,res)=>{
    res.send("signup logout");
}