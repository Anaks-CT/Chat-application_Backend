import express from "express";
import register from '../controller/user/register.js'
import authUser from "../controller/user/login.js";


const router = express.Router();

router.route("/").post(register);
router.post('/login', authUser)

export default router