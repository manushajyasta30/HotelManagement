import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./helpers/connect.js";
import users from "./data/users.js";
import rooms from "./data/rooms.js";
import staff from "./data/staff.js";
import roomType from "./data/type.js";
import User from "./models/User.js";
import Employee from "./models/Employee.js";
import RoomType from "./models/RoomType.js";
import Room from "./models/Room.js";

dotenv.config();

await connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Room.deleteMany();
    await Employee.deleteMany();
    await RoomType.deleteMany();

    await User.insertMany(users);
    const createdTypes = await RoomType.insertMany(roomType);
    const createdEmployee = await Employee.insertMany(staff);

    const adminStaff = createdEmployee[0]._id;

    const sampleRooms = rooms.map((room) => {
      return {
        ...room,
        createdBy: adminStaff,
        roomType: createdTypes[0]._id,
      };
    });

    await Room.insertMany(sampleRooms);

    console.log("---DATA HAS BEEN IMPORTED---");
    process.exit();
  } catch (error) {
    console.log("---IMPORT FAILED---");
    console.log(`ERROR:${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Room.deleteMany();
    await Employee.deleteMany();
    await RoomType.deleteMany();

    console.log("---DATA HAS BEEN DESTROYED---");
    process.exit();
  } catch (error) {
    console.log("---DESTROY FAILED---");
    console.log(`ERROR:${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
