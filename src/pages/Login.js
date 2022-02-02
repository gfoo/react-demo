import { useContext } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/Auth/AuthForm";
import AuthContext from "../store/auth-context";
import classes from "./Login.module.css";

const Login = () => {
  let navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const onLoggedHandler = (token, user_id, user_email) => {
    authCtx.login(token, user_id, user_email);
    navigate("/");
  };
  return (
    <Container className={classes.container}>
      <AuthForm onLogged={onLoggedHandler} />
    </Container>
  );
};

export default Login;
