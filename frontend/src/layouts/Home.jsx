import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendar } from "react-icons/fa";
import {
  Container,
  Carousel,
  Button,
  Image,
  Row,
  Col,
  Form,
} from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";

function HomeScreen() {
  const carouselItems = [
    {
      id: 1,
      title: "Welcome to Our Hotel",
      description: "Book your stay with us and enjoy a luxurious experience.",
      image: "/images/1.jpg",
    },
    {
      id: 2,
      title: "Discover Comfort",
      description:
        "Experience comfort like never before in our spacious rooms.",
      image: "/images/2.jpg",
    },
    {
      id: 3,
      title: "Relax and Unwind",
      description:
        "Enjoy our amenities and unwind in our beautiful surroundings.",
      image: "/images/3.jpg",
    },
  ];
  const navigate = useNavigate();

  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [max, setMax] = useState(1);

  const handleSelect = () => {
    localStorage.setItem("dates", JSON.stringify(dates));
    localStorage.setItem("max", JSON.stringify(max));
    navigate("/rooms");
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center pb-3">
        <Col
          md={{ span: 8 }}
          className="text-center pt-2"
          style={{ border: "2px solid black", borderRadius: "5px" }}
        >
          <div>
            <FaCalendar className="m-1" />
            <span
              onClick={() => setOpenDate(!openDate)}
              className="headerSearchText"
            >{`Start Date ${format(
              dates[0].startDate,
              "MM/dd/yyyy"
            )} - End Date ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                months={2}
                className="pt-3"
                direction="horizontal"
                minDate={new Date()}
              />
            )}
          </div>
        </Col>
        <Col md={1}>
          <Form.Group controlId="formBasicSSn" className="form-group">
            {" "}
            {/* Add className */}
            <Form.Label className="form-label">Num Of Guests</Form.Label>{" "}
            {/* Add className */}
            <Form.Control
              type="text"
              placeholder=""
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={{ span: 2 }} className="text-center">
          <Button variant="dark" onClick={handleSelect}>
            Search
          </Button>
        </Col>
      </Row>

      <Carousel>
        {carouselItems.map((item) => (
          <Carousel.Item key={item.id}>
            <Image
              className="d-block mx-auto my-auto"
              src={item.image}
              alt={item.title}
              fluid
            />
            <Carousel.Caption className="carousel-caption">
              <h2 className="text-white text-right">{item.title}</h2>
              <p>{item.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}

export default HomeScreen;
