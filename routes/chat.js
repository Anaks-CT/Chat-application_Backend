import express from "express";
import protect from "../middleware/authMiddleware.js";
import accessChat from '../controller/chat/accessChat.js'
import fetchChats from "../controller/chat/fetchChat.js";
import createGroupChat from "../controller/chat/createGroupChat.js";
import renameGroup from "../controller/chat/renameGroup.js";
import removeFromGroup from "../controller/chat/removeFromGroup.js";
import addToGroup from "../controller/chat/addToGroup.js";


const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addToGroup);

export default router