import asyncHandler from "../helpers/middlewares/asyncHandler.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, phone, city, zip, dob } =
    req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    firstName,
    lastName,
    phone,
    email,
    password,
    city,
    zip,
    dob,
  });

  if (user) {
    const token = jwt.sign(
      { userID: user._id, role: user.role },
      process.env.SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: "user",
      city: user.city,
      zip: user.zip,
      dob: user.dob,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.checkPassword(password))) {
    const token = jwt.sign(
      { userID: user._id, role: user.role },
      process.env.SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      phone: user.phone,
      city: user.city,
      zip: user.zip,
      dob: user.dob,
      token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or password!");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logout user" });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.city = req.body.city || user.city;
    user.zip = req.body.zip || user.zip;
    user.dob = req.body.dob || user.dob;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role,
      city: updatedUser.city,
      zip: updatedUser.zip,
      dob: updatedUser.dob,

      token: req.body.token,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const staff = await User.findById(req.params.id).select("-password");
  res.status(200).json(staff);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User deleted " });
  } else {
    res.status(404);
    throw new Error("Cannot find User");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const staff = await User.findById(req.params.id);

  if (staff) {
    staff.firstName = req.body.firstName || staff.firstName;
    staff.lastName = req.body.lastName || staff.lastName;
    staff.email = req.body.email || staff.email;
    staff.phone = req.body.phone || staff.phone;
    const updateStaff = await staff.save();
    res.status(200).json({
      _id: updateStaff._id,
      firstName: updateStaff.firstName,
      lastName: updateStaff.lastName,
      email: updateStaff.email,
      phone: updateStaff.phone,
    });
  } else {
    res.status(404);
    throw new Error("Cannot find Staff");
  }
});

export {
  getUsers,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
  deleteUser,
  getUserById,
  updateUser,
};
