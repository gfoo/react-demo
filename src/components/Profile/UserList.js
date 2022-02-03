import { Fragment, useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import useHttp, {
  HTTP_STATUS_COMPLETE,
  HTTP_STATUS_PENDING,
} from "../../hooks/use-http";
import { getAllUsers } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import SmallSpinner from "../Layout/SmallSpinner";
import UserProfile from "./UserProfile";

const UserList = ({ refreshing }) => {
  const { token } = useContext(AuthContext);

  const [emailFilter, setEmailFilter] = useState("");
  const {
    sendRequest: getAllUsersRequest,
    status: getAllUsersStatus,
    data: getAllUsersResponse,
    error: getAllUsersError,
  } = useHttp(getAllUsers);

  useEffect(() => {
    getAllUsersRequest({ token });
  }, [getAllUsersRequest, refreshing, token]);

  let allUsers = [];
  if (getAllUsersStatus === HTTP_STATUS_COMPLETE && !getAllUsersError) {
    allUsers = getAllUsersResponse.sort((u1, u2) =>
      u1.email < u2.email ? -1 : 1
    );
  }

  return (
    <Fragment>
      {getAllUsersStatus === HTTP_STATUS_PENDING && <SmallSpinner />}
      <Row>
        <Col>
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
      <Row>
        <Col>
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
      </Row>
    </Fragment>
  );
};

export default UserList;
