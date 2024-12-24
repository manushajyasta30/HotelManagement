import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./helpers/connect.js";
import uploadRoutes from "./routes/uploadRoutes.js";
//
import { notFound, errorHandler } from "./helpers/middlewares/error.js";

//routes
import userRoutes from "./routes/user.js";
import roomRoutes from "./routes/room.js";
import employeeRoutes from "./routes/employee.js";
import typeRoutes from "./routes/type.js";
import reservationRoutes from "./routes/Reservation.js";

dotenv.config();
const port = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();
app.get("/", (req, res) => {
  res.send("api running");
});
app.use("/api/rooms", roomRoutes);
app.use("/api/users", userRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/types", typeRoutes);
app.use("/api/reservation", reservationRoutes);

app.use("/api/config/pay", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Application is running on ${port}`);
});
