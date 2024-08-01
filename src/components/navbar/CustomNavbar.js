import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

import { clearSession, getUserFromSession } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";

import styles from "./CustomNavbar.module.scss";

const CustomNavbar = () => {
  const navigate = useNavigate();
  const username = getUserFromSession();

  const handleLogout = () => {
    clearSession();
    navigate("/login");
  };

  const handleSettings = () => {
    navigate("/users");
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className={styles.customNavbar}
    >
      <Container>
        <Navbar.Brand as={Link} to="/products">
          Products
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <NavDropdown title={username} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleSettings}>
                Settings
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
