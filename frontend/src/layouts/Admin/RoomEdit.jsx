import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import {
  useGetRoomByIdQuery,
  useUpdateRoomMutation,
  useUploadRoomImageMutation,
} from "../../slices/roomApiSlice";
import { useGetTypesQuery } from "../../slices/typesApiSlice";

function RoomEdit() {
  const navigate = useNavigate();
  const { id: roomId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [maxpeople, setMaxpeople] = useState("");
  const [roomType, setRoomType] = useState("");
  const [image, setImage] = useState("");
  const { data: types } = useGetTypesQuery();
  const { data: room, isLoading, error } = useGetRoomByIdQuery(roomId);
  const [updateRoom, { isLoading: loadingUpdate }] = useUpdateRoomMutation();
  const [uploadRoomImage, { isLoading: loadingUpload }] =
    useUploadRoomImageMutation();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateRoom({
        roomId,
        title,
        roomType,
        image,
        description,
        price,
        maxpeople,
      }).unwrap();
      navigate("/admin/rooms");
    } catch (err) {
      window.alert(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (room) {
      setTitle(room.title);
      setImage(room.image);
      setDescription(room.description);
      setMaxpeople(room.maxpeople);
      setPrice(room.price);
      setRoomType(room.roomType);
    }
  }, [room]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadRoomImage(formData).unwrap();
      window.alert(res.message);
      setImage(res.image);
    } catch (err) {
      window.alert(err?.data?.message || err.error);
    }
  };
  return (
    <Row className="justify-content-md-center mt-5">
      <Col md={6}>
        <LinkContainer to="/admindashboard">
          <Button variant="dark">Back</Button>
        </LinkContainer>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error?.data?.message || error.error}</p>
        ) : (
          <div className="login-container mt-3">
            {" "}
            {/* Add className */}
            <h2 className="login-heading">Room Edit Form</h2>{" "}
            {/* Add className */}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="formBasicEmail2" className="form-group">
                {" "}
                {/* Add className */}
                <Form.Label className="form-label">Room Number</Form.Label>{" "}
                {/* Add className */}
                <Form.Control
                  type="text"
                  placeholder="Enter Room Number"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail1" className="form-group">
                {" "}
                {/* Add className */}
                <Form.Label className="form-label">Image</Form.Label>{" "}
                {/* Add className */}
                <Form.Control
                  type="text"
                  placeholder="Enter image url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                <Form.Control
                  label="Choose File"
                  onChange={uploadFileHandler}
                  type="file"
                ></Form.Control>
                {loadingUpload && <p>Loading...</p>}
              </Form.Group>
              <Form.Group controlId="formBasicPhone" className="form-group">
                {" "}
                {/* Add className */}
                <Form.Label className="form-label">Price</Form.Label>{" "}
                {/* Add className */}
                <Form.Control
                  type="text"
                  placeholder="Enter Price of Room per Night"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail" className="form-group">
                {" "}
                {/* Add className */}
                <Form.Label className="form-label">Description</Form.Label>{" "}
                {/* Add className */}
                <Form.Control
                  type="text"
                  placeholder="Enter Description of the Room"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail6" className="form-group">
                {" "}
                {/* Add className */}
                <Form.Label className="form-label">Max people</Form.Label>{" "}
                {/* Add className */}
                <Form.Control
                  type="text"
                  placeholder="Enter maxpeople"
                  value={maxpeople}
                  onChange={(e) => setMaxpeople(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail9" className="form-group">
                {" "}
                {/* Add className */}
                <Form.Label className="form-label">Room Type</Form.Label>{" "}
                {/* Add className */}
                <Form.Control
                  as="select"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                >
                  {types?.map((x) => (
                    <option key={x._id} value={x._id}>
                      {x.name}
                    </option>
                  ))}
                </Form.Control>
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

export default RoomEdit;
