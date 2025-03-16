import { createUserSchema } from "../../common/schema/auth.schema";
import { CREATED } from "../../constants/httpCode";
import asyncHandler from "../../middlewares/asyncHandler.middleware";
import { validateFileImage } from "../../middlewares/file.middleware";
import { registerUserService } from "../services/auth.service";

export const registerUser = asyncHandler(async (req, res) => {
  console.log("registerUser" , req.body)
  const body = createUserSchema.parse(req.body);
  const { path } = validateFileImage(req.file as Express.Multer.File);
  res.status(200).json({ message: "Server is running" });

  const { user } = await registerUserService({
    email: body.email,
    password: body.password,
    avatar: path,
  });
  res
    .status(CREATED)
    .json({ message: "User registered successfully", data: user });
});
