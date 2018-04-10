import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import { Bootstrap, NavBar, Nav, NavItem } from 'react-bootstrap';

const Navbar = (props) => (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <span> Library </span>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem eventKey={1} href="#/lists">
          My Bookshelves
        </NavItem>
        <NavItem eventKey={2} href="#/search">
          Search
        </NavItem>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={3} href="#/login">
          Log In
        </NavItem>
        <NavItem eventKey={4} href="#/logout">
          Log Out
        </NavItem>
      </Nav>
    </Navbar>
);

export default Navbar;
