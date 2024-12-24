import asyncHandler from "../helpers/middlewares/asyncHandler.js";
import Employee from "../models/Employee.js";
import jwt from "jsonwebtoken";
const loginStaff = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const staff = await Employee.findOne({ email });

  if (staff && (await staff.checkPassword(password))) {
    const token = jwt.sign(
      { userID: staff._id, role: staff.role },
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
      _id: staff._id,
      firstname: staff.firstName,
      lastname: staff.lastName,
      email: staff.email,
      role: staff.role,
      ssn: staff.ssn,
      phone: staff.phone,
      zip: staff.zip,
      city: staff.city,
      dob: staff.dob,
      first: staff.first,
      token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or password!");
  }
});

const logoutStaff = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logout staff" });
});

const getStaff = asyncHandler(async (req, res) => {
  const staff = await Employee.find({});
  res.status(200).json(staff);
});

const getStaffById = asyncHandler(async (req, res) => {
  const staff = await Employee.findById(req.params.id).select("-password");
  res.status(200).json(staff);
});

const deleteStaff = asyncHandler(async (req, res) => {
  const staff = await Employee.findById(req.params.id);
  if (staff) {
    if (staff.role === "admin") {
      res.status(400);
      throw new Error("Cannot deleteStaff");
    }
    await Employee.deleteOne({ _id: staff._id });
    res.status(200).json({ message: "Staff deleted " });
  } else {
    res.status(404);
    throw new Error("Cannot find Staff");
  }
});

const updateStaff = asyncHandler(async (req, res) => {
  const staff = await Employee.findById(req.params.id);

  if (staff) {
    staff.firstName = req.body.firstName || staff.firstName;
    staff.lastName = req.body.lastName || staff.lastName;
    staff.email = req.body.email || staff.email;
    staff.ssn = req.body.ssn || staff.ssn;
    staff.phone = req.body.phone || staff.phone;
    staff.zip = req.body.zip || staff.zip;
    staff.city = req.body.city || staff.city;
    staff.dob = req.body.dob || staff.dob;
    const updateStaff = await staff.save();
    res.status(200).json({
      _id: updateStaff._id,
      firstName: updateStaff.firstName,
      lastName: updateStaff.lastName,
      email: updateStaff.email,
      ssn: updateStaff.ssn,
      phone: updateStaff.phone,
    });
  } else {
    res.status(404);
    throw new Error("Cannot find Staff");
  }
});

const updateStaffProfile = asyncHandler(async (req, res) => {
  const user = await Employee.findById(req.params.id);

  if (user) {
    user.first = false;
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;
    user.ssn = req.body.ssn || user.ssn;
    user.phone = req.body.phone || user.phone;
    user.zip = req.body.zip || user.zip;
    user.city = req.body.city || user.city;
    user.dob = req.body.dob || user.dob;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      email: updatedUser.email,
      role: updatedUser.role,
      ssn: updatedUser.ssn,
      phone: updatedUser.phone,
      token: req.body.token,
    });
  } else {
    res.status(404);
    throw new Error("staff not found");
  }
});

const registerStaff = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, ssn, phone, zip, city, dob } =
    req.body;

  const staff = await Employee.create({
    firstName,
    lastName,
    email,
    password,
    phone,
    zip,
    city,
    dob,
    role: "staff",
    ssn,
  });
  res.status(201).json({
    _id: staff._id,
    firstName: staff.firstName,
    lastName: staff.lastName,
    email: staff.email,
    role: staff.role,
    phone: staff.phone,
    ssn: staff.ssn,
    zip: staff.zip,
    dob: staff.dob,
    city: staff.city,
  });
});

export {
  loginStaff,
  logoutStaff,
  getStaff,
  getStaffById,
  deleteStaff,
  updateStaff,
  registerStaff,
  updateStaffProfile,
};
