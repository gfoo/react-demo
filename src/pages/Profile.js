import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SmallSpinner from "../components/Layout/SmallSpinner";
import UserProfile from "../components/Profile/UserProfile";
import AuthContext from "../store/auth-context";

const Profile = () => {
  const { userProfile } = useContext(AuthContext);
  return (
    <Container>
      <Row md={10}>
        <Col sm={5}>
          {!userProfile && <SmallSpinner />}
          {userProfile && (
            <UserProfile
              email={userProfile.email}
              fullname={userProfile.fullname}
              isActive={userProfile.is_active}
              isSuperuser={userProfile.is_superuser}
              userId={userProfile.id}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
