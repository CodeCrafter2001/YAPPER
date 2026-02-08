import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"
import messageRoute from "./routes/message.route.js"
import path from "path";
import { fileURLToPath } from "url";
import {connectDB} from "./lib/db.js "
const app = express(); 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const PORT = process.env.PORT || 3000;
app.use (express.json()); //req.body
//routes
app.use('/api/auth', authRoutes); 
app.use('/api/messages',messageRoute); 

// 🔥 absolute path — no relative bugs
const distPath = path.resolve(__dirname, "../../Frontend/dist");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(distPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}





app.listen(PORT,()=>{
    console.log("server is listening on port:" + PORT);
    connectDB(); 
}); 
  