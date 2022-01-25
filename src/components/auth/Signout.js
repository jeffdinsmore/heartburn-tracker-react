import React from "react";
import firebase from "firebase";
import { Redirect } from "react-router";
import { withFirestore } from 'react-redux-firebase';

function doSignOut() {
  console.log('aaaaaaaaaaaaaa')
  window.localStorage.removeItem("uid")
  firebase.auth().signOut().then(function () {
    alert("Successfully signed out!");
    window.localStorage.clear();
    return (<Redirect to="/" />);
  }).catch(function (error) {
    alert(error.message);
  });
  window.localStorage.removeItem("uid")
  window.localStorage.removeItem("email")
}

export default withFirestore(doSignOut);