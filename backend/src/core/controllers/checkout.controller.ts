import asyncHandler from "../../middlewares/asyncHandler.middleware";
import { checkoutService } from "../services/checkout.service";

export const checkout = asyncHandler(async (req, res) => {
  const {items , email} = req.body;
  await checkoutService({items, email})
  res.status(200).json({ message: "Server is running" });
});


