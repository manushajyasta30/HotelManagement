import express from "express";
const router = express.Router();

import {
  loginStaff,
  logoutStaff,
  getStaff,
  getStaffById,
  deleteStaff,
  updateStaff,
  updateStaffProfile,
  registerStaff,
} from "../controllers/employee.js";
router.route("/").get(getStaff).post(registerStaff);
router.post("/logout", logoutStaff);
router.post("/login", loginStaff);
router.route("/:id").get(getStaffById).put(updateStaff).delete(deleteStaff);
router.route("/:id/profile").put(updateStaffProfile);

export default router;
