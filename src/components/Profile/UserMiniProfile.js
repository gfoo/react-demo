import { useContext } from "react";
import { Badge } from "react-bootstrap";
import AuthContext from "../../store/auth-context";
import LimitedParagraph from "../Layout/LimitedParagraph";

const UserMiniProfile = ({ userProfile }) => {
  const { userProfile: myUserProfile } = useContext(AuthContext);
  return (
    <>
      <LimitedParagraph paragraph={userProfile.fullname} limitSize={25} />
      {userProfile.id === myUserProfile.id && (
        <>
          <h6>
            &nbsp;
            <Badge bg="warning">me</Badge>
          </h6>
        </>
      )}
      {userProfile.is_superuser && (
        <>
          <h6>
            &nbsp;
            <Badge bg="primary">superuser</Badge>
          </h6>
        </>
      )}
      {!userProfile.is_superuser && (
        <>
          <h6>
            &nbsp;
            <Badge bg="info">user</Badge>
          </h6>
        </>
      )}
      {userProfile.is_active && (
        <>
          <h6>
            &nbsp;
            <Badge bg="success">activated</Badge>
          </h6>
        </>
      )}
      {!userProfile.is_active && (
        <>
          <h6>
            &nbsp;
            <Badge bg="danger">deactivated</Badge>
          </h6>
        </>
      )}
    </>
  );
};

export default UserMiniProfile;
