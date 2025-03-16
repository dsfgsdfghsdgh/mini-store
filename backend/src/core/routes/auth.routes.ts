import { Router } from "express";
import { registerUser } from "../controllers/auth.controller";
import upload from "../../middlewares/multer.middleware";

const router = Router()


// routes
router.route("/register").post(upload.single("avatar"),registerUser)




export default router