import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  useGetClientIDQuery,
  useGetReservationByIdQuery,
  usePayReservationMutation,
  useCancelReservationMutation,
  useUpdateStatusMutation,
  useExtraChargeMutation,
} from "../slices/reservationSlice";
function ReservationScreen() {
  const { userInfo } = useSelector((state) => state.auth);
  const { id: reservationId } = useParams();
  const {
    data: reservation,
    refetch,
    isLoading,
    error,
  } = useGetReservationByIdQuery(reservationId);

  const [updateStatus, { isLoading: loadingstatus }] =
    useUpdateStatusMutation();

  const [extraCharge, { isLoading: loadingExtra }] = useExtraChargeMutation();
  const [payReservation, { isLoading: loadingPay }] =
    usePayReservationMutation();

  const [cancelReservation, { isLoading: loadingCancel }] =
    useCancelReservationMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const [card, setCard] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");
  const [a, setA] = useState(0);

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetClientIDQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (reservation && !reservation.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [reservation, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payReservation({ reservationId, details });
        refetch();
        window.alert("payment successful");
      } catch (err) {
        window.alert(err?.data?.message || err.message);
      }
    });
  }
  function onError(err) {
    window.alert(err?.data?.message || err.message);
  }
  const onApprovetest = async () => {
    try {
      await cancelReservation(reservationId);
      refetch();
      window.alert("reservation is canceled");
    } catch (err) {
      window.alert(err?.data?.message || err.message);
    }
  };

  async function onApproveTest() {
    await payReservation({ reservationId, details: { payer: {} } });
    refetch();

    window.alert("payment successful");
  }
  async function onApproveTest2() {
    await extraCharge({ reservationId, details: { amount: a } });
    refetch();

    window.alert("payment successful");
  }
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: reservation.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  const Onclickhandler = async () => {
    await updateStatus(reservationId);
    refetch();
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>
      {error?.message?.data} || {error?.error}
    </p>
  ) : (
    <>
      <h1>Reservation Details: </h1>
      <Row>
        <Col md={8}>
          <ListGroup className="my-3">
            <ListGroup.Item>
              <h4>
                Reservation ID: <strong>{reservation._id}</strong>
              </h4>
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>
                Reserved By:{" "}
                <strong>
                  {reservation.user.firstName} {reservation.user.lastName}
                </strong>
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Room Details:</h4>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col md={4}>
                      <Image
                        src={`http://localhost:5000${reservation.reservation.image}`}
                        alt={reservation.reservation.title}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col className="py-1">
                      <h5 className="py-1">
                        <strong>{reservation.reservation.title}</strong>
                      </h5>
                      <h6 className="py-1">
                        CheckIn Date: <strong>{reservation.checkInDate}</strong>
                        - CheckOut Date:{" "}
                        <strong>{reservation.checkOutDate}</strong>
                      </h6>
                      <h6 className="py-1">
                        CheckIn Time: <strong>03:00 PM</strong>- CheckOut Time:{" "}
                        <strong>11:00 AM</strong>
                      </h6>
                      <h6 className="py-1">
                        Reservation Status:{" "}
                        {reservation.reservationStatus === "Canceled" && (
                          <strong style={{ color: "red" }}>
                            {reservation.reservationStatus}
                          </strong>
                        )}
                        {reservation.reservationStatus === "Reserved" && (
                          <strong style={{ color: "blue" }}>
                            {reservation.reservationStatus}
                          </strong>
                        )}
                      </h6>
                      {reservation.checkInAt && (
                        <strong style={{ color: "green" }}>
                          CheckedIn at{" "}
                          {new Date(reservation?.checkInAt).toLocaleDateString(
                            "en-US"
                          )}{" "}
                          {new Date(reservation.checkInAt).toLocaleTimeString(
                            "en-US"
                          )}
                        </strong>
                      )}
                      <br></br>
                      {reservation.checkOutAt && (
                        <strong style={{ color: "orange" }}>
                          {reservation.reservationStatus} at{" "}
                          {new Date(reservation.checkOutAt).toLocaleDateString(
                            "en-US"
                          )}{" "}
                          {new Date(reservation.checkOutAt).toLocaleTimeString(
                            "en-US"
                          )}
                        </strong>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>

          {userInfo.role !== "user" && (
            <>
              {reservation.reservationStatus === "Reserved" && (
                <Button
                  onClick={Onclickhandler}
                  className="px-2"
                  variant="dark"
                >
                  Mark As Checked-In
                </Button>
              )}
              {reservation.reservationStatus === "CheckedIn" && (
                <Button onClick={Onclickhandler} variant="dark">
                  Mark As Checked-Out
                </Button>
              )}
            </>
          )}

          {loadingstatus && <p>Loading...</p>}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Payment Info</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Room Price</Col>
                  <Col>${reservation.roomPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${reservation.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${reservation.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {reservation.extraCharge !== 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Extra Charge</Col>
                    <Col>${reservation.extraCharge}</Col>
                  </Row>
                </ListGroup.Item>
              )}
              {reservation.reservationStatus === "Reserved" &&
                reservation.isPaid && (
                  <>
                    <Button onClick={onApprovetest}>Cancel</Button>
                    {loadingCancel && <p>Canceling...</p>}
                  </>
                )}

              {reservation.reservationStatus === "CheckedIn" &&
                reservation.extraCharge === 0 && (
                  <ListGroup.Item>
                    {loadingPay && <p>Loading...</p>}
                    {isPending ? (
                      <p>Loading...</p>
                    ) : (
                      <div>
                        <div>
                          <Form.Group
                            controlId="formBasicSSn"
                            className="form-group"
                          >
                            {" "}
                            {/* Add className */}
                            <Form.Label className="form-label">
                              Extra Charge Amount
                            </Form.Label>{" "}
                            {/* Add className */}
                            <Form.Control
                              type="text"
                              placeholder="Enter Amount"
                              value={a}
                              onChange={(e) => setA(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group
                            controlId="formBasicSSn"
                            className="form-group"
                          >
                            {" "}
                            {/* Add className */}
                            <Form.Label className="form-label">
                              Card Number
                            </Form.Label>{" "}
                            {/* Add className */}
                            <Form.Control
                              type="text"
                              placeholder="Enter Card Number"
                              value={card}
                              onChange={(e) => setCard(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group
                            controlId="formBasicSSn"
                            className="form-group"
                          >
                            {" "}
                            {/* Add className */}
                            <Form.Label className="form-label">
                              CVV
                            </Form.Label>{" "}
                            {/* Add className */}
                            <Form.Control
                              type="text"
                              placeholder="Enter CVV"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group
                            controlId="formBasicSSn"
                            className="form-group"
                          >
                            {" "}
                            {/* Add className */}
                            <Form.Label className="form-label">
                              Expiry
                            </Form.Label>{" "}
                            {/* Add className */}
                            <Form.Control
                              type="text"
                              placeholder="Valid Thru"
                              value={expiry}
                              onChange={(e) => setExpiry(e.target.value)}
                            />
                          </Form.Group>

                          <Button variant="dark" onClick={onApproveTest2}>
                            Pay
                          </Button>
                        </div>
                      </div>
                    )}
                  </ListGroup.Item>
                )}
              {!reservation.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <p>Loading...</p>}
                  {isPending ? (
                    <p>Loading...</p>
                  ) : (
                    <div>
                      <div>
                        <Form.Group
                          controlId="formBasicSSn"
                          className="form-group"
                        >
                          {" "}
                          {/* Add className */}
                          <Form.Label className="form-label">
                            Card Number
                          </Form.Label>{" "}
                          {/* Add className */}
                          <Form.Control
                            type="text"
                            placeholder="Enter Card Number"
                            value={card}
                            onChange={(e) => setCard(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group
                          controlId="formBasicSSn"
                          className="form-group"
                        >
                          {" "}
                          {/* Add className */}
                          <Form.Label className="form-label">
                            CVV
                          </Form.Label>{" "}
                          {/* Add className */}
                          <Form.Control
                            type="text"
                            placeholder="Enter CVV"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group
                          controlId="formBasicSSn"
                          className="form-group"
                        >
                          {" "}
                          {/* Add className */}
                          <Form.Label className="form-label">
                            Expiry
                          </Form.Label>{" "}
                          {/* Add className */}
                          <Form.Control
                            type="text"
                            placeholder="Valid Thru"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                          />
                        </Form.Group>

                        <Button variant="dark" onClick={onApproveTest}>
                          Pay
                        </Button>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ReservationScreen;
