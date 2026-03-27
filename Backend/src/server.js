import express from "express";
import { ENV } from "./lib/env.js";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./lib/db.js";
const app = express(); 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = ENV.PORT || 3000;
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use (express.json()); //req.body
//routes
app.use(cookieParser());
app.use('/api/auth', authRoutes); 
app.use('/api/messages',messageRoute); 

// 🔥 absolute path — no relative bugs
const distPath = path.resolve(__dirname, "../../Frontend/dist");

if (ENV.NODE_ENV === "production") {
  app.use(express.static(distPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}





app.listen(PORT,()=>{
    console.log("server is listening on port:" + PORT);
    connectDB(); 
}); 
  