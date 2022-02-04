import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button, Card, Form } from "react-bootstrap";
import useHttp, {
  HTTP_STATUS_COMPLETE,
  HTTP_STATUS_PENDING,
} from "../../hooks/use-http";
import { createUser } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import ShowMessage from "../Layout/ShowMessage";
import SmallSpinner from "../Layout/SmallSpinner";

const UserForm = ({ onCreate }) => {
  const { token } = useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [activateInput, setActiveInput] = useState(true);
  const [superuserInput, setSuperuserInput] = useState(false);

  const {
    sendRequest: createUserRequest,
    status: createUserStatus,
    error: createUserError,
  } = useHttp(createUser);

  // call parent only if user added
  useEffect(() => {
    if (createUserStatus === HTTP_STATUS_COMPLETE && !createUserError) {
      onCreate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createUserStatus]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.currentTarget.checkValidity() === true) {
      createUserRequest({
        token,
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
        active: activateInput,
        superuser: superuserInput,
      });
      setValidated(false);
    } else {
      // view form errors
      setValidated(true);
    }
  };

  if (createUserStatus === HTTP_STATUS_COMPLETE && !createUserError) {
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  }

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
            <Form.Group>
              <Form.Check
                type="switch"
                checked={activateInput}
                onChange={() => setActiveInput(!activateInput)}
                label="Active"
              />
              <Form.Check
                type="switch"
                defaultValue="on"
                checked={superuserInput}
                onChange={() => setSuperuserInput(!superuserInput)}
                label="Superuser"
              />
            </Form.Group>
            <Button
              variant="outline-primary"
              disabled={createUserStatus === HTTP_STATUS_PENDING}
              type="submit"
            >
              {createUserStatus === HTTP_STATUS_PENDING && (
                <Fragment>
                  <SmallSpinner />
                  &nbsp;
                </Fragment>
              )}
              Create user
            </Button>
          </Form>
          {createUserStatus === HTTP_STATUS_COMPLETE && createUserError && (
            <ShowMessage error={true} message={createUserError} />
          )}
          {createUserStatus === HTTP_STATUS_COMPLETE && !createUserError && (
            <ShowMessage message="User successfully created!" />
          )}
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default UserForm;
