import { useContext, useEffect, useState } from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import useHttp, {
  HTTP_STATUS_COMPLETE,
  HTTP_STATUS_PENDING,
} from "../../hooks/use-http";
import { deleteUser, updateActivate, updateSuperuser } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import MessageContext from "../../store/message-context";
import ConfirmModal from "../Layout/ConfirmModal";
import SmallSpinner from "../Layout/SmallSpinner";
import PasswordForm from "./PasswordForm";
import classes from "./UserProfile.module.css";

const UserProfile = ({
  userId,
  email,
  fullname,
  isActive,
  isSuperuser,
  resetPassword = false,
  deletable = false,
  editActive = false,
  editSuperuser = false,
  onUpdate,
  onDelete,
}) => {
  const { showMessageRef } = useContext(MessageContext);
  const { token } = useContext(AuthContext);
  const [isActiveState, setIsActiveState] = useState(isActive);
  const [isSuperuserState, setIsSuperuserState] = useState(isSuperuser);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

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
    setShowConfirmDelete(true);
  };

  const onConfirmDeleteHandler = (delete_) => {
    setShowConfirmDelete(false);
    if (delete_) {
      deleteUserRequest({
        userId: userId,
        token,
      });
    }
  };

  useEffect(() => {
    if (updateActivateStatus === HTTP_STATUS_COMPLETE) {
      if (!updateActivateError) {
        onUpdate(updateActivateData);
        setIsActiveState((prevIsActiveState) => !prevIsActiveState);
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
        setIsSuperuserState((prevIsSuperuserState) => !prevIsSuperuserState);
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
          <p>
            <strong>{fullname}</strong> [{email}]
            {deletable && (
              <Button
                className={classes.align_right}
                variant="outline-danger"
                size="sm"
                onClick={onDeleteHandler}
              >
                {deleteUserStatus === HTTP_STATUS_PENDING && (
                  <>
                    <SmallSpinner />{" "}
                  </>
                )}
                Delete
              </Button>
            )}
          </p>
          <Row className={classes.margin_bottom} md={2}>
            <Col sm={1}>
              <h6>
                Active:{" "}
                <Badge bg={isActiveState ? "success" : "danger"}>
                  {"" + isActiveState}
                </Badge>
              </h6>
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
                      <SmallSpinner />{" "}
                    </>
                  )}
                  {isActiveState ? "Deactivate" : "Activate"}
                </Button>
              </Col>
            )}
          </Row>
          <Row className={classes.margin_bottom} md={2}>
            <Col sm={1}>
              <h6>
                Superuser:{" "}
                <Badge bg={isSuperuserState ? "success" : "danger"}>
                  {"" + isSuperuserState}
                </Badge>
              </h6>
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
                      <SmallSpinner />{" "}
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
      <ConfirmModal
        message="Do you really want to delete this user?"
        show={showConfirmDelete}
        onConfirm={(confirm) => onConfirmDeleteHandler(confirm)}
      />
    </>
  );
};

export default UserProfile;
