import { Container } from "react-bootstrap";
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
      <AuthForm onLogged={onLoggedHandler} />
    </Container>
  );
};

export default Login;
