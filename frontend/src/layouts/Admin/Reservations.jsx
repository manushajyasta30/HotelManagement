import React from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useGetReservationsQuery } from "../../slices/reservationSlice";
import { useSelector } from "react-redux";

function Reservations() {
  const { data: reservations, isLoading, error } = useGetReservationsQuery();
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <Row>
      {" "}
      <Col md={{ span: 10, offset: 1 }}>
        {userInfo.role === "admin" && (
          <LinkContainer to="/admindashboard">
            <Button variant="dark">Back</Button>
          </LinkContainer>
        )}
        {/* {userInfo.role === "staff" && (
          <LinkContainer to="/">
            <Button variant="dark">Back</Button>
          </LinkContainer>
        )} */}
        <h2 className="text-center my-4">
          <strong>Reservations</strong>
        </h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error?.data?.message || error.error}</p>
        ) : (
          <Table bordered style={{ border: "2px solid black" }}>
            <thead>
              <tr>
                {/* <th>Reservation ID</th> */}
                <th>Customer Date</th>
                <th>Received Date</th>
                <th>Type</th>
                <th>Total</th>
                <th>Status</th>
                <th>Paid On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation._id}>
                  {/* <td>{reservation._id}</td> */}
                  <td>
                    {reservation?.user?.firstName} {reservation?.user?.lastName}
                  </td>
                  <td>
                    {new Date(reservation.createdAt).toLocaleDateString(
                      "en-US"
                    )}
                  </td>
                  <td>{reservation.reservationType}</td>
                  <td>{reservation.totalPrice}</td>

                  <td>
                    {/* <Badge
                      bg={`${
                        reservation.reservationStatus === "Yet to Process"
                          ? "primary"
                          : reservation.reservationStatus === "Ready"
                          ? "warning"
                          : "success"
                      }`}
                    >
                      {reservation.reservationStatus}
                    </Badge> */}
                    <strong>{reservation.reservationStatus}</strong>
                  </td>
                  <td>
                    {reservation.isPaid ? (
                      <>
                        {new Date(reservation.paidAt).toLocaleDateString(
                          "en-US"
                        )}
                      </>
                    ) : (
                      <p style={{ color: "red" }}> NO</p>
                    )}
                  </td>

                  <td>
                    <>
                      <LinkContainer to={`/reservation/${reservation._id}`}>
                        <Button className="btn-sm mx-1" variant="dark">
                          View
                        </Button>
                      </LinkContainer>

                      {/* {loadingUpdate && <p>Loading...</p>} */}
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default Reservations;
