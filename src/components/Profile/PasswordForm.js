import { useContext, useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import useHttp, {
  HTTP_STATUS_COMPLETE,
  HTTP_STATUS_PENDING,
} from "../../hooks/use-http";
import { updatePassword } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import SmallSpinner from "../Layout/SmallSpinner";
import classes from "./PasswordForm.module.css";

const PasswordForm = ({ userId, resetPassword = false }) => {
  const { token, showMessageRef } = useContext(AuthContext);
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
        userId,
        token,
        oldPassword: oldPasswordInputRef.current.value,
        newPassword: newPasswordInputRef.current.value,
        reset: resetPassword,
      });
      setValidated(false);
    } else {
      // view form errors
      setValidated(true);
    }
  };

  useEffect(() => {
    if (updatePasswordStatus === HTTP_STATUS_COMPLETE) {
      if (!updatePasswordError) {
        oldPasswordInputRef.current.value = "";
        newPasswordInputRef.current.value = "";
      }
      showMessageRef.current.addMessage({
        error: !!updatePasswordError,
        message: updatePasswordError
          ? updatePasswordError
          : "Password successfully updated!",
      });
    }
  }, [showMessageRef, updatePasswordError, updatePasswordStatus]);

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group hidden={resetPassword}>
          <Form.Control
            required={!resetPassword}
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
            <>
              <SmallSpinner />{" "}
            </>
          )}
          Change password
        </Button>
      </Form>
    </>
  );
};

export default PasswordForm;
