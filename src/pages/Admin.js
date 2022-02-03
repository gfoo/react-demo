import { useCallback, useContext, useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import SmallSpinner from "../components/Layout/SmallSpinner";
import UserForm from "../components/Profile/UserForm";
import UserProfile from "../components/Profile/UserProfile";
import useHttp, { HTTP_STATUS_COMPLETE } from "../hooks/use-http";
import { getAllUsers } from "../lib/api";
import AuthContext from "../store/auth-context";

const Admin = () => {
  const { token } = useContext(AuthContext);
  const [emailFilter, setEmailFilter] = useState("");

  const {
    sendRequest: getAllUsersRequest,
    status: getAllUsersStatus,
    data: getAllUsersResponse,
    error: getAllUsersError,
  } = useHttp(getAllUsers);

  const onRefresh = useCallback(() => {
    getAllUsersRequest({ token });
  }, [getAllUsersRequest, token]);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  let allUsers = [];
  if (getAllUsersStatus === HTTP_STATUS_COMPLETE && !getAllUsersError) {
    allUsers = getAllUsersResponse.sort((u1, u2) =>
      u1.email < u2.email ? -1 : 1
    );
  }

  return (
    <Container>
      {allUsers.length === 0 && <SmallSpinner />}
      <Row md={10}>
        <Col sm={6}>
          <Form.Group>
            <Form.Control
              required
              type="text"
              placeholder="Filtering email"
              onChange={(event) => setEmailFilter(event.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row md={10}>
        <Col sm={6}>
          {allUsers
            .filter(
              (userProfile) =>
                emailFilter === null ||
                emailFilter.trim().length === 0 ||
                userProfile.email.includes(emailFilter.trim())
            )
            .map((userProfile) => (
              <UserProfile
                key={userProfile.id}
                email={userProfile.email}
                isActive={userProfile.is_active}
                isSuperuser={userProfile.is_superuser}
                userId={userProfile.id}
                resetPassword={true}
                editActive={true}
                editSuperuser={true}
                deletable={true}
              />
            ))}
        </Col>
        <Col>
          <UserForm onAdd={onRefresh} />
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
