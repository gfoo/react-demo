import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import useHttp, {
  HTTP_STATUS_COMPLETE,
  HTTP_STATUS_PENDING,
} from "../../hooks/use-http";
import { login } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import ShowMessage from "../Layout/ShowMessage";
import SmallSpinner from "../Layout/SmallSpinner";
import classes from "./AuthForm.module.css";

const AuthForm = (props) => {
  const { login: loginCtx } = useContext(AuthContext);
  const [validated, setValidated] = useState(false);

  const {
    sendRequest: loginRequest,
    status: loginStatus,
    data: loginResponse,
    error: loginError,
  } = useHttp(login);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.currentTarget.checkValidity() === true) {
      loginRequest({
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      });
      setValidated(false);
    } else {
      // view form errors
      setValidated(true);
    }
  };

  useEffect(() => {
    if (loginStatus === HTTP_STATUS_COMPLETE && !loginError) {
      loginCtx(loginResponse.access_token);
      props.onLogged();
    }
  }, [loginStatus, loginError, loginResponse, loginCtx, props]);

  return (
    <Fragment>
      <Card>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                ref={emailInputRef}
                type="email"
                placeholder="Enter email"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                ref={passwordInputRef}
                type="password"
                placeholder="Password"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a password
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              disabled={loginStatus === HTTP_STATUS_PENDING}
              className={classes.button}
              variant="primary"
              type="submit"
            >
              {loginStatus === HTTP_STATUS_PENDING && (
                <Fragment>
                  <SmallSpinner />
                  &nbsp;
                </Fragment>
              )}
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {loginStatus === HTTP_STATUS_COMPLETE && loginError && (
        <ShowMessage error={true} message={loginError} />
      )}
    </Fragment>
  );
};

export default AuthForm;
