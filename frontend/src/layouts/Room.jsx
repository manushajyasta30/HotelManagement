import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  FaBed,
  FaWifi,
  FaSwimmingPool,
  FaCar,
  FaCoffee,
  FaUtensils,
  FaTv,
  FaChild,
} from "react-icons/fa";
import { useGetRoomByIdQuery } from "../slices/roomApiSlice";
import { addTocart } from "../slices/cartSlice";
function Room() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: roomId } = useParams();
  const { data: room, isLoading, error } = useGetRoomByIdQuery(roomId);
  const dates = JSON.parse(localStorage.getItem("dates"));
  const fromDate = new Date(dates[0].startDate).toLocaleDateString("en-US");
  const toDate = new Date(dates[0].endDate).toLocaleDateString("en-US");

  function calcDays(isoDateString1, isoDateString2) {
    const isoDate1 = new Date(isoDateString1);
    const isoDate2 = new Date(isoDateString2);

    // Calculate the difference in milliseconds
    const timeDifference = isoDate2 - isoDate1;

    // Convert the difference from milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  }

  const numOfDays = calcDays(dates[0].startDate, dates[0].endDate);

  const handleReserve = () => {
    dispatch(addTocart({ ...room, fromDate, toDate, numOfDays }));
    if (userInfo.role === "user") {
      navigate("/confirm");
    } else {
      navigate("/userdetails");
    }
  };
  return (
    <div>
      <LinkContainer to="/rooms">
        <Button variant="dark">Back</Button>
      </LinkContainer>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error?.data?.message || error.error}</p>
      ) : (
        <>
          <Row>
            <h4 className="text-center my-4">
              From: {fromDate} - To: {toDate}
            </h4>
            <Col md={{ span: 5 }}>
              <Card className="p-2">
                <Card.Img
                  src={`http://localhost:5000${room.image}`}
                  alt={room.title}
                />
              </Card>
            </Col>
            <Col md={{ span: 5, offset: 1 }}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>
                      <strong>{room.title}</strong>
                    </h3>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <strong>Price:</strong> ${room.price} per Day
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Description:</strong> {room.description}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Category: </strong>
                    {room.roomType?.name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>CheckIn Time:</strong> 03:00PM
                      </Col>
                      <Col>
                        <strong>CheckOut Time:</strong> 11:00AM
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Room Amenities:</strong>
                    <Row className="text-center mt-4">
                      <Col md={3} xs={6}>
                        <FaWifi size={30} />
                        <p>Free Wi-Fi</p>
                      </Col>
                      <Col md={3} xs={6}>
                        <FaSwimmingPool size={30} />
                        <p>Swimming Pool</p>
                      </Col>
                      <Col md={3} xs={6}>
                        <FaCar size={30} />
                        <p>Free Parking</p>
                      </Col>
                      <Col md={3} xs={6}>
                        <FaCoffee size={30} />
                        <p>Coffee Shop</p>
                      </Col>
                    </Row>
                    <Row className="text-center mt-4">
                      <Col md={3} xs={6}>
                        <FaUtensils size={40} />
                        <p>Restaurant</p>
                      </Col>
                      <Col md={3} xs={6}>
                        <FaTv size={40} />
                        <p>Flat-screen TV</p>
                      </Col>
                      <Col md={3} xs={6}>
                        <FaBed size={40} />
                        <p>Comfortable Beds</p>
                      </Col>
                      <Col md={3} xs={6}>
                        <FaChild size={40} />
                        <p>Kids Play Area</p>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item className="text-center">
                    <Button
                      variant="dark"
                      type="button"
                      style={{ width: "100%" }}
                      onClick={handleReserve}
                    >
                      Reserve
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default Room;
