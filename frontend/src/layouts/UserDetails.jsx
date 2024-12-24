import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUserDetails } from "../slices/cartSlice";
function UserDetails() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (firstName === "" || lastName === "" || phone === "" || email === "") {
      window.alert("All fields are required");
    } else {
      dispatch(saveUserDetails({ firstName, lastName, phone, email }));
      navigate("/confirm");
    }
  };
  return (
    <Row className="justify-content-md-center mt-5">
      <Col md={6}>
        <div className="login-container">
          {" "}
          {/* Add className */}
          <h2 className="login-heading">Customer Details</h2>{" "}
          {/* Add className */}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicEmail" className="form-group">
              {" "}
              {/* Add className */}
              <Form.Label className="form-label">First Name</Form.Label>{" "}
              {/* Add className */}
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="form-group">
              {" "}
              {/* Add className */}
              <Form.Label className="form-label">Last Name</Form.Label>{" "}
              {/* Add className */}
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPhone" className="form-group">
              {" "}
              {/* Add className */}
              <Form.Label className="form-label">Phone</Form.Label>{" "}
              {/* Add className */}
              <Form.Control
                type="text"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className="form-group">
              {" "}
              {/* Add className */}
              <Form.Label className="form-label">Email address</Form.Label>{" "}
              {/* Add className */}
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="dark">
              {" "}
              {/* Add className */}
              Save
            </Button>
          </Form>
          {/* {isLoading && <p>Loading....</p>} */}
        </div>
      </Col>
    </Row>
  );
}

export default UserDetails;
