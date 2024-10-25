import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import logo from './gotham_capital.png';

const Header = () => {
  return (
    <Navbar style={{ backgroundColor: '#d2d2c9' }} >
      <Container className="justify-content-center mt-1 mb-1">
        <Navbar.Brand href="#"> {/*link to home page, and create other navigation*/}
          <img
            src={logo}
            alt="Logo"
            width="125"
            height="125"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;