import React from "react";
import { Link } from 'react-router-dom';
//import { Link } from "react-router-dom";
import styled from 'styled-components';
//import firebase from "firebase/app";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
// import { Navbar } from 'react-bootstrap/Navbar'

// const HeartburnHeader = styled.h1`
//   font-size: 32px;
//   // background-color: lightGray;
//   // text-align: center;
//   // margin-top: 20px;
//   padding: 36px 0px 16px 0px;
//   // border-radius: 20px;

// `;

const Header = () => {
  return (
    <React.Fragment>
      <Navbar className="nav-bar" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/" to="/">My Heartburn Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <SignedOutLinks />
        </Navbar.Collapse>
      </Navbar>
      <br /><br />
    </React.Fragment>
  );
}

export default Header;