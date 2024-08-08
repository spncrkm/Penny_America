import { Navbar, Container, Nav } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import Logout from "./Logout";
import Login from "./Login";
import { Link } from "react-router-dom";


const NavBar = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  getAccessTokenSilently().then((token) => console.log(token));
  

  return (
    <Navbar className="bg-dark">
      <Container>
        <Navbar.Brand className="text-light">
          <img src="../../public/logo.png" alt="" height="40px" />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link className="text-light mx-3" as={Link} to="/dashboard">
            Dashboard
          </Nav.Link>
          <Nav.Link className="text-light mx-3" as={Link} to="/add-task">
            Add Task
          </Nav.Link>
        </Nav>
        <Navbar.Toggle />
        {isAuthenticated ? (
          <>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text className="text-light mx-3">
                Welcome <u className="text-warning">{user?.given_name}</u>
              </Navbar.Text>
            </Navbar.Collapse>
            <Logout />
          </>
        ) : (
          <>
            <Login />
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
