import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";
import upload from "../../middlewares/multer.middleware";

const router = Router()


// routes
router.route("/register").post(upload.single("avatar"),registerUser)

router.route("/login").post(loginUser)




export default router