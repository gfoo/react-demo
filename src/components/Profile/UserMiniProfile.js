import { Badge } from "react-bootstrap";

const UserMiniProfile = ({ userProfile }) => {
  return (
    <>
      {userProfile.email}
      {userProfile.is_superuser && (
        <>
          <p>&nbsp;</p>
          <h6>
            <Badge bg="primary">superuser</Badge>
          </h6>
        </>
      )}
      {!userProfile.is_active && (
        <>
          <p>&nbsp;</p>
          <h6>
            <Badge bg="danger">deactivated</Badge>
          </h6>
        </>
      )}{" "}
    </>
  );
};

export default UserMiniProfile;
