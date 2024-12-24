import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation } from "../slices/usersApiSlice";

import { setCredentials } from "../slices/authSlice";

function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [dob, setDob] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useProfileMutation();

  useEffect(() => {
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
    setEmail(userInfo.email);
    setPhone(userInfo.phone);
    setCity(userInfo.city);
    setDob(userInfo.dob);
    setZip(userInfo.zip);
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      window.alert("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          token: userInfo.token,
          _id: userInfo._id,
          firstName,
          lastName,
          email,
          phone,
          password,
          zip,
          city,
          dob,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        window.alert("Profile updated successfully");
      } catch (err) {
        console.log(err);
        window.alert(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Row className="justify-content-lg-center mt-5">
      <Col md={8}>
        <div className="login-container">
          {" "}
          {/* Add className */}
          <h2 className="login-heading">Update Profile</h2>{" "}
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
            <Form.Group controlId="formBasicPhone" className="form-group">
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
            <Form.Group controlId="formBasicPhone" className="form-group">
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
            <Form.Group controlId="formBasicPhone" className="form-group">
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
              Update
            </Button>
          </Form>
          {isLoading && <p>Loading....</p>}
        </div>
      </Col>
    </Row>
  );
}

export default Profile;
