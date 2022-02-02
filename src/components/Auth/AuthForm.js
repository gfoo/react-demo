import { useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import classes from "./AuthForm.module.css";

const AuthForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      fetch(`${process.env.REACT_APP_API_URL}/token`, {
        method: "POST",
        body: `username=${enteredEmail}&password=${enteredPassword}`,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed!";
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          props.onLogged(data.access_token, data.user_id, enteredEmail);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    setValidated(true);
  };

  return (
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
            Login
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AuthForm;
