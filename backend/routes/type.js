import express from "express";
const router = express.Router();
import { getRoomTypes } from "../controllers/type.js";
router.route("/").get(getRoomTypes);

export default router;
