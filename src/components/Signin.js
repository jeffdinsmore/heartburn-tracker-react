import React from "react";
import firebase from "firebase/app";

function Signin() {

  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
      alert("Successfully signed in!");
    }).catch(function (error) {
      alert(error.message);
    });
  }

  function doSignOut() {
    firebase.auth().signOut().then(function () {
      alert("Successfully signed out!");
    }).catch(function (error) {
      alert(error.message);
    });
  }

  return (
    <React.Fragment>
      <h1>Login</h1>
      <form onSubmit={doSignIn}>
        <input
          type='text'
          name='signinEmail'
          placeholder='email' />&nbsp;&nbsp;&nbsp;
        <input
          type='password'
          name='signinPassword'
          placeholder='Password' />&nbsp;&nbsp;&nbsp;
        <button className="btn btn-sm btn-success" type='submit'>Login</button>
      </form>
      <br></br>
      <p>Already signed in? Logout here:</p>
      
      <button className="btn btn-info btn-sm" onClick={doSignOut}>Logout</button>
    </React.Fragment>
  );
}

export default Signin;