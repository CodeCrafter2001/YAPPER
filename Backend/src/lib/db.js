import mongoose from "mongoose"

export const connectDB = async()=>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(
            `MongoDB connected ${connection.connection.host} `
            );
    }catch(error){
console.log(
    "mongodb connection failed:", error.message);
process.exit(1); // 1 status code = fail , 0 = success 
    }
};