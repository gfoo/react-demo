import { Fragment, useContext, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import useHttp, {
  HTTP_STATUS_COMPLETE,
  HTTP_STATUS_PENDING,
} from "../../hooks/use-http";
import { updatePassword } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import ShowMessage from "../Layout/ShowMessage";
import SmallSpinner from "../Layout/SmallSpinner";
import classes from "./PasswordForm.module.css";

const PasswordForm = (props) => {
  const reset = props.resetPassword === true ? true : false;
  const { token } = useContext(AuthContext);
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
        userId: props.userId,
        token,
        oldPassword: oldPasswordInputRef.current.value,
        newPassword: newPasswordInputRef.current.value,
        reset,
      });
      setValidated(false);
    } else {
      // view form errors
      setValidated(true);
    }
  };

  if (updatePasswordStatus === HTTP_STATUS_COMPLETE && !updatePasswordError) {
    oldPasswordInputRef.current.value = "";
    newPasswordInputRef.current.value = "";
  }

  return (
    <Fragment>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group hidden={reset}>
          <Form.Control
            required={!reset}
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
          variant="outline-primary"
          disabled={updatePasswordStatus === HTTP_STATUS_PENDING}
          className={classes.button}
          type="submit"
        >
          {updatePasswordStatus === HTTP_STATUS_PENDING && (
            <Fragment>
              <SmallSpinner />
              &nbsp;
            </Fragment>
          )}
          Change password
        </Button>
      </Form>
      {updatePasswordStatus === HTTP_STATUS_COMPLETE && updatePasswordError && (
        <ShowMessage error={true} message={updatePasswordError} />
      )}
      {updatePasswordStatus === HTTP_STATUS_COMPLETE &&
        !updatePasswordError && (
          <ShowMessage message="Password successfully updated!" />
        )}
    </Fragment>
  );
};

export default PasswordForm;
