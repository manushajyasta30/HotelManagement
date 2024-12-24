import asyncHandler from "../helpers/middlewares/asyncHandler.js";
import Room from "../models/Room.js";
import RoomType from "../models/RoomType.js";
const getRooms = asyncHandler(async (req, res) => {
  const rooms = await Room.find({}).populate("roomType");
  res.json(rooms);
});

const getRoomById = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id).populate("roomType");
  if (room) {
    res.json(room);
  } else {
    res.status(404);
    throw new Error("plant Not Found");
  }
});

const deleteRoom = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (room) {
    await Room.deleteOne({ _id: room._id });
    res.json({ message: "room removed" });
  } else {
    res.status(404);
    throw new Error("room not found");
  }
});

const createRoom = asyncHandler(async (req, res) => {
  const { userId, title, roomType, image, description, price, maxpeople } =
    req.body;
  const room = new Room({
    title: title,
    price: price,
    createdBy: userId,
    image: image,
    description: description,
    roomType: roomType,
    maxpeople: maxpeople,
  });
  try {
    const createdRoom = await room.save();
    res.status(201).json(createdRoom);
  } catch (error) {
    console.log(error);
  }
});

const updateRoom = asyncHandler(async (req, res) => {
  const { title, roomType, image, description, price, maxpeople } = req.body;

  const room = await Room.findById(req.params.id);

  if (room) {
    room.title = title;
    room.price = price;
    room.description = description;
    room.roomType = roomType;
    room.image = image;
    room.maxpeople = maxpeople;

    const updatedroom = await room.save();
    res.json(updatedroom);
  } else {
    res.status(404);
    throw new Error("book not found");
  }
});
export { getRoomById, getRooms, deleteRoom, createRoom, updateRoom };
