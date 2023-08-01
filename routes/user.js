import express from "express";
import register from '../controller/user/register.js'
import authUser from "../controller/user/login.js";
import allUsers from "../controller/user/getAllUsers.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(register).get(protect, allUsers)
router.post('/login', authUser)

export default router