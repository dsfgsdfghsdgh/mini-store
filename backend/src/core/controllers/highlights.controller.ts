import { highlightsProducts } from "../../common/data";
import asyncHandler from "../../middlewares/asyncHandler.middleware";

export const getHighlights = asyncHandler(async (req, res) => {
  res.status(200).json({ 
    data : highlightsProducts,
    message: "highlight fetched successfully" 
  });
});