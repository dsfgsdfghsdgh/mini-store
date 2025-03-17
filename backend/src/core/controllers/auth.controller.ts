import {
  createUserSchema,
  loginUserSchema,
} from "../../common/schema/auth.schema";
import { setAuthCookies } from "../../common/utils/cookie";
import { CREATED, OK } from "../../constants/httpCode";
import asyncHandler from "../../middlewares/asyncHandler.middleware";
import { validateFileImage } from "../../middlewares/file.middleware";
import {
  loginUserService,
  registerUserService,
} from "../services/auth.service";

export const registerUser = asyncHandler(async (req, res) => {
  const body = createUserSchema.parse(req.body);
  const { path } = validateFileImage(req.file as Express.Multer.File);
  const { user } = await registerUserService({
    email: body.email,
    password: body.password,
    avatar: path,
  });
  res
    .status(CREATED)
    .json({
      message: "User registered successfully",
      success: true,
      data: user,
    });
});

export const loginUser = asyncHandler(async (req, res) => {
  const body = loginUserSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { accessToken, refreshToken, user } = await loginUserService(body);

  return setAuthCookies({ res, accessToken, refreshToken }).status(OK).json({
    message: "User logged in successfully",
    success: true,
    data: user,
  });
});
