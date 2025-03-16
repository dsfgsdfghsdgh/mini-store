import { Router } from "express";
import { registerUser } from "../controllers/auth.controller";

const router = Router()


// routes
router.route("/register").post(registerUser)




export default router