import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        fullName:{
            type: String,
            required : true,
            trim: true
        },
        email:{
            type:String,
            type: String,
      required: true,
      unique: true,
      lowercase: true
        },
        password:{
            type: String,
            required: true,
            minlength: 6,
        },
        profilePic:{
            type: String,
            default:"",
        },   
    },
    {timestamps:true} //createAt and Updated at
);

 const User= mongoose.model("user",userSchema);
 export default User;