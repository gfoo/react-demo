import { Fragment, useContext, useEffect, useState } from "react";
import { Accordion, Badge, Form } from "react-bootstrap";
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
      <Accordion alwaysOpen>
        {allUsers
          .filter(
            (userProfile) =>
              emailFilter === null ||
              emailFilter.trim().length === 0 ||
              userProfile.email.includes(emailFilter.trim())
          )
          .map((userProfile) => (
            <Accordion.Item eventKey={userProfile.id} key={userProfile.id}>
              <Accordion.Header>
                {userProfile.email}
                {userProfile.is_superuser && (
                  <Fragment>
                    <p>&nbsp;</p>
                    <Badge bg="primary">superuser</Badge>
                  </Fragment>
                )}
                {!userProfile.is_active && (
                  <Fragment>
                    <p>&nbsp;</p>
                    <Badge bg="danger">deactivated</Badge>
                  </Fragment>
                )}
              </Accordion.Header>
              <Accordion.Body>
                <UserProfile
                  email={userProfile.email}
                  isActive={userProfile.is_active}
                  isSuperuser={userProfile.is_superuser}
                  userId={userProfile.id}
                  resetPassword={true}
                  editActive={true}
                  editSuperuser={true}
                  deletable={true}
                />
              </Accordion.Body>
            </Accordion.Item>
          ))}
      </Accordion>
    </Fragment>
  );
};

export default UserList;
