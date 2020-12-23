import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import firebase from "firebase/app";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import { Navbar } from 'react-bootstrap/Navbar'

const HeartburnHeader = styled.h1`
  font-size: 32px;
  // background-color: lightGray;
  // text-align: center;
  // margin-top: 20px;
  padding: 36px 0px 16px 0px;
  // border-radius: 20px;

`;

function Header() {
  return (
    <React.Fragment>
      {/* <div id="header"> */}

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/" to="/">My Heartburn Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/foodlist" to="/foodlist">Food List</Nav.Link>
              {/* <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Nav>
              <Nav.Link href="/login" to="/login">Login</Nav.Link>
              <Nav.Link href="/signup" to="/signup">
                Sign up
      </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {/* <ul id="headerUl">
          <img className="imageHeader" src="/lava_flow2.jpg"></img>
          <HeartburnHeader>
          <li id="headerLiLeft">My Heartburn Tracker</li>
          </HeartburnHeader>


          <li id="headerLi">
            <Link to="/login">Login/Logout</Link>
          </li>
          <li id="headerLi">
            <Link to="/signup">Sign up</Link>
          </li>
          <li id="headerLi">
            <Link to="/foodlist">Food List</Link>
          </li>
          <li id="headerLi">
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div> */}
      <hr></hr>
    </React.Fragment>
  );
}

export default Header;