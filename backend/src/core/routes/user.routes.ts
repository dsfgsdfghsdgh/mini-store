import { Router } from "express";
import verifyUser from "../../middlewares/auth.middleware";
import { userAccessHandler } from "../controllers/user.controller";

const router = Router()


// routes
router.route("/").get(verifyUser, userAccessHandler)




export default router