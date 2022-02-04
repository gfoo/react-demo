import { useContext, useEffect, useState } from "react";
import { Accordion, Form } from "react-bootstrap";
import useHttp, {
  HTTP_STATUS_COMPLETE,
  HTTP_STATUS_PENDING,
} from "../../hooks/use-http";
import { getAllUsers } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import SmallSpinner from "../Layout/SmallSpinner";
import UserMiniProfile from "./UserMiniProfile";
import UserProfile from "./UserProfile";

const UserList = ({ reload }) => {
  const { token, userProfile: myUserProfile } = useContext(AuthContext);
  const [emailFilter, setEmailFilter] = useState("");
  const [users, setUsers] = useState([]);
  const {
    sendRequest: getAllUsersRequest,
    status: getAllUsersStatus,
    data: getAllUsersResponse,
    error: getAllUsersError,
  } = useHttp(getAllUsers);

  const onDeleteUserHandler = (userId) => {
    // update element
    setUsers(users.filter((u) => u.id !== userId));
  };

  const onUpdateUserHandler = (userProfile) => {
    // update element
    setUsers(users.map((u) => (u.id === userProfile.id ? userProfile : u)));
  };

  useEffect(() => {
    getAllUsersRequest({ token });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]); // only on reload
  useEffect(() => {
    if (getAllUsersStatus === HTTP_STATUS_COMPLETE && !getAllUsersError) {
      setUsers(getAllUsersResponse);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAllUsersStatus]); // only if list reloaded

  return (
    <>
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
        {users
          .sort((u1, u2) => (u1.email < u2.email ? -1 : 1))
          .filter(
            (userProfile) =>
              emailFilter === null ||
              emailFilter.trim().length === 0 ||
              userProfile.email.includes(emailFilter.trim())
          )
          .map((userProfile) => (
            <Accordion.Item eventKey={userProfile.id} key={userProfile.id}>
              <Accordion.Header>
                <UserMiniProfile userProfile={userProfile} />
              </Accordion.Header>
              <Accordion.Body>
                <UserProfile
                  email={userProfile.email}
                  isActive={userProfile.is_active}
                  isSuperuser={userProfile.is_superuser}
                  userId={userProfile.id}
                  resetPassword={userProfile.id !== myUserProfile.id}
                  editActive={userProfile.id !== myUserProfile.id}
                  editSuperuser={userProfile.id !== myUserProfile.id}
                  deletable={userProfile.id !== myUserProfile.id}
                  onDelete={onDeleteUserHandler}
                  onUpdate={onUpdateUserHandler}
                />
              </Accordion.Body>
            </Accordion.Item>
          ))}
      </Accordion>
    </>
  );
};

export default UserList;
