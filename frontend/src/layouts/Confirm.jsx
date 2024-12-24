import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearcart } from "../slices/cartSlice";
import {
  useCreateReservationMutation,
  useCreateCounterReservationMutation,
} from "../slices/reservationSlice";
import { Row, Col, Image, Button, Card } from "react-bootstrap";

function Confirm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems, roomPrice, userDetails } = useSelector(
    (state) => state.cart
  );
  const [createReservation, { isLoading, error }] =
    useCreateReservationMutation();

  const [createCounterReservation, { isLoading: counterLoading }] =
    useCreateCounterReservationMutation();

  const reservationHandler = async () => {
    if (userInfo.role === "user") {
      try {
        const res = await createReservation({
          token: userInfo.token,
          reservationItems: cart.cartItems,
          paymentMethod: "Card",
          roomPrice: cart.roomPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
          checkInDate: cart.cartItems.fromDate,
          checkOutDate: cart.cartItems.toDate,
        }).unwrap();
        dispatch(clearcart());
        navigate(`/reservation/${res._id}`);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await createCounterReservation({
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          email: userDetails.email,
          phone: userDetails.phone,
          token: userInfo.token,
          reservationItems: cart.cartItems,
          paymentMethod: "Card",
          roomPrice: cart.roomPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
          checkInDate: cart.cartItems.fromDate,
          checkOutDate: cart.cartItems.toDate,
        }).unwrap();
        dispatch(clearcart());
        navigate(`/reservation/${res._id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Row className="justify-content-md-center my-1">
      <Col md={10}>
        <h2 style={{ marginBottom: "20px" }}>
          <strong>Review and Confirm</strong>
        </h2>
        <Row key={cartItems._id}>
          <Col md={5}>
            <Card className="p-2">
              <Image
                src={`http://localhost:5000${cartItems.image}`}
                alt={cartItems.title}
                fluid
                rounded
              />
            </Card>
          </Col>
          <Col md={{ span: 5, offset: 1 }}>
            <Card border="dark">
              <Card.Header>
                <h3>
                  <strong>{cartItems.title}</strong>
                </h3>
              </Card.Header>
              <Card.Body>
                {userInfo.role !== "user" && userDetails && (
                  <>
                    <p>
                      <strong>Name: </strong> {userDetails.firstName}{" "}
                      {userDetails.lastName}
                    </p>
                    <p>
                      <strong>Email: </strong> {userDetails.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {userDetails.phone}
                    </p>
                  </>
                )}
                <p>
                  <strong>Room Price:</strong> ${cartItems.price} per night
                </p>
                <p>
                  <strong>Category: </strong> {cartItems.roomType?.name}
                </p>
                <p>
                  <strong>CheckIn Date:</strong> {cartItems.fromDate}
                </p>

                <p>
                  <strong>CheckOut Date:</strong>
                  {cartItems.toDate}
                </p>
                <p>
                  <strong>Number of Days:</strong> {cartItems.numOfDays}
                </p>
                <p>
                  <strong>CheckIn Time:</strong> 10:00AM
                </p>
                <p>
                  <strong>CheckOut Time:</strong> 01:00PM
                </p>
                <h4>
                  <strong>Total:</strong> ${roomPrice}
                </h4>
                <Button
                  variant="dark"
                  style={{ width: "100%", marginTop: "10px" }}
                  onClick={reservationHandler}
                >
                  Go to Payment
                </Button>
                {isLoading && <p>Loading...</p>}
                {counterLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Confirm;
