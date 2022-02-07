import { useContext, useState } from "react";
import { Accordion, Col, Form, Row } from "react-bootstrap";
import AuthContext from "../../store/auth-context";
import UserMiniProfile from "./UserMiniProfile";
import UserProfile from "./UserProfile";

const UserList = ({ users = [], onDelete = () => {}, onUpdate = () => {} }) => {
  const { userProfile: myUserProfile } = useContext(AuthContext);
  const [emailFullNameFilter, setEmailFullNameFilter] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [superuserFilter, setSuperuserFilter] = useState("All");

  const filterUser = (userProfile) => {
    return (
      (emailFullNameFilter === null ||
        emailFullNameFilter.trim().length === 0 ||
        userProfile.email.includes(emailFullNameFilter.trim()) ||
        userProfile.fullname.includes(emailFullNameFilter.trim())) &&
      (activeFilter === "All" ||
        (activeFilter === "Activated" && userProfile.is_active) ||
        (activeFilter === "Deactivated" && !userProfile.is_active)) &&
      (superuserFilter === "All" ||
        (superuserFilter === "Superuser" && userProfile.is_superuser) ||
        (superuserFilter === "User" && !userProfile.is_superuser))
    );
  };

  return (
    <>
      <Row xs="auto">
        <Col>
          <Form.Control
            size="sm"
            type="text"
            placeholder="Filtering email or fullname"
            onChange={(event) => setEmailFullNameFilter(event.target.value)}
          />
        </Col>
        <Col>
          <Form.Select
            size="sm"
            onChange={(event) => setActiveFilter(event.target.value)}
          >
            <option value="All">All</option>
            <option value="Activated">Activated</option>
            <option value="Deactivated">Deactivated</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Select
            size="sm"
            onChange={(event) => setSuperuserFilter(event.target.value)}
          >
            <option value="All">All</option>
            <option value="Superuser">Superuser</option>
            <option value="User">User</option>
          </Form.Select>
        </Col>
      </Row>
      <p></p>
      <Accordion alwaysOpen>
        {users
          .sort((u1, u2) => (u1.email < u2.email ? -1 : 1))
          .filter(filterUser)
          .map((userProfile) => (
            <Accordion.Item eventKey={userProfile.id} key={userProfile.id}>
              <Accordion.Header>
                <UserMiniProfile userProfile={userProfile} />
              </Accordion.Header>
              <Accordion.Body>
                <UserProfile
                  email={userProfile.email}
                  fullname={userProfile.fullname}
                  isActive={userProfile.is_active}
                  isSuperuser={userProfile.is_superuser}
                  userId={userProfile.id}
                  resetPassword={userProfile.id !== myUserProfile.id}
                  editActive={userProfile.id !== myUserProfile.id}
                  editSuperuser={userProfile.id !== myUserProfile.id}
                  deletable={userProfile.id !== myUserProfile.id}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                />
              </Accordion.Body>
            </Accordion.Item>
          ))}
      </Accordion>
    </>
  );
};

export default UserList;
