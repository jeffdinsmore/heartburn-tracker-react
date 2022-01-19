import React from "react";
import firebase from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider } from 'firebase';

function Signup() {
  //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  //const auth = getAuth();
  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
      alert("successfully signed up!");
      const user = userCredential.user.uid;
      firebase.firestore().collection('users').doc(user).set({ email })
    }).catch((error) => {
      alert(error.message);
    });
  }
  return (
    <React.Fragment>

      <h2>Sign up</h2>
      <br />
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