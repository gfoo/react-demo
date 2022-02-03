import { Fragment, useContext, useEffect } from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import useHttp, {
  HTTP_STATUS_COMPLETE,
  HTTP_STATUS_PENDING,
} from "../../hooks/use-http";
import { updateActivate, updateSuperuser } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import ShowMessage from "../Layout/ShowMessage";
import SmallSpinner from "../Layout/SmallSpinner";
import PasswordForm from "./PasswordForm";
import classes from "./UserProfile.module.css";

const UserProfile = (props) => {
  const { token } = useContext(AuthContext);
  const deletable = props.deletable === true ? true : false;
  const editActive = props.editActive === true ? true : false;
  const editSuperuser = props.editSuperuser === true ? true : false;

  const {
    sendRequest: updateActivateRequest,
    status: updateActivateStatus,
    error: updateActivateError,
  } = useHttp(updateActivate);

  // call parent only if user added
  useEffect(() => {
    if (updateActivateStatus === HTTP_STATUS_COMPLETE && !updateActivateError) {
      props.onUpdate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateActivateStatus]);

  const onActivateHandler = () => {
    updateActivateRequest({
      userId: props.userId,
      token,
      activate: !props.isActive,
    });
  };

  const {
    sendRequest: updateSuperuserRequest,
    status: updateSuperuserStatus,
    error: updateSuperuserError,
  } = useHttp(updateSuperuser);

  // call parent only if user added
  useEffect(() => {
    if (
      updateSuperuserStatus === HTTP_STATUS_COMPLETE &&
      !updateSuperuserError
    ) {
      props.onUpdate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSuperuserStatus]);

  const onSuperuserHandler = () => {
    updateSuperuserRequest({
      userId: props.userId,
      token,
      superuser: !props.isSuperuser,
    });
  };

  return (
    <Fragment>
      <Card>
        <Card.Body>
          <Card.Title>
            {props.email}
            {deletable && (
              <Button
                className={classes.align_right}
                variant="outline-danger"
                size="sm"
              >
                Delete
              </Button>
            )}
          </Card.Title>
          <Row className={classes.margin_bottom} md={2}>
            <Col sm={1}>
              Active:&nbsp;
              <Badge bg={props.isActive ? "success" : "danger"}>
                {"" + props.isActive}
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
                  {props.isActive ? "Deactivate" : "Activate"}
                </Button>
              </Col>
            )}
          </Row>
          <Row className={classes.margin_bottom} md={2}>
            <Col sm={1}>
              Superuser:&nbsp;
              <Badge bg={props.isSuperuser ? "success" : "danger"}>
                {"" + props.isSuperuser}
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
                  {props.isSuperuser
                    ? "Change to normal"
                    : "Change to superuser"}
                </Button>
              </Col>
            )}
          </Row>
          <PasswordForm
            userId={props.userId}
            resetPassword={props.resetPassword}
          />
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
    </Fragment>
  );
};

export default UserProfile;
