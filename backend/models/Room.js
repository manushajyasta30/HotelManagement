import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    title: {
      type: String,
      required: true,
    },

    roomType: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "RoomType",
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    maxpeople: {
      type: Number,
      required: true,
    },
    unavailableDates: {
      type: Array,
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", RoomSchema);

export default Room;
