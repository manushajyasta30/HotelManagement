import asyncHandler from "../helpers/middlewares/asyncHandler.js";
import Reservation from "../models/Reservation.js";
import Payment from "../models/payment.js";
import Room from "../models/Room.js";
import User from "../models/User.js";
function getDatesInRange(startDate, endDate) {
  const dateArray = [];
  const currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    dateArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray.map((date) => date.toISOString());
}

const createReservation = asyncHandler(async (req, res) => {
  const {
    checkInDate,
    checkOutDate,
    reservationItems,
    paymentMethod,
    roomPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (reservationItems && reservationItems.length === 0) {
    res.status(400);
    throw new Error("no reservation");
  }

  const reservation = new Reservation({
    reservation: {
      ...reservationItems,
      room: reservationItems._id,
      _id: undefined,
    },

    user: req.user._id,
    checkInDate,
    checkOutDate,
    paymentMethod,
    roomPrice,
    taxPrice,
    totalPrice,
  });

  const createdReservation = await reservation.save();
  res.status(201).json(createdReservation);
});

const createCounterReservation = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    phone,
    email,
    checkInDate,
    checkOutDate,
    reservationItems,
    paymentMethod,
    roomPrice,
    taxPrice,
    totalPrice,
  } = req.body;
  if (reservationItems && reservationItems.length === 0) {
    res.status(400);
    throw new Error("no reservation");
  }

  const user = new User({
    firstName,
    lastName,
    email,
    phone,
    password: "123456",
  });

  const createdUser = await user.save();

  const reservation = new Reservation({
    reservation: {
      ...reservationItems,
      room: reservationItems._id,
      _id: undefined,
    },
    reservationType: "Counter",
    user: createdUser._id,
    checkInDate,
    checkOutDate,
    paymentMethod,
    roomPrice,
    taxPrice,
    totalPrice,
  });

  const createdReservation = await reservation.save();
  res.status(201).json(createdReservation);
});

const getMyReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find({ user: req.params.id });
  res.status(200).json(reservations);
});

const getReservationById = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id).populate(
    "user"
  );
  if (reservation) {
    res.status(200).json(reservation);
  } else {
    res.status(404);
    throw new Error("Reservation not found");
  }
});

const updateReservationToCancel = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);
  if (reservation) {
    const allDates = getDatesInRange(
      reservation.checkInDate,
      reservation.checkOutDate
    );
    await Room.updateOne(
      { _id: reservation.reservation.room },
      { $pullAll: { unavailableDates: allDates } }
    );
    reservation.reservationStatus = "Canceled";
    const updatedReservation = await reservation.save();

    res.json(updatedReservation);
  } else {
    res.status(404);
    throw new Error("Reservation not found");
  }
});

const updateStatus = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);

  if (reservation) {
    if (reservation.reservationStatus === "Reserved") {
      reservation.reservationStatus = "CheckedIn";
      reservation.checkInAt = Date.now();
    } else if (reservation.reservationStatus === "CheckedIn") {
      reservation.reservationStatus = "CheckedOut";
      reservation.checkOutAt = Date.now();
    }
    const updatedreservation = await reservation.save();

    res.json(updatedreservation);
  } else {
    res.status(404);
    throw new Error("Reservation not found");
  }
});

const addExtra = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);
  const { amount } = req.body;
  if (reservation) {
    reservation.extraCharge = amount;
    const updatedReservation = await reservation.save();

    res.json(updatedReservation);
  } else {
    res.status(404);
    throw new Error("Reservation not found");
  }
});

const updateReservationToPaid = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);
  const { id, status, update_time, email_address } = req.body;

  const payment = new Payment({ id, status, update_time, email_address });
  const createdPayment = await payment.save();


  if (reservation) {
    // Convert check-in and check-out dates to Date objects
  const checkInDate = new Date(reservation.checkInDate);
  const checkOutDate = new Date(reservation.checkOutDate);

  // Adjust check-in time to 3 PM on the current day
  checkInDate.setHours(15, 0, 0, 0);

  // Adjust check-out time to 11 AM on the checkout day
  checkOutDate.setHours(11, 0, 0, 0);

  // Generate all dates between check-in and check-out dates
  const allDates = getDatesInRange(checkInDate, checkOutDate);

  // Update the room document to mark all dates as unavailable
  await Room.updateOne(
    { _id: reservation.reservation.room },
    { $push: { unavailableDates: { $each: allDates } } }
  );

  // Update reservation details
  reservation.isPaid = true;
  reservation.paymentID = createdPayment._id;
  reservation.paidAt = Date.now();

  // Save the updated reservation
  const updatedReservation = await reservation.save();

  res.json(updatedReservation);
  } else {
    res.status(404);
    throw new Error("Reservation not found");
  }
});



const getAllReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find({}).populate("user");
  res.status(200).json(reservations);
});
export {
  createReservation,
  getMyReservations,
  updateReservationToPaid,
  updateReservationToCancel,
  getReservationById,
  getAllReservations,
  createCounterReservation,
  updateStatus,
  addExtra,
};
