import React from 'react';
//import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
//import { doSignOut } from '../auth/Signout';
//import React, { useEffect } from "react";
import firebase, { auth, signInWithEmailAndPassword, signInWithGoogle, GoogleAuthProvider } from "firebase";
import { Redirect, Route, useHistory } from "react-router";
import { createBrowserHistory } from 'history';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";

function SignedInLinks (props) {
  const { routerClick } = props;
  const state = useSelector(state => state)
  console.log(props, state)
  const history = useHistory();
  function doSignOut() {
    firebase.auth().signOut().then(function () {
      console.log("Successfully signed out!");
      setTimeout(() => {
        history.push("/");
        history.go(0);
        //history.push("/");
      }, 800);
    }).catch(function (error) {
      alert(error.message);
    });
  }
  //const history = createBrowserHistory();
  return (
    <React.Fragment>

      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/foodlist" onClick={routerClick}>Food List</Nav.Link>
        <Nav.Link as={Link} to="/add-food-item" onClick={routerClick}>Add Food</Nav.Link>
        <Nav.Link as={Link} to="/yourstats" onClick={routerClick}>Your Stats</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link onClick={doSignOut} to="/">Logout</Nav.Link>
        <Nav.Link as={Link} to="/" className='btn btn-warning p-1 rounded-circle btn-sm' onClick={routerClick}>
          JJ
        </Nav.Link>
      </Nav>
    </React.Fragment>
  );
}

SignedInLinks.propTypes = {
  routerClick: PropTypes.func
};

export default SignedInLinks;