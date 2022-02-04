import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import UserForm from "../components/Profile/UserForm";
import UserList from "../components/Profile/UserList";

const Admin = () => {
  const [refreshing, setRefreshing] = useState(false);
  return (
    <Container>
      <Row md={2}>
        <Col sm={1}>
          <Card>
            <Card.Body>
              <Card.Title>Users</Card.Title>
              <UserList reload={refreshing}></UserList>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={1}>
          <UserForm
            onCreate={() => {
              setRefreshing(!refreshing);
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
