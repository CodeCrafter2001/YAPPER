import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { ENV } from "../lib/env.js";
import{ sendWelcomeEmail} from "../emails/emailHandler.js"
import  cloudinary from "../lib/cloudinary.js";

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
    try{
 const {email, password}= req.body;
  if(!email || !password){
    return res.status(400).json({message:"email and password are required"});
  }
  // check if user exists or not
  const user= await User.findOne({email});
  if(!user){
    return res.status(400).json({message: "invalid credentials"});
  }
  // compare password
     const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

//generate token
generateToken(user._id,res);
return res.status(200).json({
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
     profilePic: user.profilePic,
     message:"user has successfully loged in"
});
    }catch(error){
      console.error("Login error",error);
      res.status(500),json({message: "internal serever error"}); 
    }
}


//logout controller
export const logout = async  (req,res)=>{
try{
    res.cookie("jwt", "",{
        maxAge:7 * 24* 60*60 * 1000,
        httpOnly : true,
        sameSite: "strict",
        secure: process.env.Node_ENV ==="development" ? false : true,
    }); 
    return res.status(200).json({ message:"Logged out successfully"});
}catch(error){
    console.error("logout error:", error);
    res.status(500).json({
        message:"internal server error"
    });
}
}

//update profile controller
export const updateProfile= async(req,res)=>{
      try {
        const {profilePic}= req.body;
          if(!profilePic) res.status(400).json({message:"ProfilePic is required"});
          const userId= req.user._id;
          const uploadResponse= await cloudinary.uploader.upload(profilePic); 
        const updatedUser= await User.findByIdAndUpdate(userId,
            {profilePic: uploadResponse.secure_url},
            {new:true}
        );
        res.status(200).json(updatedUser);
      } catch (error) {
        console.log("error in update profile:", error);
        res.status(500).json({message:"Internal server error"}); 
      }    
}