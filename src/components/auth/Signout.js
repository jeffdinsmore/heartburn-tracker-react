import React, { useEffect } from "react";
import firebase, { auth, signInWithEmailAndPassword, signInWithGoogle, GoogleAuthProvider } from "firebase";
import { Redirect, Route, useNavigate } from "react-router";
import PropTypes from 'prop-types';
import * as a from '../../actions';
import { useSelector } from 'react-redux';
import { withFirestore, useFirestoreConnect, isLoaded } from 'react-redux-firebase';

function doSignOut() {
  console.log('aaaaaaaaaaaaaa')
  window.localStorage.removeItem("uId")
  firebase.auth().signOut().then(function () {
    alert("Successfully signed out!");
    window.localStorage.clear();
    return (<Redirect to="/" />);
  }).catch(function (error) {
    alert(error.message);
  });
  window.localStorage.removeItem("uId")
  window.localStorage.removeItem("email")
}

export default withFirestore(doSignOut);