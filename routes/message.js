import express from "express";
import sendMessage from "../controller/message/sendMessage.js";
import allMessages from "../controller/message/getAllmessage.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);

export default router