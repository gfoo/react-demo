import { Fragment } from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import PasswordForm from "./PasswordForm";
import classes from "./UserProfile.module.css";

const UserProfile = (props) => {
  const deletable = props.deletable === true ? true : false;
  const editActive = props.editActive === true ? true : false;
  const editSuperuser = props.editSuperuser === true ? true : false;
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
              <Col sm={2}>
                <Button variant="outline-primary" size="sm">
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
              <Col sm={2}>
                <Button variant="outline-primary" size="sm">
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
    </Fragment>
  );
};

export default UserProfile;
