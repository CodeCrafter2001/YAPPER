import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { ENV } from "../lib/env.js";
import{ sendWelcomeEmail} from "../emails/emailHandler.js"
 export const signup = async (req,res)=>{
    console.log("req.body", req.body);
    try{
        //check if all fields are filled or not
    const{fullName, email, password} =req.body;
if(!fullName || ! email || !password){
    return res.status(400).json({ message:"all fields are requires"});
}
if(password.length < 6){
   return res.status(400).json({ message: "Passwords must be at least 6 characters"});
}
//check if email is vaild 
const regex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if(!regex.test(email)){
    return res.status(400).json({ message:" Invalid email format"});
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
   const savedUser=  await newUser.save();
    generateToken(savedUser._id, res);
    res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
    });


 //send welcome email
 try {
    await sendWelcomeEmail( savedUser.email, savedUser.fullName,ENV.CLIENT_URL )
 } catch (error) {
    console.log(" failed to send welcome email");
 }


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