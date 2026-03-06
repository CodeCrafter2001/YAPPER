import express from "express";
const router = express.Router();
import { getAllContacts,getMessagesByUserId ,sendMessage} from "../controllers/message.controller.js";
import { protectRoute } from '../middleware/auth.middleware.js';


router.get("/contacts",protectRoute,getAllContacts);
// router.get("/chats",getChatPartners);
router.get("/:id",protectRoute,getMessagesByUserId);
router.post("/send/:id",protectRoute, sendMessage);




export default router;