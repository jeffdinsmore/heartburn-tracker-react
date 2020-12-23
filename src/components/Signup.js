import React from "react";
import firebase from "firebase/app";

function Signup() {
  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
      alert("successfully signed up!");
    }).catch(function (error) {
      alert(error.message);
    });
  }
  return (
    <React.Fragment>

      <h1>Sign up</h1>
      <form onSubmit={doSignUp}>
        <input
          type='text'
          name='email'
          placeholder='email' />&nbsp;&nbsp;&nbsp;
        <input
          type='password'
          name='password'
          placeholder='Password' />&nbsp;&nbsp;&nbsp;
        <button className="btn btn-sm btn-success" type='submit'>Sign up</button>
      </form>
    </React.Fragment>
  );
}



export default Signup;