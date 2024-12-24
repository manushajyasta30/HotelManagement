import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// import "./assets/bootstrap.custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/index.css";
import App from "./App";
import Rooms from "./layouts/Rooms";
import Home from "./layouts/Home";
import SignIn from "./layouts/Signin";
import Register from "./layouts/Register";
import StaffLogin from "./layouts/Admin/EmployeeLogin";
import Room from "./layouts/Room";
import Confirm from "./layouts/Confirm";
import PrivateRoute from "./helpers/PrivateRoute";
import AdminRoute from "./helpers/AdminRoute";
import Reservation from "./layouts/Reservation";
import Profile from "./layouts/Profile";
import Myreservations from "./layouts/Myreservations";
import AdminLogin from "./layouts/Admin/AdminLogin";
import AdminDashboard from "./layouts/Admin/AdminDashboard";
import Buttons from "./layouts/Buttons";
import AllRooms from "./layouts/Admin/Rooms";
import Users from "./layouts/Admin/Users";
import Employee from "./layouts/Admin/Employee";
import Reservations from "./layouts/Admin/Reservations";
import StaffEdit from "./layouts/Admin/StaffEdit";
import StaffAdd from "./layouts/Admin/StaffAdd";
import UserEdit from "./layouts/Admin/UserEdit";
import RoomEdit from "./layouts/Admin/RoomEdit";
import RoomAdd from "./layouts/Admin/RoomAdd";
import StaffProfile from "./layouts/Admin/StaffProfile";
import UserDetails from "./layouts/UserDetails";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/stafflogin" element={<StaffLogin />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/admin" element={<Buttons />} />
      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/reservation/:id" element={<Reservation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/myreservations" element={<Myreservations />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/admin/rooms" element={<AllRooms />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/staff" element={<Employee />} />
        <Route path="/admin/reservations" element={<Reservations />} />
        <Route path="/staff/:id" element={<StaffEdit />} />
        <Route path="/user/:id" element={<UserEdit />} />
        <Route path="/rooms/:id" element={<RoomEdit />} />
        <Route path="/admin/addstaff" element={<StaffAdd />} />
        <Route path="/admin/addroom" element={<RoomAdd />} />
        <Route path="/staffprofile" element={<StaffProfile />} />
        <Route path="/userdetails" element={<UserDetails />} />
      </Route>
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
