import asyncHandler from "../helpers/middlewares/asyncHandler.js";

import RoomType from "../models/RoomType.js";
const getRoomTypes = asyncHandler(async (req, res) => {
  const roomTypes = await RoomType.find({});
  res.json(roomTypes);
});

export { getRoomTypes };
