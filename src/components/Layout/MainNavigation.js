import { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
const MainNavigation = () => {
  const {
    isLoggedIn,
    logout: logoutCtx,
    userProfile,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    logoutCtx();
    navigate("/");
  };

  return (
    <header>
      <Navbar bg="light" variant="light">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>React-Demo</Navbar.Brand>
          </LinkContainer>
          {isLoggedIn && (
            <Navbar.Collapse className="justify-content-end">
              <LinkContainer to="/projects">
                <Nav.Link>Projects</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/profile">
                <Nav.Link>Profile</Nav.Link>
              </LinkContainer>
              {userProfile && userProfile.is_superuser && (
                <LinkContainer to="/admin">
                  <Nav.Link>Admin</Nav.Link>
                </LinkContainer>
              )}
              <Navbar.Text>
                <small> [ {userProfile && userProfile.email} ]</small>
              </Navbar.Text>
              <Nav.Link>
                <Button onClick={logoutHandler} size="sm">
                  Logout
                </Button>
              </Nav.Link>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
    </header>
  );
};

export default MainNavigation;
