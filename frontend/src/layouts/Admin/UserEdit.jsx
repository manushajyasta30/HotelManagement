import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetUserByIDQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";

function UserEdit() {
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const { data: staff, isLoading, error } = useGetUserByIDQuery(userId);
  const [updateStaff, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateStaff({
        userId,
        firstName,
        lastName,
        email,
        phone,
      }).unwrap();
      navigate("/admin/users");
    } catch (err) {
      window.alert(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (staff) {
      setFirstName(staff.firstName);
      setLastName(staff.lastName);
      setEmail(staff.email);
      setPhone(staff.phone);
    }
  }, [staff]);
  return (
    <Row className="justify-content-md-center mt-5">
      <Col md={6}>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error?.data?.message || error.error}</p>
        ) : (
          <div className="login-container">
            {" "}
            {/* Add className */}
            <h2 className="login-heading">User Edit Form</h2>{" "}
            {/* Add className */}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="formBasicEmail2" className="form-group">
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

              <Form.Group controlId="formBasicEmail1" className="form-group">
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
                <Form.Label className="form-label">
                  Email address
                </Form.Label>{" "}
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
                Update
              </Button>
            </Form>
            {loadingUpdate && <p>Loading....</p>}
          </div>
        )}
      </Col>
    </Row>
  );
}

export default UserEdit;
