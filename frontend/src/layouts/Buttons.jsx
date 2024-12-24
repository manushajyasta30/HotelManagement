import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
function Buttons() {
  return (
    <Row className="justify-content-md-center my-auto">
      <Col md="auto" className="my-auto">
        <LinkContainer to="/adminlogin">
          <Button variant="dark">Admin LogIn</Button>
        </LinkContainer>
      </Col>
      <Col md="auto">
        <LinkContainer to="/stafflogin">
          <Button variant="dark">Staff LogIn</Button>
        </LinkContainer>
      </Col>
    </Row>
  );
}

export default Buttons;
