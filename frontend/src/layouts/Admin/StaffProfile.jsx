import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useStaffprofileMutation } from "../../slices/staffApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { LinkContainer } from "react-router-bootstrap";
function StaffProfile() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [ssn, setSsn] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [dob, setDob] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useStaffprofileMutation();

  useEffect(() => {
    setFirstName(userInfo.firstname);
    setLastName(userInfo.lastname);
    setEmail(userInfo.email);
    setSsn(userInfo.ssn);
    setPhone(userInfo.phone);
    setCity(userInfo.city);
    setZip(userInfo.zip);
    setDob(userInfo.dob);
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      window.alert("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          staffId: userInfo._id,
          firstName,
          lastName,
          email,
          phone,
          ssn,
          password,
          zip,
          city,
          dob,
          token: userInfo.token,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        window.alert("Profile updated successfully");
        if (userInfo.first) {
          navigate("/admin/reservations");
        }
      } catch (err) {
        window.alert(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {/* <LinkContainer to="/">
            <Button variant="dark">Back</Button>
          </LinkContainer> */}
          <div className="login-container mt-3">
            <h2>{userInfo.first ? "Change Password" : "Staff Profile"}</h2>

            <Form onSubmit={submitHandler}>
              {userInfo.first ? (
                <>
                  <Form.Group
                    controlId="formBasicPassword"
                    className="form-group"
                  >
                    {" "}
                    {/* Add className */}
                    <Form.Label className="form-label">
                      Password
                    </Form.Label>{" "}
                    {/* Add className */}
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="formBasicPassword"
                    className="form-group"
                  >
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
                </>
              ) : (
                <>
                  <Form.Group
                    controlId="formBasicEmail1"
                    className="form-group"
                  >
                    {" "}
                    {/* Add className */}
                    <Form.Label className="form-label">
                      First Name
                    </Form.Label>{" "}
                    {/* Add className */}
                    <Form.Control
                      type="text"
                      placeholder="Enter First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group
                    controlId="formBasicEmail2"
                    className="form-group"
                  >
                    {" "}
                    {/* Add className */}
                    <Form.Label className="form-label">
                      Last Name
                    </Form.Label>{" "}
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
                  <Form.Group
                    controlId="formBasicEmail3"
                    className="form-group"
                  >
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

                  <Form.Group
                    controlId="formBasicPassword"
                    className="form-group"
                  >
                    {" "}
                    {/* Add className */}
                    <Form.Label className="form-label">
                      Password
                    </Form.Label>{" "}
                    {/* Add className */}
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="formBasicPassword"
                    className="form-group"
                  >
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
                </>
              )}

              <Button type="submit" variant="dark">
                {" "}
                {/* Add className */}
                Update
              </Button>
            </Form>
            {loadingUpdateProfile && <p>Loading...</p>}
          </div>
        </Col>
      </Row>
    </>
  );
}

export default StaffProfile;
