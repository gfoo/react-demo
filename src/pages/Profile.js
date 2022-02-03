import { Col, Container, Row } from "react-bootstrap";
import PasswordForm from "../components/Profile/PasswordForm";
import UserProfile from "../components/Profile/UserProfile";

const Profile = () => {
  return (
    <Container>
      <Row>
        <Col>
          <UserProfile />
        </Col>
        <Col>
          <PasswordForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
