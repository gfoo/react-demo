import { Fragment, useCallback, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import ShowMessage from "../Layout/ShowMessage";
import SmallSpinner from "../Layout/SmallSpinner";

const UserProfile = () => {
  const [errorMessage, setErrorMessage] = useState();

  const [userProfile, setUserProfile] = useState();
  const user_id = localStorage.getItem("user_id");

  const fetchProfile = useCallback(async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/users/${user_id}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    try {
      const data = await response.json();
      if (response.ok) {
        setUserProfile(data);
      } else {
        throw new Error(data.detail);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }, [user_id]);

  useEffect(() => fetchProfile(), [fetchProfile]);

  return (
    <Fragment>
      {!userProfile && <SmallSpinner />}
      {userProfile && (
        <Card>
          <Card.Body>
            <Card.Title>{userProfile.email}</Card.Title>
            <Card.Text>Active: {"" + userProfile.is_active}</Card.Text>
            <Card.Text>Superuser: {"" + userProfile.is_superuser}</Card.Text>
          </Card.Body>
        </Card>
      )}
      {errorMessage && <ShowMessage error={true} message={errorMessage} />}
    </Fragment>
  );
};

export default UserProfile;
