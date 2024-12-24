export const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";

export const ROOMS_URL = "/api/rooms";
export const USERS_URL = "/api/users";
export const EMPLOYEE_URL = "/api/employee";
export const RESERVATION_URL = "/api/reservation";
export const TYPE_URL = "/api/types";
export const PAYPAL_URL = "/api/config/pay";
