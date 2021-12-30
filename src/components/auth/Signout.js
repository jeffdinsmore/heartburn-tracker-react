import React, { useEffect } from "react";
import firebase, { auth, signInWithEmailAndPassword, signInWithGoogle, GoogleAuthProvider } from "firebase";
import { Redirect, Route, useNavigate } from "react-router";
import PropTypes from 'prop-types';
import * as a from '../../actions';
import { useSelector } from 'react-redux';
import { withFirestore, useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { createBrowserHistory } from 'history';


  function doSignOut() {
    firebase.auth().signOut().then(function () {
      alert("Successfully signed out!");
      console.log("Joey");
      return (<Redirect to="/" />);
    }).catch(function (error) {
      alert(error.message);
    });
  }

  export default withFirestore(doSignOut);