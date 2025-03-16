import { createUserSchema } from "../../common/schema/auth.schema";
import asyncHandler from "../../middlewares/asyncHandler.middleware";
import { validateFileImage } from "../../middlewares/file.middleware";
import { registerUserService } from "../services/auth.service";




export const registerUser = asyncHandler(async (req, res) => {
  const body = createUserSchema.parse({
    email: req.body.email,
    password: req.body.password,
  });
  const {path} = validateFileImage(req.file as Express.Multer.File)
  res.status(200).json({ message: "Server is running" });

  await registerUserService({ email: body.email, password: body.password , avatar : path})
});