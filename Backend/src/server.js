import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"
import messageRoute from "./routes/message.route.js"
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

// 🔥 absolute path — no relative bugs
const distPath = path.resolve(__dirname, "../../Frontend/dist");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(distPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}





app.use('/api/auth', authRoutes); 
app.use('/api/messages',messageRoute); 
app.listen(PORT,()=>{
    console.log("server is listening on port 3000")
}); 
  