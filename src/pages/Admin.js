import { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SmallSpinner from "../components/Layout/SmallSpinner";
import UserProfile from "../components/Profile/UserProfile";
import useHttp, { STATUS_COMPLETE } from "../hooks/use-http";
import { getAllUsers } from "../lib/api";
import AuthContext from "../store/auth-context";

const Admin = () => {
  const { token } = useContext(AuthContext);

  const {
    sendRequest: getAllUsersRequest,
    status: getAllUsersStatus,
    data: getAllUsersResponse,
    error: getAllUsersError,
  } = useHttp(getAllUsers);

  useEffect(() => {
    getAllUsersRequest({ token });
  }, [getAllUsersRequest, token]);

  let allUsers = [];
  if (getAllUsersStatus === STATUS_COMPLETE && !getAllUsersError) {
    allUsers = getAllUsersResponse;
  }

  return (
    <Container>
      {allUsers.length === 0 && <SmallSpinner />}
      <Row md={10}>
        <Col sm={6}>
          {allUsers.map((userProfile) => (
            <UserProfile
              key={userProfile.id}
              email={userProfile.email}
              isActive={userProfile.is_active}
              isSuperuser={userProfile.is_superuser}
              userId={userProfile.id}
              resetPassword={true}
              editActive={true}
              editSuperuser={true}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
