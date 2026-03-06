import express from "express";
const router = express.Router();
import { getAllContacts } from "../controllers/message.controller.js";
import { protectRoute } from '../middleware/auth.middleware.js';


router.get("/contacts",protectRoute,getAllContacts);
// router.get("/chats",getChatPartners);
// router.get("/:id",getMessagesByUserId);
// router.post("/send/:id",sendMessage);




export default router;