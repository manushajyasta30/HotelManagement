import React from "react";
import { Link } from "react-router-dom";
import { Table, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

import { useGetMyReservationsQuery } from "../slices/reservationSlice";
function Myreservations() {
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: reservations,
    isLoading,
    error,
  } = useGetMyReservationsQuery(userInfo._id);

  console.log(reservations);
  return (
    <Row>
      <Col md={{ span: 10, offset: 1 }} className="text-center">
        <h1>My Reservations</h1>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Reservation ID</th>
              <th>CheckIn Date</th>
              <th>CheckOut Date</th>
              <th>Reservation Status</th>
              <th>Payment Info</th>
              <th></th>
            </tr>
          </thead>

          {isLoading ? (
            <span>Loading...</span>
          ) : error ? (
            <span>{error?.data?.message || error.error}</span>
          ) : (
            <tbody>
              {reservations.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.checkInDate}</td>
                  <td>{item.checkOutDate}</td>
                  <td>
                    {item.reservationStatus === "Canceled" && (
                      <strong style={{ color: "red" }}>
                        {item.reservationStatus}
                      </strong>
                    )}
                    {item.reservationStatus === "Reserved" && (
                      <strong style={{ color: "blue" }}>
                        {item.reservationStatus}
                      </strong>
                    )}
                    {item.reservationStatus === "CheckedIn" && (
                      <strong style={{ color: "green" }}>
                        {item.reservationStatus}
                      </strong>
                    )}
                    {item.reservationStatus === "CheckedOut" && (
                      <strong style={{ color: "orange" }}>
                        {item.reservationStatus}
                      </strong>
                    )}
                  </td>
                  <td>{new Date(item.paidAt).toLocaleDateString("en-US")}</td>
                  <td>
                    <Link to={`/reservation/${item._id}`}>
                      <Button variant="dark">View Details</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </Table>
      </Col>
    </Row>
  );
}

export default Myreservations;
