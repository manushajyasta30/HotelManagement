import { useGetRoomsQuery } from "../slices/roomApiSlice";
import { useGetTypesQuery } from "../slices/typesApiSlice";
import { Row, Col, Form, Button } from "react-bootstrap";
import Room from "../components/Room";
import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
const Home = () => {
  const max = JSON.parse(localStorage.getItem("max"));
  const dates = JSON.parse(localStorage.getItem("dates"));
  const fromDate = new Date(dates[0].startDate).toLocaleDateString("en-US");
  const toDate = new Date(dates[0].endDate).toLocaleDateString("en-US");

  const { data: rooms, isLoading, error } = useGetRoomsQuery();
  const { data: types } = useGetTypesQuery();

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.toLocaleDateString("en-US"));

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).toLocaleDateString("en-US"));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };
  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  function calcDays(isoDateString1, isoDateString2) {
    const isoDate1 = new Date(isoDateString1);
    const isoDate2 = new Date(isoDateString2);

    // Calculate the difference in milliseconds
    const timeDifference = isoDate2 - isoDate1;

    // Convert the difference from milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  }
  console.log(max);

  const numOfDays = calcDays(dates[0].startDate, dates[0].endDate);

  const isAvailable = (room) => {
    const isFound = room.unavailableDates.some((date) =>
      alldates.includes(new Date(date).toLocaleDateString("en-US"))
    );

    return !isFound;
  };
  
  
  //filter
  const [sortBy, setSortBy] = useState("all");
  let filteredRooms;
  if (sortBy === "all") {
    filteredRooms = rooms?.filter((x) => x.maxpeople >= max);
  } else {
    filteredRooms = rooms?.filter(
      (x) => x.roomType.name === sortBy && x.maxpeople >= max
    );
  }

  return (
    <>
      {isLoading ? (
        <h1>.....</h1>
      ) : error ? (
        <h2>{error?.data?.message || error?.error}</h2>
      ) : (
        <>
          <LinkContainer to="/">
            <Button variant="dark">Back</Button>
          </LinkContainer>
          <h1 className="text-center">Rooms</h1>
          <h4 className="text-center mt-4 mb-4">
            From: {fromDate} - To: {toDate} ({numOfDays} Days) Number Of Guests:{" "}
            {max}
          </h4>
          <Row className="mt-4 mb-4 justify-content-md-center">
            <Col md={8}>
              <Form>
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    Filter By Type:
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      as="select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value={"all"}>All</option>
                      {types?.map((x) => (
                        <option key={x._id} value={x.name}>
                          {x.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Form.Group>
              </Form>
            </Col>
          </Row>

          <Row>
            {filteredRooms.map((room) => (
              <Col key={room._id} xs={12} md={12} lg={12} className="mb-4">
                <Room room={room} available={isAvailable} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default Home;
