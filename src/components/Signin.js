import React from "react";
import firebase, { auth, signInWithEmailAndPassword, signInWithGoogle } from "firebase";

function Signin() {
  const googleProvider = new firebase.auth.GoogleAuthProvider();

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


  const signInWithGoogle = async () => {
    try {
      const res = await firebase.auth.signInWithPopup(googleProvider);
      const user = res.user;
      const query = await firebase.firestore()
        .collection("users")
        .where("uid", "==", user.uid)
        .get();
      if (query.docs.length === 0) {
        await firebase.firestore().collection("users").add({
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  function doSignOut() {
    firebase.auth().signOut().then(function () {
      alert("Successfully signed out!");
    }).catch(function (error) {
      alert(error.message);
    });
  }

  return (
    <React.Fragment>
      <h2>Login</h2>
      <br />
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