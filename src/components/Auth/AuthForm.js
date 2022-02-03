import { Fragment, useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import ShowMessage from "../Layout/ShowMessage";
import SmallSpinner from "../Layout/SmallSpinner";
import classes from "./AuthForm.module.css";

const AuthForm = (props) => {
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      setIsLoading(true);
      setErrorMessage(null);
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/token`, {
          method: "POST",
          body: `username=${enteredEmail}&password=${enteredPassword}`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        setIsLoading(false);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.detail);
        } else {
          props.onLogged(data.access_token, data.user_id, enteredEmail);
        }
      } catch (err) {
        setIsLoading(false);
        passwordInputRef.current.value = null;
        setErrorMessage(err.message);
      }
      setValidated(true);
    }
  };

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
              disabled={isLoading}
              className={classes.button}
              variant="primary"
              type="submit"
            >
              {isLoading && (
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
      {errorMessage && <ShowMessage error={true} message={errorMessage} />}
    </Fragment>
  );
};

export default AuthForm;
