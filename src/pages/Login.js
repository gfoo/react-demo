import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/Auth/AuthForm";
import classes from "./Login.module.css";

const Login = () => {
  let navigate = useNavigate();

  const onLoggedHandler = async () => {
    navigate("/");
  };
  return (
    <Container className={classes.container}>
      <Row sm={12}>
        <Col md={{ span: 4, offset: 4 }}>
          <AuthForm onLogged={onLoggedHandler} />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
