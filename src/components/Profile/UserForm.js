import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import useHttp, {
  HTTP_STATUS_COMPLETE,
  HTTP_STATUS_PENDING,
} from "../../hooks/use-http";
import { createUser } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import SmallSpinner from "../Layout/SmallSpinner";

const UserForm = ({ onCreate = () => {} }) => {
  const { token, showMessageRef } = useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const emailInputRef = useRef();
  const fullnameInputRef = useRef();
  const passwordInputRef = useRef();
  const [activateInput, setActiveInput] = useState(true);
  const [superuserInput, setSuperuserInput] = useState(false);

  const {
    sendRequest: createUserRequest,
    status: createUserStatus,
    error: createUserError,
  } = useHttp(createUser);

  // call only if user added
  useEffect(() => {
    if (createUserStatus === HTTP_STATUS_COMPLETE) {
      if (!createUserError) {
        emailInputRef.current.value = "";
        fullnameInputRef.current.value = "";
        passwordInputRef.current.value = "";
        setActiveInput(true);
        setSuperuserInput(false);
        onCreate();
      }
      showMessageRef.current.addMessage({
        error: !!createUserError,
        message: createUserError
          ? createUserError
          : "User successfully created!",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createUserStatus]); // deps of createUserStatus only because parent will re-render this child

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.currentTarget.checkValidity() === true) {
      createUserRequest({
        token,
        email: emailInputRef.current.value,
        fullname: fullnameInputRef.current.value,
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

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Email</Form.Label>
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
        <Form.Label>Fullname</Form.Label>
        <Form.Control
          required
          ref={fullnameInputRef}
          type="text"
          placeholder="Enter fullname"
        />
        <Form.Control.Feedback type="invalid">
          Please enter a valid fullname
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
          <>
            <SmallSpinner />{" "}
          </>
        )}
        Create user
      </Button>
    </Form>
  );
};

export default UserForm;
