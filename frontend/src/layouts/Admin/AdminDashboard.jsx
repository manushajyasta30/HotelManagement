import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function AdminDashboard() {
  return (
    <>
      <Row className="justify-content-md-center mt-5">
        <Col md="auto" className="my-auto ">
          <LinkContainer to="/admin/reservations">
            <Button variant="dark">View Reservations</Button>
          </LinkContainer>
        </Col>
        <Col md="auto">
          <LinkContainer to="/admin/staff">
            <Button variant="dark">View Staff </Button>
          </LinkContainer>
        </Col>
        <Col md="auto">
          <LinkContainer to="/admin/users">
            <Button variant="dark">View Users</Button>
          </LinkContainer>
        </Col>
        <Col md="auto">
          <LinkContainer to="/admin/rooms">
            <Button variant="dark">View Rooms</Button>
          </LinkContainer>
        </Col>
      </Row>
      <Row className="mt-4 ">
        <Col md={{ span: 6, offset: 3 }} className="text-center">
          {" "}
          <h1>Welcome Admin!</h1>
        </Col>
      </Row>
    </>
  );
}

export default AdminDashboard;
