// import React from "react";
// import PropTypes from "prop-types";
import firebase from "firebase/app";

// function PasswordReset() {

//   function doPasswordReset(event) {
//     event.preventDefault();
//     const email = event.target.signinEmail.value;
//     const password = event.target.signinPassword.value;
//     firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
//       alert("Successfully signed in!");
//     }).catch(function (error) {
//       alert(error.message);
//     });
//   }
// }

async function sendPasswordResetEmail(email) {
  try {
    await firebase.auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export default sendPasswordResetEmail;