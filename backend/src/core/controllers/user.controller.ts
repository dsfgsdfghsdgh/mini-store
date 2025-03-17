import { OK, UNAUTHORIZED } from "../../constants/httpCode";
import prisma from "../../database/dbConnect";
import appAssert from "../../middlewares/appAssert.middleware";
import asyncHandler from "../../middlewares/asyncHandler.middleware";






export const userAccessHandler = asyncHandler(async (req, res) => {
  const user = await prisma.user.findFirst({
    where: { id: req.userId },
  });
  appAssert(user, UNAUTHORIZED, "user not Authenticated");

  const { password, ...rest } = user;

  return res.status(OK).json({
    message: "User authenticated successfully",
    data: rest,
  });
});