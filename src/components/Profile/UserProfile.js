import { Fragment, useContext, useEffect, useState } from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import useHttp, {
  HTTP_STATUS_COMPLETE,
  HTTP_STATUS_PENDING,
} from "../../hooks/use-http";
import { deleteUser, updateActivate, updateSuperuser } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import ShowMessage from "../Layout/ShowMessage";
import SmallSpinner from "../Layout/SmallSpinner";
import PasswordForm from "./PasswordForm";
import classes from "./UserProfile.module.css";

const UserProfile = ({
  userId,
  email,
  isActive,
  isSuperuser,
  resetPassword,
  deletable,
  editActive,
  editSuperuser,
  onUpdate,
  onDelete,
}) => {
  const { token } = useContext(AuthContext);
  // const deletable = deletableProps === true ? true : false;
  // const editActive = editActiveProps === true ? true : false;
  // const editSuperuser = editSuperuserProps === true ? true : false;

  const [isActiveState, setIsActiveState] = useState(isActive);
  const [isSuperuserState, setIsSuperuserState] = useState(isSuperuser);

  const {
    sendRequest: updateActivateRequest,
    status: updateActivateStatus,
    error: updateActivateError,
  } = useHttp(updateActivate);

  useEffect(() => {
    if (updateActivateStatus === HTTP_STATUS_COMPLETE && !updateActivateError) {
      onUpdate();
      setIsActiveState(!isActiveState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateActivateStatus]);

  const onActivateHandler = () => {
    updateActivateRequest({
      userId: userId,
      token,
      activate: !isActiveState,
    });
  };

  const {
    sendRequest: updateSuperuserRequest,
    status: updateSuperuserStatus,
    error: updateSuperuserError,
  } = useHttp(updateSuperuser);

  useEffect(() => {
    if (
      updateSuperuserStatus === HTTP_STATUS_COMPLETE &&
      !updateSuperuserError
    ) {
      onUpdate();
      setIsSuperuserState(!isSuperuserState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSuperuserStatus]);

  const onSuperuserHandler = () => {
    updateSuperuserRequest({
      userId: userId,
      token,
      superuser: !isSuperuserState,
    });
  };

  const {
    sendRequest: deleteUserRequest,
    status: deleteUserStatus,
    error: deleteUserError,
  } = useHttp(deleteUser);

  useEffect(() => {
    if (deleteUserStatus === HTTP_STATUS_COMPLETE && !deleteUserError) {
      onDelete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteUserStatus]);

  const onDeleteHandler = () => {
    deleteUserRequest({
      userId: userId,
      token,
    });
  };

  return (
    <Fragment>
      <Card>
        <Card.Body>
          <Card.Title>
            {email}
            {deletable && (
              <Button
                className={classes.align_right}
                variant="outline-danger"
                size="sm"
                onClick={onDeleteHandler}
              >
                {deleteUserStatus === HTTP_STATUS_PENDING && (
                  <Fragment>
                    <SmallSpinner />
                    &nbsp;
                  </Fragment>
                )}
                Delete
              </Button>
            )}
          </Card.Title>
          <Row className={classes.margin_bottom} md={2}>
            <Col sm={1}>
              Active:&nbsp;
              <Badge bg={isActiveState ? "success" : "danger"}>
                {"" + isActiveState}
              </Badge>
            </Col>
            {editActive && (
              <Col sm={1}>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={onActivateHandler}
                >
                  {updateActivateStatus === HTTP_STATUS_PENDING && (
                    <Fragment>
                      <SmallSpinner />
                      &nbsp;
                    </Fragment>
                  )}
                  {isActiveState ? "Deactivate" : "Activate"}
                </Button>
              </Col>
            )}
          </Row>
          <Row className={classes.margin_bottom} md={2}>
            <Col sm={1}>
              Superuser:&nbsp;
              <Badge bg={isSuperuserState ? "success" : "danger"}>
                {"" + isSuperuserState}
              </Badge>
            </Col>
            {editSuperuser && (
              <Col sm={1}>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={onSuperuserHandler}
                >
                  {updateSuperuserStatus === HTTP_STATUS_PENDING && (
                    <Fragment>
                      <SmallSpinner />
                      &nbsp;
                    </Fragment>
                  )}
                  {isSuperuserState ? "Change to user" : "Change to superuser"}
                </Button>
              </Col>
            )}
          </Row>
          <PasswordForm userId={userId} resetPassword={resetPassword} />
        </Card.Body>
      </Card>
      {updateActivateStatus === HTTP_STATUS_COMPLETE && updateActivateError && (
        <ShowMessage error={true} message={updateActivateError} />
      )}
      {updateActivateStatus === HTTP_STATUS_COMPLETE &&
        !updateActivateError && (
          <ShowMessage message="Activation successfully updated!" />
        )}
      {updateSuperuserStatus === HTTP_STATUS_COMPLETE &&
        updateSuperuserError && (
          <ShowMessage error={true} message={updateSuperuserError} />
        )}
      {updateSuperuserStatus === HTTP_STATUS_COMPLETE &&
        !updateSuperuserError && (
          <ShowMessage message="Superuser successfully updated!" />
        )}
      {deleteUserStatus === HTTP_STATUS_COMPLETE && deleteUserError && (
        <ShowMessage error={true} message={deleteUserError} />
      )}
    </Fragment>
  );
};

export default UserProfile;
