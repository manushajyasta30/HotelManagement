import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/signin");
    } catch (error) {
      toast.error(error);
    }
  };
  const logouthandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/admin");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <header>
      <Navbar expand="md" collapseOnSelect bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <strong>HMS</strong>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className=" ms-auto">
              {userInfo ? (
                userInfo.role === "admin" ? (
                  <>
                    <LinkContainer to="/admindashboard">
                      <Nav.Link>Dashboard</Nav.Link>
                    </LinkContainer>
                    <Nav.Link onClick={logouthandler}>Admin LogOut</Nav.Link>
                    {/* <NavDropdown title={userInfo.firstname} id="username">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown> */}
                  </>
                ) : (
                  <>
                    {userInfo.role === "user" && (
                      <>
                        <LinkContainer to="/profile">
                          <Nav.Link>My Profile</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/myreservations">
                          <Nav.Link>My Reservations</Nav.Link>
                        </LinkContainer>
                        <Nav.Link onClick={logoutHandler}>LogOut</Nav.Link>{" "}
                      </>
                    )}
                    {userInfo.role === "staff" && (
                      <>
                        <LinkContainer to="/staffprofile">
                          <Nav.Link>My satff Profile</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/admin/reservations">
                          <Nav.Link>Manage Reservations</Nav.Link>
                        </LinkContainer>
                        <Nav.Link onClick={logouthandler}>LogOut</Nav.Link>{" "}
                      </>
                    )}
                  </>
                )
              ) : (
                <LinkContainer to="/signin">
                  <Nav.Link>
                    <FaUserAlt /> SignIn
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
