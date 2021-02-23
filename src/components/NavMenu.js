import React from 'react';
import AccountsContainer from './AccountsContainer';
import { Link, Route } from 'react-router-dom';
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

function NavMenu() {
  return (
    <div className="NavMenu">
          <Navbar style={{backgroundColor: '#0055a5'}} variant="dark">
            <Navbar.Brand href="#">WP Engine</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Accounts</Nav.Link>
              <Nav.Link href="#">Users</Nav.Link>
            </Nav>
          
          </Navbar>
      
          <Route
                    path="/"
                    component={AccountsContainer}
                    exact 
                />
    </div>
  );
 }

export default NavMenu;