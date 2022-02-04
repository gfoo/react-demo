import { useContext, useEffect, useState } from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import useHttp, {
  HTTP_STATUS_COMPLETE,
  HTTP_STATUS_PENDING,
} from "../../hooks/use-http";
import { deleteUser, updateActivate, updateSuperuser } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import SmallSpinner from "../Layout/SmallSpinner";
import PasswordForm from "./PasswordForm";
import classes from "./UserProfile.module.css";

const UserProfile = ({
  userId,
  email,
  isActive,
  isSuperuser,
  resetPassword = false,
  deletable = false,
  editActive = false,
  editSuperuser = false,
  onUpdate,
  onDelete,
}) => {
  const { token, showMessageRef } = useContext(AuthContext);
  const [isActiveState, setIsActiveState] = useState(isActive);
  const [isSuperuserState, setIsSuperuserState] = useState(isSuperuser);

  const {
    sendRequest: updateActivateRequest,
    status: updateActivateStatus,
    error: updateActivateError,
    data: updateActivateData,
  } = useHttp(updateActivate);
  const {
    sendRequest: updateSuperuserRequest,
    status: updateSuperuserStatus,
    error: updateSuperuserError,
    data: updateSuperuserData,
  } = useHttp(updateSuperuser);
  const {
    sendRequest: deleteUserRequest,
    status: deleteUserStatus,
    error: deleteUserError,
    data: deleteUserData,
  } = useHttp(deleteUser);

  const onActivateHandler = () => {
    updateActivateRequest({
      userId: userId,
      token,
      activate: !isActiveState,
    });
  };
  const onSuperuserHandler = () => {
    updateSuperuserRequest({
      userId: userId,
      token,
      superuser: !isSuperuserState,
    });
  };
  const onDeleteHandler = () => {
    deleteUserRequest({
      userId: userId,
      token,
    });
  };

  useEffect(() => {
    if (updateActivateStatus === HTTP_STATUS_COMPLETE) {
      if (!updateActivateError) {
        onUpdate(updateActivateData);
        setIsActiveState(!isActiveState);
      }
      showMessageRef.current.addMessage({
        error: !!updateActivateError,
        message: updateActivateError
          ? updateActivateError
          : "Activation successfully updated!",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateActivateStatus]);

  useEffect(() => {
    if (updateSuperuserStatus === HTTP_STATUS_COMPLETE) {
      if (!updateSuperuserError) {
        onUpdate(updateSuperuserData);
        setIsSuperuserState(!isSuperuserState);
      }
      showMessageRef.current.addMessage({
        error: !!updateSuperuserError,
        message: updateSuperuserError
          ? updateSuperuserError
          : "Privileges successfully updated!",
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSuperuserStatus]);
  useEffect(() => {
    if (deleteUserStatus === HTTP_STATUS_COMPLETE) {
      if (!deleteUserError) {
        onDelete(deleteUserData.user_id);
      }
      showMessageRef.current.addMessage({
        error: !!deleteUserError,
        message: deleteUserError
          ? deleteUserError
          : "User successfully deleted!",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteUserStatus]);

  return (
    <>
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
                  <>
                    <SmallSpinner />
                    &nbsp;
                  </>
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
                    <>
                      <SmallSpinner />
                      &nbsp;
                    </>
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
                    <>
                      <SmallSpinner />
                      &nbsp;
                    </>
                  )}
                  {isSuperuserState ? "Change to user" : "Change to superuser"}
                </Button>
              </Col>
            )}
          </Row>
          <PasswordForm userId={userId} resetPassword={resetPassword} />
        </Card.Body>
      </Card>
    </>
  );
};

export default UserProfile;
