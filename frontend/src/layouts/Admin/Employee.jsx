import React from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  useGetStaffQuery,
  useDeleteStaffMutation,
} from "../../slices/staffApiSlice";

function Employee() {
  const { data: users, refetch, isLoading, error } = useGetStaffQuery();

  const [deleteStaff, { isLoading: loadingDelete }] = useDeleteStaffMutation();

  const deleteHandler = async (id) => {
    try {
      await deleteStaff(id);
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
          <strong>Staff</strong>
        </h2>
        <LinkContainer to="/admin/addstaff">
          <Button variant="dark">Add Staff</Button>
        </LinkContainer>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error?.data?.message || error.error}</p>
        ) : (
          <Table bordered style={{ border: "2px solid black" }}>
            <thead>
              <tr>
                {/* <th>Staff ID</th> */}
                <th>First name</th>
                <th>Last name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>SSN</th>
                <th>Role</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  {/* <td>{user._id}</td> */}
                  <td>{user?.firstName}</td>
                  <td> {user?.lastName}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.ssn}</td>
                  <td>{user.role}</td>
                  {/* <td>
                    <>
                      <LinkContainer to={`/staff/${user._id}`}>
                        <Button className="btn-sm mx-1" variant="dark">
                          Edit
                        </Button>
                      </LinkContainer>
                      <Button
                        className="btn-sm mx-1"
                        variant="danger"
                        onClick={() => deleteHandler(user._id)}
                      >
                        Delete
                      </Button>
                      {loadingDelete && <p>Loading...</p>}
                    </>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default Employee;
