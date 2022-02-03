import { Fragment, useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import ShowMessage from "../Layout/ShowMessage";
import SmallSpinner from "../Layout/SmallSpinner";
import classes from "./PasswordForm.module.css";

const PasswordForm = (props) => {
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const oldPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();
  const user_id = localStorage.getItem("user_id");

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      setIsLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);
      const oldEnteredPassword = oldPasswordInputRef.current.value;
      const newEnteredPassword = newPasswordInputRef.current.value;
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/users/${user_id}/password`,
          {
            method: "POST",
            body: JSON.stringify({
              old_password: oldEnteredPassword,
              new_password: newEnteredPassword,
            }),
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setIsLoading(false);
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.detail);
        } else {
          setSuccessMessage("Password successfully updated!");
          oldPasswordInputRef.current.value = "";
          newPasswordInputRef.current.value = "";
          setValidated(false);
        }
      } catch (error) {
        setIsLoading(false);
        oldPasswordInputRef.current.value = "";
        newPasswordInputRef.current.value = "";
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <Fragment>
      <Card>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                required
                ref={oldPasswordInputRef}
                type="password"
                placeholder="Old password"
              />
              <Form.Control.Feedback type="invalid">
                Please enter the old password
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Control
                required
                ref={newPasswordInputRef}
                type="password"
                placeholder="New password"
              />
              <Form.Control.Feedback type="invalid">
                Please enter the new password
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
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {errorMessage && <ShowMessage error={true} message={errorMessage} />}
      {successMessage && <ShowMessage message={successMessage} />}
    </Fragment>
  );
};

export default PasswordForm;
