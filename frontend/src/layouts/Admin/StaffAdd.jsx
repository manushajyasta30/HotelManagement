import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCreateStaffMutation } from "../../slices/staffApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { LinkContainer } from "react-router-bootstrap";
function StaffAdd() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [ssn, setSsn] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [dob, setDob] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createStaff, { isLoading }] = useCreateStaffMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      window.alert("passwords did not match!");
    } else {
      try {
        const res = await createStaff({
          firstName,
          lastName,
          phone,
          email,
          ssn,
          password,
          zip,
          city,
          dob,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/admin/staff");
      } catch (err) {
        // toast.error(err?.data?.message || err.error);
        window.alert(err?.data?.message || err.error);
      }
    }
  };
  return (
    <Row className="justify-content-md-center mt-5">
      <Col md={6}>
        <LinkContainer to="/admin/staff">
          <Button variant="dark">Back</Button>
        </LinkContainer>
        <div className="login-container mt-3">
          {" "}
          {/* Add className */}
          <h2 className="login-heading">Staff Registration</h2>{" "}
          {/* Add className */}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicEmail1" className="form-group">
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

            <Form.Group controlId="formBasicEmail2" className="form-group">
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
            <Form.Group controlId="formBasicEmail3" className="form-group">
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

            <Form.Group controlId="formBasicSSn" className="form-group">
              {" "}
              {/* Add className */}
              <Form.Label className="form-label">SSn</Form.Label>{" "}
              {/* Add className */}
              <Form.Control
                type="text"
                placeholder="Enter Social Security Number"
                value={ssn}
                onChange={(e) => setSsn(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicSSn" className="form-group">
              {" "}
              {/* Add className */}
              <Form.Label className="form-label">DOB</Form.Label>{" "}
              {/* Add className */}
              <Form.Control
                type="text"
                placeholder="Enter DOB"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicSSn" className="form-group">
              {" "}
              {/* Add className */}
              <Form.Label className="form-label">City</Form.Label>{" "}
              {/* Add className */}
              <Form.Control
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicSSn" className="form-group">
              {" "}
              {/* Add className */}
              <Form.Label className="form-label">Zip</Form.Label>{" "}
              {/* Add className */}
              <Form.Control
                type="text"
                placeholder="Enter Zip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="form-group">
              {" "}
              {/* Add className */}
              <Form.Label className="form-label">Password</Form.Label>{" "}
              {/* Add className */}
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="form-group">
              {" "}
              {/* Add className */}
              <Form.Label className="form-label">
                Confirm Password
              </Form.Label>{" "}
              {/* Add className */}
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="dark">
              {" "}
              {/* Add className */}
              Add
            </Button>
          </Form>
          {isLoading && <p>Loading....</p>}
        </div>
      </Col>
    </Row>
  );
}

export default StaffAdd;
