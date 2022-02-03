import { Fragment } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import PasswordForm from "./PasswordForm";
import classes from "./UserProfile.module.css";

const UserProfile = (props) => {
  const editActive = props.editActive === true ? true : false;
  const editSuperuser = props.editSuperuser === true ? true : false;
  return (
    <Fragment>
      <Card>
        <Card.Body>
          <Card.Title>{props.email}</Card.Title>
          <Row className={classes.margin_bottom} md={2}>
            <Col sm={1}>Active: {"" + props.isActive}</Col>
            {editActive && (
              <Col sm={1}>
                <Button variant="danger" size="sm">
                  {!props.isActive ? "Unactivate" : "Activate"}
                </Button>
              </Col>
            )}
          </Row>
          <Row className={classes.margin_bottom} md={2}>
            <Col sm={1}>Superuser: {"" + props.isSuperuser}</Col>
            {editSuperuser && (
              <Col sm={1}>
                <Button variant="danger" size="sm">
                  {!props.isSuperuser
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
    </Fragment>
  );
};

export default UserProfile;
