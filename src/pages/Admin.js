import { useContext, useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import SmallSpinner from "../components/Layout/SmallSpinner";
import UserForm from "../components/Profile/UserForm";
import UserList from "../components/Profile/UserList";
import useHttp, {
  HTTP_STATUS_COMPLETE,
  HTTP_STATUS_PENDING,
} from "../hooks/use-http";
import { getAllUsers } from "../lib/api";
import AuthContext from "../store/auth-context";
import MessageContext from "../store/message-context";

const Admin = () => {
  const { showMessageRef } = useContext(MessageContext);
  const { token } = useContext(AuthContext);

  const [refreshing, setRefreshing] = useState(false);
  const [users, setUsers] = useState([]);
  const {
    sendRequest: getAllUsersRequest,
    status: getAllUsersStatus,
    data: getAllUsersResponse,
    error: getAllUsersError,
  } = useHttp(getAllUsers);

  useEffect(() => {
    getAllUsersRequest({ token });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshing]); // only on reload

  useEffect(() => {
    if (getAllUsersStatus === HTTP_STATUS_COMPLETE) {
      if (!getAllUsersError) {
        setUsers(getAllUsersResponse);
      } else {
        showMessageRef.current.addMessage({
          error: true,
          message: getAllUsersError,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAllUsersStatus]); // only if list reloaded

  const onDeleteUserHandler = (userId) => {
    setUsers(users.filter((u) => u.id !== userId));
  };

  const onUpdateUserHandler = (userProfile) => {
    setUsers(users.map((u) => (u.id === userProfile.id ? userProfile : u)));
  };

  return (
    <Container>
      <Row md={2}>
        <Col sm={1}>
          <Card>
            <Card.Body>
              <Card.Title>Users</Card.Title>
              {getAllUsersStatus === HTTP_STATUS_PENDING && <SmallSpinner />}
              {users.length === 0 && <p>No users</p>}
              {users.length > 0 && (
                <UserList
                  users={users}
                  onDelete={onDeleteUserHandler}
                  onUpdate={onUpdateUserHandler}
                ></UserList>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col sm={1}>
          <Card>
            <Card.Body>
              <UserForm
                onCreate={() => {
                  setRefreshing((prevRefreshing) => !prevRefreshing);
                }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
