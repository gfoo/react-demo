import { Fragment, useContext, useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import useHttp, { STATUS_COMPLETE, STATUS_PENDING } from "../../hooks/use-http";
import { updatePassword } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import ShowMessage from "../Layout/ShowMessage";
import SmallSpinner from "../Layout/SmallSpinner";
import classes from "./PasswordForm.module.css";

const PasswordForm = (props) => {
  const { token, userProfile } = useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const {
    sendRequest: updatePasswordRequest,
    status: updatePasswordStatus,
    error: updatePasswordError,
  } = useHttp(updatePassword);

  const oldPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.currentTarget.checkValidity() === true) {
      updatePasswordRequest({
        userId: userProfile.id,
        token,
        oldPassword: oldPasswordInputRef.current.value,
        newPassword: newPasswordInputRef.current.value,
      });
      setValidated(false);
    } else {
      // view form errors
      setValidated(true);
    }
  };

  if (updatePasswordStatus === STATUS_COMPLETE && !updatePasswordError) {
    oldPasswordInputRef.current.value = "";
    newPasswordInputRef.current.value = "";
  }

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
              disabled={updatePasswordStatus === STATUS_PENDING}
              className={classes.button}
              variant="primary"
              type="submit"
            >
              {updatePasswordStatus === STATUS_PENDING && (
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
      {updatePasswordStatus === STATUS_COMPLETE && updatePasswordError && (
        <ShowMessage error={true} message={updatePasswordError} />
      )}
      {updatePasswordStatus === STATUS_COMPLETE && !updatePasswordError && (
        <ShowMessage message="Password successfully updated!" />
      )}
    </Fragment>
  );
};

export default PasswordForm;
