import express from "express";
const router = express.Router();
import {
  getRoomById,
  getRooms,
  createRoom,
  deleteRoom,
  updateRoom,
} from "../controllers/room.js";
router.route("/").get(getRooms).post(createRoom);

router.route("/:id").get(getRoomById).put(updateRoom).delete(deleteRoom);

export default router;
