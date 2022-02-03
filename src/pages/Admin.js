import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import UserForm from "../components/Profile/UserForm";
import UserList from "../components/Profile/UserList";

const Admin = () => {
  const [refreshing, setRefreshing] = useState(false);
  return (
    <Container>
      <Row md={2}>
        <Col sm={1}>
          <UserList refreshing={refreshing}></UserList>
        </Col>
        <Col sm={1}>
          <UserForm
            onAdd={() => {
              setRefreshing(!refreshing);
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
