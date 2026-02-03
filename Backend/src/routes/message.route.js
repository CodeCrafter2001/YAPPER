import express from "express";
const router = express.Router();


router.get("/send",(req,res)=>{
res.send("messaage has send");
});



export default router;