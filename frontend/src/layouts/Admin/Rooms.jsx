import React from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  useGetRoomsQuery,
  useDeleteRoomMutation,
} from "../../slices/roomApiSlice";

function Rooms() {
  const { data: rooms, refetch, isLoading, error } = useGetRoomsQuery();

  const [deleteRoom, { isLoading: loadingDelete }] = useDeleteRoomMutation();

  const deleteHandler = async (id) => {
    try {
      await deleteRoom(id);
      refetch();
    } catch (err) {
      window.alert(err?.data?.message || err.error);
    }
  };
  return (
    <Row>
      {" "}
      <Col md={{ span: 10, offset: 1 }}>
        <LinkContainer to="/admindashboard">
          <Button variant="dark">Back</Button>
        </LinkContainer>
        <h2 className="text-center my-4">
          <strong>Rooms</strong>
        </h2>
        <LinkContainer to="/admin/addroom">
          <Button variant="dark" className="m-3">
            Add New Room
          </Button>
        </LinkContainer>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error?.data?.message || error.error}</p>
        ) : (
          <Table bordered style={{ border: "2px solid black" }}>
            <thead>
              <tr>
                {/* <th>Room ID</th> */}
                <th>Room Number</th>
                <th>Room Type</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room._id}>
                  {/* <td>{room._id}</td> */}
                  <td>{room.title}</td>
                  <td>{room.roomType.name}</td>
                  <td>${room.price}/per night</td>

                  <td>
                    <>
                      <LinkContainer to={`/rooms/${room._id}`}>
                        <Button className="btn-sm mx-1" variant="dark">
                          Edit
                        </Button>
                      </LinkContainer>
                      {/* <Button
                        className="btn-sm mx-1"
                        variant="danger"
                        onClick={() => deleteHandler(room._id)}
                      >
                        Delete
                      </Button> */}
                      {loadingDelete && <p>Loading...</p>}
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default Rooms;
