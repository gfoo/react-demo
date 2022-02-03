import { Fragment, useContext } from "react";
import { Card } from "react-bootstrap";
import AuthContext from "../../store/auth-context";
import SmallSpinner from "../Layout/SmallSpinner";

const UserProfile = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Fragment>
      {!authCtx.userProfile && <SmallSpinner />}
      {authCtx.userProfile && (
        <Card>
          <Card.Body>
            <Card.Title>{authCtx.userProfile.email}</Card.Title>
            <Card.Text>Active: {"" + authCtx.userProfile.is_active}</Card.Text>
            <Card.Text>
              Superuser: {"" + authCtx.userProfile.is_superuser}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Fragment>
  );
};

export default UserProfile;
