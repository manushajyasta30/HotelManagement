import mongoose from "mongoose";

const reservationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    reservation: {
      title: { type: String, required: true },
      numOfDays: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      room: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Room",
      },
    },
    reservationType: {
      type: String,
      default: "online",
    },
    checkInDate: {
      type: String,
    },
    checkOutDate: {
      type: String,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentID: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Payment",
    },
    roomPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    reservationStatus: {
      type: String,
      required: true,
      default: "Reserved",
    },
    paidAt: {
      type: Date,
    },
    checkInAt: {
      type: Date,
    },
    checkOutAt: {
      type: Date,
    },
    extraCharge: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
