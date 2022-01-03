import React from 'react';
//import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
//import { doSignOut } from '../auth/Signout';
//import React, { useEffect } from "react";
import firebase, { auth, signInWithEmailAndPassword, signInWithGoogle, GoogleAuthProvider } from "firebase";
import { Redirect, Route, useHistory } from "react-router";
import { createBrowserHistory } from 'history';
import { Link } from "react-router-dom";

const SignedInLinks = () => {
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
  console.log(history)
  return (
    <React.Fragment>

      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/foodlist">Food List</Nav.Link>
        <Nav.Link as={Link} to="/add-food-item">Add Food</Nav.Link>
        <Nav.Link as={Link} to="/yourstats">Your Stats</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link onClick={doSignOut} to="/">Logout</Nav.Link>
        <Nav.Link to="/" className='btn btn-warning p-1 rounded-circle btn-sm'>
          JJ
        </Nav.Link>
      </Nav>
    </React.Fragment>
  );
}

export default SignedInLinks;