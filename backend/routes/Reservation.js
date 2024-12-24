import express from "express";
const router = express.Router();
import { protect, admin } from "../helpers/middlewares/authMiddleware.js";
import {
  createReservation,
  getReservationById,
  updateReservationToPaid,
  getMyReservations,
  updateReservationToCancel,
  getAllReservations,
  updateStatus,
  createCounterReservation,
  addExtra,
} from "../controllers/reservation.js";

router.route("/").post(protect, createReservation).get(getAllReservations);
router.route("/:id").get(getReservationById).put(updateStatus);
router.route("/:id/pay").put(updateReservationToPaid);
router.route("/:id/cancel").put(updateReservationToCancel);
router.route("/:id/extra").put(addExtra);
router.route("/counter").post(createCounterReservation);
router.route("/myreservations/:id").get(getMyReservations);

export default router;
