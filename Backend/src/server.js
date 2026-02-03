import express from "express";
import dotenv from "dotenv";
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
import authRoutes from "./routes/auth.route.js"
import messageRoute from "./routes/message.route.js"


app.use('/api/auth', authRoutes); 
app.use('/api/messages',messageRoute); 

app.listen(PORT,()=>{
    console.log("server is listening on port 3000")
}); 
 