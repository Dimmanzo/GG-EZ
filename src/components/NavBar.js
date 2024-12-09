import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <Navbar expand="md" fixed="top" className={styles.NavBar}>
      <Container>
        <Navbar.Brand className={styles.Logo}>GG-EZ</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className={styles.CustomToggle}
        />
        <Navbar.Collapse id="basic-navbar-nav" style={{ backgroundColor: '#1a1a1a' }}>
          <Nav className="ml-auto text-left">
          <NavLink
              to="/"
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
            >
              <i className="fas fa-home"></i> Home
            </NavLink>
            <NavLink
              to="/events"
              className={styles.NavLink}
              activeClassName={styles.Active}
            >
              <i className="fas fa-calendar-alt"></i> Events
            </NavLink>
            <NavLink
              to="/matches"
              className={styles.NavLink}
              activeClassName={styles.Active}
            >
              <i className="fas fa-gamepad"></i> Matches
            </NavLink>
            <NavLink
              to="/signin"
              className={styles.NavLink}
              activeClassName={styles.Active}
            >
              <i className="fas fa-sign-in-alt"></i> Sign In
            </NavLink>
            <NavLink
              to="/signup"
              className={styles.NavLink}
              activeClassName={styles.Active}
            >
              <i className="fas fa-user-plus"></i> Sign Up
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
